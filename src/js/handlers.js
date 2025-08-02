import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { nanoid } from 'nanoid';
import { renderTasks } from './render-tasks';
import { getFromLS, saveToLS } from './local-storage-api';
import { STORAGE_KEYS, THEMES } from './constants';

let tasks = getFromLS(STORAGE_KEYS.TASK_LIST) || [];

export function onTaskFormSubmit(e) {
  e.preventDefault();

  const { taskName, taskDescription } = e.target.elements;
  const taskNameValue = taskName.value.trim();
  const taskDescriptionValue = taskDescription.value.trim();

  if (!taskNameValue || !taskDescriptionValue) {
    iziToast.error({ message: 'Fill input', position: 'topLeft' });
    return;
  }

  const task = {
    taskId: nanoid(),
    taskName: taskNameValue,
    taskDescription: taskDescriptionValue,
  };

  tasks.push(task);
  saveToLS(STORAGE_KEYS.TASK_LIST, tasks);

  e.target.reset();
  //   console.log(tasks);

  renderTasks(tasks);
}

export function onDeleteTaskBtnClick(e) {
  if (e.target.nodeName !== 'BUTTON') return;

  const taskId = e.target.dataset.id;
  tasks = tasks.filter(task => task.taskId !== taskId);

  saveToLS(STORAGE_KEYS.TASK_LIST, tasks);
  e.target.closest('li').remove();
}

export function onThemeChangeBtnClick() {
  const classList = document.body.classList;
  const newTheme = classList.contains('theme-light')
    ? 'theme-dark'
    : 'theme-light';

  classList.remove(...THEMES);
  classList.add(newTheme);
  saveToLS(STORAGE_KEYS.SITE_THEME, newTheme);

  //   console.log(classList);
}
