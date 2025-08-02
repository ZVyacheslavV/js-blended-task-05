import { refs } from './js/refs';
import { renderTasks } from './js/render-tasks';
// import { tasks } from './js/data';
import {
  onDeleteTaskBtnClick,
  onTaskFormSubmit,
  onThemeChangeBtnClick,
} from './js/handlers';
import { getFromLS } from './js/local-storage-api';
import { STORAGE_KEYS } from './js/constants';
import { renderTheme } from './js/theme-switcher';

/*
  Створи список справ.
  На сторінці є два інпути які має вводиться назва і текст задачі.
  Після натискання на кнопку "Add" завдання додається до списку #task-list.

  У кожної картки має бути кнопка "Delete", щоб можна було
  прибрати завдання зі списку.
  Список із завданнями має бути доступним після перезавантаження сторінки.

  Розмітка картки задачі
  <li class="task-list-item">
      <button class="task-list-item-btn">Delete</button>
      <h3>Заголовок</h3>
      <p>Текст</p>
  </li>
*/

renderTheme();
renderTasks(getFromLS(STORAGE_KEYS.TASK_LIST));

refs.taskForm.addEventListener('submit', onTaskFormSubmit);
refs.tasksList.addEventListener('click', onDeleteTaskBtnClick);
refs.themeToggleBtn.addEventListener('click', onThemeChangeBtnClick);
