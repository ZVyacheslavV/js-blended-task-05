//JS Course teacher's variant:
/* export function getFromLS(key, defaultValue) {
  const jsonData = localStorage.getItem(key);
  try {
    return JSON.parse(jsonData);
  } catch {
    defaultValue || jsonData;
  }
} */

//Blended teacher's variant:
/* function getFromLS(key) {
  try {
    const jsonData = localStorage.getItem(key);
    return jsonData ? JSON.parse(jsonData) : null;
  } catch (error) {
    console.log('Error from LS:', error);
  }
} */

//From GPT improved-1st variant:
export function getFromLS(key, defaultValue) {
  const jsonData = localStorage.getItem(key);

  if (jsonData === null) {
    return defaultValue;
  }

  try {
    return JSON.parse(jsonData);
  } catch {
    return defaultValue ?? jsonData;
  }
}

/*Що тут:

    Якщо ключа немає → повертаємо defaultValue.

    Якщо JSON валідний → парсимо і повертаємо.

    Якщо JSON битий → повертаємо defaultValue (якщо він є) або сирі дані.
    */

export function saveToLS(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
