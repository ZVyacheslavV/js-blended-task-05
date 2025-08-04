/**
 * local-storage-api.js
 * Універсальний API для роботи з localStorage
 */

/**
 * Safely saves a value to localStorage.
 *
 * @param {string} key - The key to save under.
 * @param {*} value - The value to store (auto-serialized if object/array).
 */
export function saveToLS(key, value) {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return;

    const data = typeof value === 'string' ? value : JSON.stringify(value);

    window.localStorage.setItem(key, data);
  } catch (err) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(`setToLS error for key "${key}":`, err);
    }
  }
}

/**
 * Safely retrieves and parses a value from localStorage.
 *
 * @param {string} key - The localStorage key.
 * @param {*} [defaultValue=null] - Fallback if key is missing or invalid.
 * @returns {*} Parsed value or defaultValue.
 */
export function getFromLS(key, defaultValue = null) {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return defaultValue;
    }

    const raw = window.localStorage.getItem(key);
    if (raw === null) return defaultValue;

    try {
      return JSON.parse(raw);
    } catch {
      return raw; // якщо це не JSON
    }
  } catch (err) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(`getFromLS error for key "${key}":`, err);
    }
    return defaultValue;
  }
}

/* Чому це працює на рівні FAANG
✅ SSR‑сумісність
Перевірка typeof window === 'undefined' не дає впасти коду у Next.js чи Vite SSR.
✅ Дефолтне значення
Ти завжди контролюєш fallback, уникнувши null‑пасток.
✅ Гнучкий парсинг
    Якщо там JSON → повертає об’єкт.
    Якщо звичайний рядок → повертає рядок (не ламається).
✅ Безпечність
Навіть якщо localStorage недоступний (Safari Private Mode), повертається дефолт.
✅ Прозорість
У dev‑режимі ти побачиш помилки, у production — тиша. */

/**
 * Removes a specific key from localStorage.
 *
 * @param {string} key - The key to remove.
 */
export function removeFromLS(key) {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return;
    window.localStorage.removeItem(key);
  } catch (err) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(`removeFromLS error for key "${key}":`, err);
    }
  }
}

/**
 * Clears all keys from localStorage.
 */
export function clearLS() {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return;
    window.localStorage.clear();
  } catch (err) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('clearLS error:', err);
    }
  }
}

/* export function getFromLS(key, defaultValue) {
  const fallback = defaultValue !== undefined ? defaultValue : null;

  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return fallback;
    }

    const raw = window.localStorage.getItem(key);
    if (raw === null) return fallback;

    try {
      return JSON.parse(raw);
    } catch {
      return raw;
    }
  } catch {
    return fallback;
  }
} */

// Перша getFromLS В порівнянні з:
/* export function getFromLS(key, defaultValue) {
  const jsonData = localStorage.getItem(key);

  if (jsonData === null) {
    return defaultValue;
  }

  try {
    return JSON.parse(jsonData);
  } catch {
    return defaultValue ?? jsonData;
  }
} */

/* ✅ Плюси
    Коротша й легша для читання — мінімум коду.
    Логічно акуратно організована: якщо не JSON → fallback на defaultValue або рядок.
    Використання ?? робить поведінку гнучкішою:
        якщо є defaultValue → повертається воно,
        якщо його не було передано → повертається сирий рядок (jsonData).
    Менше вкладеності, легше підтримувати.

⚠️ Мінуси
    ❌ Без перевірки доступності localStorage
        У SSR (Next.js) чи Safari Private Mode → отримаєш ReferenceError.
    ❌ Необов’язковий дефолт не має фіксованого fallback:
        у випадку помилки парсингу може повернутися не null, а рядок (це може бути несподіваним).
    ❌ Відсутність обробки винятків доступу
        Наприклад, якщо localStorage заблокований політиками браузера (є й таке).
    ❌ Відсутність логування у dev‑режимі
        Ти не дізнаєшся, що JSON зламаний — просто отримаєш fallback. */
