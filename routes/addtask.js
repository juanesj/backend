// addTask.js
import { addTask as apiAddTask } from './api';

export default async function addTask(task) {
    // Aquí puedes agregar cualquier lógica adicional antes de enviar la tarea.
    return apiAddTask(task);
}
