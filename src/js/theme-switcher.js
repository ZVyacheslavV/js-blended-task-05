import { STORAGE_KEYS, THEMES } from './constants';
import { getFromLS } from './local-storage-api';

const savedTheme = getFromLS(STORAGE_KEYS.SITE_THEME, THEMES[0]);

export function renderTheme() {
  if (THEMES.includes(savedTheme)) {
    const classList = document.body.classList;
    classList.remove(...THEMES);
    classList.add(savedTheme);
  }
}
