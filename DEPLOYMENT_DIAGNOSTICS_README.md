# 🩺 SpeechCraft Studio: Deployment & 503 Error Diagnostic Guide

This diagnostic guide provides an in-depth, root-cause analysis and actionable troubleshooting steps for resolving recurring **HTTP 503 `UNAVAILABLE`** errors ("*This model is currently experiencing high demand...*") and related API failures when deploying **SpeechCraft Studio** to **Cloudflare Pages** and **Cloudflare Workers**.

---

## 📑 Table of Contents

1. [Understanding the Error](#1-understanding-the-error)
2. [Why Does It Persist Across All Models?](#2-why-does-it-persist-across-all-models)
3. [Probable Causes & Solutions](#3-probable-causes--solutions)
   - [Cause 1: Google AI Studio Free-Tier Shared Capacity Gating](#cause-1-google-ai-studio-free-tier-shared-capacity-gating)
   - [Cause 2: Cloudflare Edge Egress IP Pooling & Throttling](#cause-2-cloudflare-edge-egress-ip-pooling--throttling)
   - [Cause 3: Cloudflare Pages vs. Cloudflare Worker Architecture Disconnect](#cause-3-cloudflare-pages-vs-cloudflare-worker-architecture-disconnect)
   - [Cause 4: API Key Restrictions (HTTP Referrer / IP Mismatch)](#cause-4-api-key-restrictions-http-referrer--ip-mismatch)
   - [Cause 5: Missing or Misplaced Secrets in Cloudflare](#cause-5-missing-or-misplaced-secrets-in-cloudflare)
   - [Cause 6: Cloudflare Worker Runtime Compatibility (`nodejs_compat`)](#cause-6-cloudflare-worker-runtime-compatibility-nodejs_compat)
   - [Cause 7: Regional Routing & Geographic Availability](#cause-7-regional-routing--geographic-availability)
4. [Step-by-Step Verification Procedure](#4-step-by-step-verification-procedure)
   - [Step A: Validate the Key Locally with cURL](#step-a-validate-the-key-locally-with-curl)
   - [Step B: Test the Deployed Cloudflare Worker Directly](#step-b-test-the-deployed-cloudflare-worker-directly)
   - [Step C: Verify Cloudflare Pages Build Environment Variables](#step-c-verify-cloudflare-pages-build-environment-variables)
   - [Step D: Inspect Cloudflare Worker Real-Time Logs](#step-d-inspect-cloudflare-worker-real-time-logs)
5. [Quick Diagnostic Decision Matrix](#5-quick-diagnostic-decision-matrix)

---

## 1. Understanding the Error

When an AI request fails, the application displays:

```json
{
  "error": {
    "code": 503,
    "message": "This model is currently experiencing high demand. Spikes in demand are usually temporary. Please try again later.",
    "status": "UNAVAILABLE"
  }
}
```

### Key Facts About This Error
- **Origin**: This JSON payload comes directly from Google's Generative Language API (`generativelanguage.googleapis.com`), **not** from your application's client code or Cloudflare's infrastructure.
- **Meaning**: Google's upstream load balancers received the request, verified the API key signature, and rejected processing because the compute cluster handling the request has saturated its queue.

---

## 2. Why Does It Persist Across All Models?

If switching models in the UI does not resolve the issue, two mechanisms are responsible:

1. **Automated Fallback Cascading**:
   In `worker/index.ts`, `callGeminiWithRetryAndFallback()` implements an automatic fallback loop:
   ```ts
   const modelsToTry = [primaryModel, 'gemini-3.8-flash', 'gemini-flash-latest', 'gemini-3.1-flash-lite'];
   ```
   When your primary model request receives a `503`, the worker automatically attempts fallback models behind the scenes. If every fallback also receives a `503`, the final error is surfaced to the client. This proves that **all candidate models are being rejected at the Google account/project tier**, not merely the single model chosen in the UI.

2. **Project-Tier Gating (Not Model-Specific Overload)**:
   Google does not partition capacity solely by individual model name. Free-tier API keys share global project quotas. When a Google Cloud project or shared free-tier pool is throttled, Google returns `503 UNAVAILABLE` across **all** Gemini models for that project.

---

## 3. Probable Causes & Solutions

### Cause 1: Google AI Studio Free-Tier Shared Capacity Gating

#### The Mechanism:
Google AI Studio offers two account tiers:
- **Free Tier (Default)**: Uses a shared, opportunistic compute pool with strict rate limits (Requests Per Minute, Tokens Per Minute, and Requests Per Day). During peak usage periods, Google automatically deprioritizes free-tier requests and returns HTTP 503 `UNAVAILABLE` rather than queueing requests.
- **Pay-as-you-go (Blended Cloud Project)**: Billed via Google Cloud Console. Requests are routed to dedicated enterprise capacity clusters with high-availability SLAs.

#### How to Identify:
- The error persists continuously regardless of the time of day or model selected.
- Your API key was generated directly from `aistudio.google.com` without a linked Google Cloud Billing Account.

#### The Solution:
1. Go to [Google AI Studio](https://aistudio.google.com/).
2. Click **Get API key** in the left sidebar.
3. Check whether your API key is in a project with **Billing Enabled**.
4. To enable billing:
   - Go to [Google Cloud Console](https://console.cloud.google.com/billing).
   - Link a valid credit card or billing account to the Google Cloud Project hosting your Gemini API key.
   - *Note*: Google provides substantial free monthly usage credits on Gemini Flash models even with billing linked, but linking billing switches your requests from the throttled free pool to the high-priority production pool.

---

### Cause 2: Cloudflare Edge Egress IP Pooling & Throttling

#### The Mechanism:
Cloudflare Workers and Pages Functions execute across hundreds of edge data centers worldwide. All outbound HTTP requests (`fetch`) from workers in a given geographical region exit via a shared pool of Cloudflare public IP addresses.

If hundreds of other developers or scraping bots on Cloudflare are making unauthenticated or free-tier requests to `generativelanguage.googleapis.com` from those same shared egress IP ranges:
- Google's perimeter rate-limiters identify high request volume from those Cloudflare IP blocks.
- Google treats requests from those IPs with aggressive capacity shedding, resulting in persistent 503s for free-tier keys.

#### The Solution:
- Linking a Google Cloud Billing account (as in Cause 1) overrides IP-based rate limiting because requests are authenticated to a paying account.
- Alternatively, run the Express backend (`server.ts`) on a dedicated VPS/container (e.g., Cloud Run, Railway, Render, Fly.io) with a static/dedicated IP rather than Cloudflare serverless edge.

---

### Cause 3: Cloudflare Pages vs. Cloudflare Worker Architecture Disconnect

#### The Mechanism:
SpeechCraft Studio uses a decoupled production architecture:
1. **Frontend**: Static React bundle hosted on Cloudflare Pages.
2. **Backend**: Serverless API hosted on Cloudflare Workers (`worker/index.ts`).

When deploying to Cloudflare Pages, Vite needs to know the URL of your worker:
```ts
const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/+$/, '');
```

If `VITE_API_BASE_URL` is **not set** during the Cloudflare Pages build:
- The frontend defaults to relative paths (e.g., `fetch('/api/generate-vocab-lesson')`).
- The request goes directly to the **Cloudflare Pages** domain instead of your **Cloudflare Worker**.
- Cloudflare Pages either looks for a matching file in `functions/api/` or falls back to `index.html` (Single Page Application routing).
- If the endpoint does not exist in `functions/`, the request fails with a 404 or an unexpected response that triggers fallback errors.

#### The Solution:
1. Deploy your Cloudflare Worker:
   ```bash
   cd worker
   wrangler deploy
   ```
   Copy the resulting worker URL (e.g., `https://speechcraft-worker.<subdomain>.workers.dev`).
2. Go to **Cloudflare Dashboard** -> **Workers & Pages** -> Select your **Pages project**.
3. Navigate to **Settings** -> **Environment variables**.
4. Under **Production**, add:
   - **Variable name**: `VITE_API_BASE_URL`
   - **Value**: `https://speechcraft-worker.<subdomain>.workers.dev` (replace with your actual worker URL, no trailing slash).
5. **Trigger a new deployment** in Cloudflare Pages so Vite bakes the new environment variable into the compiled JavaScript bundle.

---

### Cause 4: API Key Restrictions (HTTP Referrer / IP Mismatch)

#### The Mechanism:
In Google Cloud Console, API keys can have **Application Restrictions**:
- **None**: Usable from anywhere.
- **HTTP Referrers (Websites)**: Restricted to specific domains (e.g., `https://your-domain.pages.dev/*`).
- **IP Addresses**: Restricted to specific server IPs.

If your Gemini API key has an **HTTP Referrer** restriction:
- When a client browser calls Google directly, the browser sends the `Referer` header.
- **However**, when requests go through a Cloudflare Worker or backend proxy, the Worker acts as a server-side client. Edge workers do not send the browser's `Referer` header unless explicitly forwarded, causing Google to reject or throttle the request.

#### The Solution:
1. Open the [Google Cloud Console Credentials Page](https://console.cloud.google.com/apis/credentials).
2. Select your Gemini API Key.
3. Under **Application restrictions**, select **None** (recommended for server-side API keys stored securely in Cloudflare Worker secrets).
4. Under **API restrictions**, choose **Restrict key** and ensure **Generative Language API** is checked.
5. Click **Save** and wait 2–5 minutes for Google's global routing tables to propagate.

---

### Cause 5: Missing or Misplaced Secrets in Cloudflare

#### The Mechanism:
Cloudflare has two distinct places for environment variables:
1. **Cloudflare Pages Environment Variables**: Read by your build script or Pages Functions.
2. **Cloudflare Worker Secrets**: Read by your standalone Worker (`worker/index.ts`).

If you set `GEMINI_API_KEY` in Cloudflare Pages settings but deployed the API as a Cloudflare Worker, the Worker will not see the key. The worker then either fails with `500 Missing API key` or uses an uninitialized key that fails authentication.

#### The Solution:
Set the secret directly on the Cloudflare Worker using Wrangler CLI:
```bash
wrangler secret put GEMINI_API_KEY
```
When prompted, paste your actual Google Gemini API key.

Alternatively, in the Cloudflare Dashboard:
1. Go to **Workers & Pages** -> Click your **speechcraft-worker** service.
2. Go to **Settings** -> **Variables and Secrets**.
3. Click **Add** under **Worker Secrets**.
4. Name: `GEMINI_API_KEY`, Value: your key. Click **Deploy**.

---

### Cause 6: Cloudflare Worker Runtime Compatibility (`nodejs_compat`)

#### The Mechanism:
The backend worker uses `@google/genai` and `Buffer` for audio payload decoding. Cloudflare Workers run on V8 isolates rather than full Node.js. If `compatibility_flags = ["nodejs_compat"]` is missing from `wrangler.toml`, modules relying on Node's `buffer` or `crypto` can throw runtime exceptions or fail network handshakes.

#### Verification:
Ensure `wrangler.toml` contains:
```toml
name = "speechcraft-worker"
main = "worker/index.ts"
compatibility_date = "2024-03-01"
compatibility_flags = ["nodejs_compat"]

[vars]
ENVIRONMENT = "production"
```

---

### Cause 7: Regional Routing & Geographic Availability

#### The Mechanism:
Google Gemini API availability varies by region. If a Cloudflare Worker request is executed on an edge data center in a country where Gemini API access is restricted (or requires specialized European data processing agreements), Google's endpoint may reject the request with `503 UNAVAILABLE` or `403 FORBIDDEN`.

#### The Solution:
- In Google AI Studio, ensure your project is configured with a supported primary region (e.g., `us-central1` or global).
- If your users are global, consider configuring Cloudflare Worker Placement or running the backend on Google Cloud Run (asia-east1, us-central1, or europe-west1) where direct intra-cloud VPC routing guarantees low latency and regional compliance.

---

## 4. Step-by-Step Verification Procedure

Follow these 4 tests in order to isolate the exact point of failure.

### Step A: Validate the Key Locally with cURL

Run this command from your local terminal to verify that your Gemini API key is valid and not account-blocked:

```bash
curl -X POST \
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=YOUR_ACTUAL_GEMINI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "contents": [{
      "parts": [{"text": "Hello, confirm you are operational in one short sentence."}]
    }]
  }'
```

- **If this returns 503**: The issue is 100% on Google's side (Free-tier capacity saturation, account billing needed, or regional block).
- **If this returns 200 OK**: Your key and Google account are working properly. The issue is in your Cloudflare deployment configuration.

---

### Step B: Test the Deployed Cloudflare Worker Directly

Send a test request directly to your deployed Cloudflare Worker endpoint:

```bash
curl -X POST \
  "https://YOUR_WORKER_SUBDOMAIN.workers.dev/api/generate-vocab-lesson" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Create a 1-sentence lesson about the word resilient."
  }'
```

- **If this returns 500 Missing API key**: The `GEMINI_API_KEY` secret is not configured in the worker. Run `wrangler secret put GEMINI_API_KEY`.
- **If this returns 503**: Your worker is reaching Google, but Google is rejecting requests from the Cloudflare edge IP pool (see Cause 1 and Cause 2).
- **If this returns 200 OK**: Your worker backend is fully functional. Any issues in the browser are caused by the frontend URL configuration (Step C).

---

### Step C: Verify Cloudflare Pages Build Environment Variables

1. Open your deployed Cloudflare Pages web app in your browser.
2. Open Developer Tools (`F12`) -> **Network** tab.
3. Trigger a lesson generation or speech analysis action in SpeechCraft Studio.
4. Filter by `Fetch/XHR`.
5. Look at the **Request URL** of the outgoing call:
   - **Correct**: `https://speechcraft-worker.<subdomain>.workers.dev/api/generate-vocab-lesson`
   - **Incorrect**: `https://your-site.pages.dev/api/generate-vocab-lesson` (indicates `VITE_API_BASE_URL` was not set at build time).

---

### Step D: Inspect Cloudflare Worker Real-Time Logs

To see the exact error thrown inside Cloudflare Worker execution:

1. In your terminal, run:
   ```bash
   wrangler tail speechcraft-worker
   ```
2. Trigger the failing request from your browser.
3. Watch the terminal output for the `[WORKER ERROR]` stack trace. This will output Google's raw HTTP response code, error status, and request details.

---

## 5. Quick Diagnostic Decision Matrix

| Symptom | Likely Root Cause | Immediate Action |
| :--- | :--- | :--- |
| **All models return 503 constantly** | Google AI Studio Free Tier capacity exhaustion | Link a billing account to the Google Cloud Project in Google Cloud Console. |
| **Local cURL succeeds, but Worker returns 503** | Cloudflare Edge egress IP throttling or API key referrer restriction | Set Application Restrictions to "None" in Google Cloud Console. |
| **Worker returns 500 `Missing API key`** | Worker secret not bound | Run `wrangler secret put GEMINI_API_KEY`. |
| **Browser Network tab shows `/api/...` on Pages domain** | `VITE_API_BASE_URL` missing at build time | Add `VITE_API_BASE_URL` in Cloudflare Pages Settings and redeploy. |
| **Network request fails with CORS error** | Worker not sending CORS headers on OPTIONS | Verify CORS headers in `worker/index.ts` (already included in latest release). |
| **Speech analysis fails on audio buffer** | Missing Node compatibility in Worker | Add `compatibility_flags = ["nodejs_compat"]` to `wrangler.toml`. |
| **Browser displays `[object Object]`** | Nested JSON error serialization | Fixed in latest update via `extractErrorMessage()`. Pull latest code. |

---

## 📌 Summary Checklist for Production Deployment

1. [ ] **Google Cloud**: API Key generated, billing linked (Pay-as-you-go), restrictions set to None (or Generative Language API only).
2. [ ] **Cloudflare Worker**: Deployed via `wrangler deploy` with `compatibility_flags = ["nodejs_compat"]`.
3. [ ] **Worker Secret**: Set via `wrangler secret put GEMINI_API_KEY`.
4. [ ] **Cloudflare Pages**: Environment variable `VITE_API_BASE_URL=https://your-worker.workers.dev` configured before running `npm run build`.
5. [ ] **Smoke Test**: Run `curl` against the worker endpoint directly to confirm HTTP 200 response.
