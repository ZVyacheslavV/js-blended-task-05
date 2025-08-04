//================================================================
//================================================================
/* local-storage-api.js з JSDoc */

/**
 * local-storage-api.js
 * Універсальний модуль для роботи з localStorage з JSDoc типізацією
 */

/**
 * Safely saves a value to localStorage.
 *
 * @template T
 * @param {string} key - The key under which to save data.
 * @param {T} value - Any value to store (will be JSON-serialized if not a string).
 * @returns {void}
 */
export function setToLS(key, value) {
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
 * @template T
 * @param {string} key - The key to retrieve.
 * @param {T} [defaultValue=null] - Fallback if not found or invalid.
 * @returns {T|string|null} The parsed value, raw string, or default.
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
      return defaultValue ?? raw;
    }
  } catch (err) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(`getFromLS error for key "${key}":`, err);
    }
    return defaultValue;
  }
}

/**
 * Removes a key from localStorage.
 *
 * @param {string} key - The key to remove.
 * @returns {void}
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
 *
 * @returns {void}
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

/* 🔹 Приклади використання з підказками у VSCode */

import { setToLS, getFromLS, removeFromLS } from './js/local-storage-api.js';

/** @type {{ id: number, name: string, done: boolean }[]} */
const tasks = [
  { id: 1, name: 'Learn JS', done: false },
  { id: 2, name: 'Build project', done: true },
];

// Збереження масиву задач
setToLS('tasks', tasks);

// Отримання масиву (VSCode підкаже тип)
const savedTasks = getFromLS('tasks', []);
console.log(savedTasks[0]?.name); // автопідказка: string

// Збереження примітивного значення
setToLS('theme', 'dark');
const theme = getFromLS('theme', 'light'); // theme: string

/* 🔑 Переваги JSDoc‑типізації

    Автокомпліт у VSCode
    VSCode підкаже структуру tasks, коли ти витягаєш їх із localStorage.

    Мінімальний код
    Не потрібно переходити на TypeScript, але є всі переваги підказок.

    Гнучкість
    Через @template T ти можеш передавати будь‑який тип, і він збережеться у підказках. */
