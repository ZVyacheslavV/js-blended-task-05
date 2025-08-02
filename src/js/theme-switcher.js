/* document.body.classList; */

import { STORAGE_KEYS, THEMES } from './constants';
import { onThemeChangeBtnCLick } from './handlers';
import { getFromLS } from './local-storage-api';
import { refs } from './refs';

const savedTheme = getFromLS(STORAGE_KEYS.SITE_THEME);

export function renderTheme() {
  if (THEMES.includes(savedTheme)) {
    const classList = document.body.classList;
    classList.remove(...THEMES);
    classList.add(savedTheme);
  }
}
