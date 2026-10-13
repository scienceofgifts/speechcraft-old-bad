# 🎙️ SpeechCraft Studio

**SpeechCraft Studio** is a professional, high-performance web application for General American English (GenAm) speech training, accent reduction, executive verbal delivery, and spontaneous conversational coaching. Powered by Google Gemini AI models, it delivers real-time acoustic analysis, phonetic scoring, filler control, and instant reference audio playback.

---

## 🌟 Key Features

- **Acoustic Speech Analysis**: Direct audio processing evaluating Words Per Minute (WPM), filler sound detection (`um`, `uh`, `like`), clarity, articulation, rhotic R, and intervocalic flap T.
- **Configurable Gemini AI Models**: Supports selecting between 6 verified Gemini Flash models (*Gemini 3.5 Flash Lite*, *Gemini 3.8 Flash*, *Gemini 3.7 Flash*, *Gemini 3.6 Flash*, *Gemini 3.5 Flash*, and *Gemini 3.1 Flash Lite*).
- **High-Performance Reference Audio**: Dual-tier audio caching (In-Memory LRU + IndexedDB) with single-flight request deduplication for instant reference audio playback without duplicate queueing.
- **Conversational Coaching Lab**: Interactive scenarios with real-time feedback and guided conversational follow-up questions.
- **Privacy First**: Audio recordings remain in browser memory and are analyzed on demand via secure server-side API calls.

---

## 🏗️ Production Target Architecture

To ensure enterprise-grade security and reliability, SpeechCraft Studio uses a decoupled production architecture:
1. **GitHub**: Source control and version history.
2. **Cloudflare Pages**: Hosts the static React frontend SPA.
3. **Dedicated Cloudflare Worker (`speechcraft-api`)**: Handles all Gemini API requests securely using server-side secrets.

---

## 📋 Prerequisites

Before deploying, make sure you have:
1. **Node.js** (v18 or higher) & `npm` / `bun` installed locally.
2. **Wrangler CLI** installed (`npm install -g wrangler`).
3. A **Google Gemini API Key** (obtainable free from [Google AI Studio](https://aistudio.google.com/)).
4. A **GitHub Account**.
5. A **Cloudflare Account** (free tier is fully supported).

---

## 💻 Local Development Setup

To run SpeechCraft Studio locally:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/speechcraft-studio.git
   cd speechcraft-studio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory:
   ```env
   GEMINI_API_KEY=your_actual_gemini_api_key_here
   PORT=3000
   ```

4. **Start the local server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser. The app runs a full-stack Express + Vite server with server-side Gemini API proxy endpoints.

---

## 🚀 Complete Production Deployment Guide

### Step 1: Push Code to GitHub

1. **Initialize Git repository** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit of SpeechCraft Studio"
   ```

2. **Create a new repository on GitHub**:
   - Go to [GitHub New Repository](https://github.com/new).
   - Name your repository (e.g., `speechcraft-studio`).
   - Leave it public or private, do NOT initialize with a README.
   - Click **Create repository**.

3. **Push local code to GitHub**:
   ```bash
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/speechcraft-studio.git
   git push -u origin main
   ```

---

### Step 2: Deploy the Dedicated Cloudflare API Worker (`speechcraft-api`)

The API Worker handles all Gemini API requests securely without exposing your API key to the browser.

1. **Log in to Cloudflare via Wrangler**:
   ```bash
   npx wrangler login
   ```

2. **Set the Gemini API Key as a secure Worker secret**:
   ```bash
   npx wrangler secret put GEMINI_API_KEY --name speechcraft-api
   ```
   *(When prompted, paste your actual Google Gemini API Key. This securely encrypts the secret on Cloudflare).*

3. **Deploy the Worker**:
   ```bash
   cd worker
   npx wrangler deploy --config wrangler.toml
   ```
   Once deployed, Wrangler will output your Worker URL, for example:
   `https://speechcraft-api.your-subdomain.workers.dev`
   *(Save this URL for Step 3).*

---

### Step 3: Deploy the Frontend to Cloudflare Pages

1. **Log in to Cloudflare Dashboard**:
   - Open the [Cloudflare Dashboard](https://dash.cloudflare.com/).

2. **Create a Pages Application**:
   - In the left sidebar, navigate to **Workers & Pages**.
   - Click **Create application** -> select **Pages** tab -> click **Connect to Git**.

3. **Connect GitHub & Select Repository**:
   - Authorize Cloudflare to access your GitHub account.
   - Select your `speechcraft-studio` repository and click **Begin setup**.

4. **Configure Build Settings**:
   - **Project Name**: `speechcraft-studio` (or your choice).
   - **Production branch**: `main`.
   - **Framework preset**: `Vite`.
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`

5. **Configure Frontend Environment Variable**:
   - Expand the **Environment variables (advanced)** section.
   - Add the production API Worker URL:
     - **Variable name**: `VITE_GEMINI_API_URL`
     - **Value**: `https://speechcraft-api.your-subdomain.workers.dev` *(use the URL obtained in Step 2)*
   - Set this for both **Production** and **Preview** environments.

6. **Deploy**:
   - Click **Save and Deploy**.
   - Cloudflare Pages will build your Vite React SPA and provide a live frontend URL (e.g., `https://speechcraft-studio.pages.dev`).

---

## 🔄 Automated Redeployments

Once connected to Cloudflare Pages and GitHub:
- Whenever you push updates to `main` (`git push origin main`), Cloudflare Pages automatically rebuilds and redeploys the frontend.
- To update the API Worker, run `cd worker && npx wrangler deploy --config wrangler.toml`.

---

## ⚡ Troubleshooting & FAQ

### 1. API requests fail with Network Error on Cloudflare Pages
- **Cause**: `VITE_GEMINI_API_URL` was not set or was set incorrectly during build time.
- **Solution**: Go to **Cloudflare Pages Project Settings** -> **Environment Variables**, ensure `VITE_GEMINI_API_URL` points to your deployed `speechcraft-api` Worker URL, and trigger a new deployment.

### 2. Gemini API returns authentication error
- **Cause**: `GEMINI_API_KEY` secret was not set correctly on the Worker.
- **Solution**: Re-run `npx wrangler secret put GEMINI_API_KEY --name speechcraft-api` and re-deploy the worker.

### 3. Microphone Recording Issues
- **Cause**: Browsers restrict microphone access to secure origins (`https://` or `localhost`).
- **Solution**: Access the app over `https://` on Cloudflare Pages and grant microphone permissions when prompted.

---

## 📄 License

MIT License. Built for SpeechCraft Studio.
