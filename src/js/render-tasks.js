import { refs } from './refs';

export function renderTasks(tasks = []) {
  const markup = tasks
    .map(
      ({ taskId, taskName, taskDescription }) =>
        `<li class="task-list-item">
       <button class="task-list-item-btn" data-id="${taskId}">Delete</button>
       <h3>${taskName}</h3>
       <p>${taskDescription}</p>
     </li>`
    )
    .join('\n');

  refs.tasksList.innerHTML = markup;
}
