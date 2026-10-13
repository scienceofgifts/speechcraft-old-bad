/**
 * Client-Side Audio Cache powered by IndexedDB
 *
 * Persists synthesized audio across browser reloads so words never need to be fetched
 * or synthesized twice. Excludes user microphone recordings to respect audio privacy.
 */

const DB_NAME = 'speechcraft_audio_cache_v1';
const STORE_NAME = 'audio_assets';
const DB_VERSION = 1;
const MAX_IDB_ITEMS = 300;

export interface CachedAudioEntry {
  key: string;
  audioBase64: string;
  mimeType: string;
  timestamp: number;
}

class AudioCacheDB {
  private dbPromise: Promise<IDBDatabase> | null = null;

  private getDB(): Promise<IDBDatabase> {
    if (this.dbPromise) return this.dbPromise;

    this.dbPromise = new Promise((resolve, reject) => {
      if (typeof window === 'undefined' || !window.indexedDB) {
        reject(new Error('IndexedDB not supported in this environment'));
        return;
      }

      const request = window.indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          const store = db.createObjectStore(STORE_NAME, { keyPath: 'key' });
          store.createIndex('timestamp', 'timestamp', { unique: false });
        }
      };

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = () => {
        reject(request.error || new Error('Failed to open audio IndexedDB'));
      };
    });

    return this.dbPromise;
  }

  async get(key: string): Promise<CachedAudioEntry | null> {
    try {
      const db = await this.getDB();
      return new Promise((resolve) => {
        const tx = db.transaction(STORE_NAME, 'readonly');
        const store = tx.objectStore(STORE_NAME);
        const req = store.get(key);

        req.onsuccess = () => {
          resolve(req.result || null);
        };
        req.onerror = () => {
          resolve(null);
        };
      });
    } catch {
      return null;
    }
  }

  async set(key: string, audioBase64: string, mimeType: string = 'audio/wav'): Promise<void> {
    try {
      const db = await this.getDB();
      const entry: CachedAudioEntry = {
        key,
        audioBase64,
        mimeType,
        timestamp: Date.now(),
      };

      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      store.put(entry);

      tx.oncomplete = () => {
        // Enforce maximum size bound periodically
        this.pruneOldEntries(db);
      };
    } catch {
      // Non-blocking fallback if IndexedDB is disabled or quota exceeded
    }
  }

  private async pruneOldEntries(db: IDBDatabase): Promise<void> {
    try {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const countReq = store.count();

      countReq.onsuccess = () => {
        if (countReq.result > MAX_IDB_ITEMS) {
          const deleteCount = countReq.result - MAX_IDB_ITEMS;
          const index = store.index('timestamp');
          const cursorReq = index.openCursor();
          let deleted = 0;

          cursorReq.onsuccess = () => {
            const cursor = cursorReq.result;
            if (cursor && deleted < deleteCount) {
              cursor.delete();
              deleted++;
              cursor.continue();
            }
          };
        }
      };
    } catch {
      // Ignored
    }
  }

  async clear(): Promise<void> {
    try {
      const db = await this.getDB();
      const tx = db.transaction(STORE_NAME, 'readwrite');
      tx.objectStore(STORE_NAME).clear();
    } catch {
      // Ignored
    }
  }
}

export const audioCacheDB = new AudioCacheDB();
