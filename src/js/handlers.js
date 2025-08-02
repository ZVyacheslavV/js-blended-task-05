import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { nanoid } from 'nanoid';
// import { tasks } from './data';
import { renderTasks } from './render-tasks';
import { getFromLS } from './local-storage-api';
import { STORAGE_KEYS } from './constants';

let tasks = getFromLS(STORAGE_KEYS.TASK_LIST) || {};

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
  e.target.reset();
  //   console.log(tasks);

  renderTasks(tasks);
}

export function onDeleteTaskBtnClick(e) {
  if (e.target.nodeName !== 'BUTTON') return;

  const taskId = e.target.dataset.id;
  tasks = tasks.filter(task => task.taskId !== taskId);

  e.target.closest('li').remove();
}
