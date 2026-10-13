import { DetailedWordLesson } from '../types/speech';

const DB_NAME = 'speechcraft_lessons_cache_v1';
const STORE_NAME = 'generated_lessons';
const DB_VERSION = 1;
const LOCALSTORAGE_KEY = 'speechcraft_generated_lessons_fallback_v1';

class LessonCacheDB {
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
        reject(request.error || new Error('Failed to open lessons IndexedDB'));
      };
    });

    return this.dbPromise;
  }

  async get(id: string): Promise<DetailedWordLesson | null> {
    try {
      const db = await this.getDB();
      const lessonFromIdb = await new Promise<DetailedWordLesson | null>((resolve) => {
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

      if (lessonFromIdb) return lessonFromIdb;
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

  async getAll(): Promise<Record<string, DetailedWordLesson>> {
    const result: Record<string, DetailedWordLesson> = {};

    // 1. Read from localStorage fallback first
    try {
      const raw = localStorage.getItem(LOCALSTORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        Object.assign(result, parsed);
      }
    } catch {
      // Ignored
    }

    // 2. Read from IndexedDB
    try {
      const db = await this.getDB();
      const idbLessons = await new Promise<DetailedWordLesson[]>((resolve) => {
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

      idbLessons.forEach((lesson) => {
        if (lesson && lesson.id) {
          result[lesson.id] = lesson;
        }
      });
    } catch {
      // Ignored
    }

    return result;
  }

  async set(lesson: DetailedWordLesson): Promise<void> {
    // Save to IndexedDB
    try {
      const db = await this.getDB();
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      store.put(lesson);
    } catch {
      // Ignored
    }

    // Save to localStorage as redundancy
    try {
      const raw = localStorage.getItem(LOCALSTORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : {};
      parsed[lesson.id] = lesson;
      localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(parsed));
    } catch {
      // Ignored
    }
  }
}

export const lessonCacheDB = new LessonCacheDB();
