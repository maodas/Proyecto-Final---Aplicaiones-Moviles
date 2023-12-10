let pendingTasks = [];
let completedTasks = [];

function updateTaskSummary() {
    const pendingTasksCount = pendingTasks.length;
    const completedTasksCount = completedTasks.length;

    document.getElementById("pending-tasks").innerText = pendingTasksCount;
    document.getElementById("completed-tasks").innerText = completedTasksCount;
}

function renderTaskList() {
    renderTasks("pending", pendingTasks);
    renderTasks("completed", completedTasks);
}

function renderTasks(listType, tasksArray) {
    const taskList = document.getElementById(`${listType}-list`);
    taskList.innerHTML = "";

    tasksArray.forEach(task => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${task.title} (${task.type})</span>
            <button onclick="showTaskDetails('${listType}', '${task.title}', '${task.description}', '${task.type}')">Detalles</button>
            <button onclick="moveTask('${listType}', '${task.title}')">Mover a ${listType === 'pending' ? 'Completadas' : 'Pendientes'}</button>
            <button onclick="deleteTask('${listType}', '${task.title}')">Eliminar</button>
        `;
        taskList.appendChild(li);
    });
}

function showTaskDetails(listType, title, description, type) {
    alert(`Detalles de la tarea:\n\nTítulo: ${title}\nDescripción: ${description}\nTipo: ${type}\nEstado: ${listType === 'pending' ? 'Pendiente' : 'Completada'}`);
}

function moveTask(fromList, title) {
    const sourceArray = fromList === 'pending' ? pendingTasks : completedTasks;
    const destinationArray = fromList === 'pending' ? completedTasks : pendingTasks;

    const taskIndex = sourceArray.findIndex(task => task.title === title);

    if (taskIndex !== -1) {
        const movedTask = sourceArray.splice(taskIndex, 1)[0];
        destinationArray.push(movedTask);
        updateTaskSummary();
        renderTaskList();
    }
}

function deleteTask(listType, title) {
    const confirmed = confirm("¿Estás seguro de que deseas eliminar esta tarea?");

    if (confirmed) {
        const targetArray = listType === 'pending' ? pendingTasks : completedTasks;
        const taskIndex = targetArray.findIndex(task => task.title === title);

        if (taskIndex !== -1) {
            targetArray.splice(taskIndex, 1);
            updateTaskSummary();
            renderTaskList();
        }
    }
}


function addTask() {
    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();
    const type = document.getElementById("type").value;

    if (title === "") {
        alert("Por favor, ingrese un título para la tarea.");
        return;
    }

    const newTask = {
        title,
        description,
        type,
    };

    pendingTasks.push(newTask);
    updateTaskSummary();
    renderTaskList();
}


renderTaskList();
