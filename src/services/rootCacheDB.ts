import { ExpandedRootItem } from '../types/speech';

const DB_NAME = 'speechcraft_roots_cache_v1';
const STORE_NAME = 'generated_roots';
const DB_VERSION = 1;
const LOCALSTORAGE_KEY = 'speechcraft_generated_roots_fallback_v1';

class RootCacheDB {
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
          db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        }
      };

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = () => {
        reject(request.error || new Error('Failed to open roots IndexedDB'));
      };
    });

    return this.dbPromise;
  }

  async get(id: string): Promise<ExpandedRootItem | null> {
    try {
      const db = await this.getDB();
      const itemFromIdb = await new Promise<ExpandedRootItem | null>((resolve) => {
        const tx = db.transaction(STORE_NAME, 'readonly');
        const store = tx.objectStore(STORE_NAME);
        const req = store.get(id);

        req.onsuccess = () => {
          resolve(req.result || null);
        };
        req.onerror = () => {
          resolve(null);
        };
      });

      if (itemFromIdb) return itemFromIdb;
    } catch {
      // Fall through to localStorage
    }

    try {
      const raw = localStorage.getItem(LOCALSTORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        return parsed[id] || null;
      }
    } catch {
      // Ignored
    }

    return null;
  }

  async getAll(): Promise<Record<string, ExpandedRootItem>> {
    const result: Record<string, ExpandedRootItem> = {};

    try {
      const raw = localStorage.getItem(LOCALSTORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        Object.assign(result, parsed);
      }
    } catch {
      // Ignored
    }

    try {
      const db = await this.getDB();
      const idbItems = await new Promise<ExpandedRootItem[]>((resolve) => {
        const tx = db.transaction(STORE_NAME, 'readonly');
        const store = tx.objectStore(STORE_NAME);
        const req = store.getAll();

        req.onsuccess = () => {
          resolve(req.result || []);
        };
        req.onerror = () => {
          resolve([]);
        };
      });

      idbItems.forEach((item) => {
        if (item && item.id) {
          result[item.id] = item;
        }
      });
    } catch {
      // Ignored
    }

    return result;
  }

  async set(item: ExpandedRootItem): Promise<void> {
    try {
      const db = await this.getDB();
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      store.put(item);
    } catch {
      // Ignored
    }

    try {
      const raw = localStorage.getItem(LOCALSTORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : {};
      parsed[item.id] = item;
      localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(parsed));
    } catch {
      // Ignored
    }
  }
}

export const rootCacheDB = new RootCacheDB();
