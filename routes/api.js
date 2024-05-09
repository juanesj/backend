// api.js
const API_URL = 'http://localhost:3000';

export async function addTask(task) {
    try {
        const response = await fetch(`${API_URL}/tasks/addtasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'API_KEY_AQUI' // Reemplaza con la clave API real
            },
            body: JSON.stringify(task)
        });
        if (response.status !== 200) throw new Error('Failed to add task');
        return await response.json();
    } catch (error) {
        console.error('Error al añadir la tarea:', error);
    }
}


