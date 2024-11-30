document.addEventListener("DOMContentLoaded", function() {
    const taskForm = document.getElementById("taskForm");
    const taskList = document.getElementById("taskList");
    const filterButton = document.getElementById("filterTasks");
    const sortButton = document.getElementById("sortTasks");
    let tasks = [];
    let filterStatus = "all";

    function renderTasks() {
        taskList.innerHTML = "";
        let filteredTasks = tasks.filter(task => {
            if (filterStatus === "completed") return task.concluida;
            if (filterStatus === "pending") return !task.concluida;
            return true;
        });

        filteredTasks.sort((a, b) => {
            if (a.priority === b.priority) {
                return new Date(a.dueDate) - new Date(b.dueDate);
            }
            return ["alta", "media", "baixa"].indexOf(a.priority) - ["alta", "media", "baixa"].indexOf(b.priority);
        });

        filteredTasks.forEach((task, index) => {
            const li = document.createElement("li");
            li.className = task.concluida ? "completed" : "";
            li.className += isUrgent(task) ? " urgent" : "";
            li.innerHTML = `
                <span>${task.name}</span>
                <span>${task.dueDate}</span>
                <span>${task.priority}</span>
                <input type="checkbox" ${task.concluida ? "checked" : ""} onchange="toggleCompletion(${index})">
                <button onclick="editTask(${index})">Editar</button>
            `;
            taskList.appendChild(li);
        });
    }

    function isUrgent(task) {
        const today = new Date();
        const dueDate = new Date(task.dueDate);
        return !task.concluida && (dueDate - today < 2 * 24 * 60 * 60 * 1000);
    }

    taskForm.addEventListener("submit", function(e) {
        e.preventDefault();
        const name = document.getElementById("taskName").value;
        const dueDate = document.getElementById("taskDueDate").value;
        const priority = document.getElementById("taskPriority").value;
        tasks.push({ name, dueDate, priority, concluida: false });
        renderTasks();
        taskForm.reset();
    });

    filterButton.addEventListener("click", function() {
        if (filterStatus === "all") filterStatus = "completed";
        else if (filterStatus === "completed") filterStatus = "pending";
        else filterStatus = "all";
        renderTasks();
    });

    sortButton.addEventListener("click", function() {
        tasks.sort((a, b) => {
            if (a.priority === b.priority) {
                return new Date(a.dueDate) - new Date(b.dueDate);
            }
            return ["alta", "media", "baixa"].indexOf(a.priority) - ["alta", "media", "baixa"].indexOf(b.priority);
        });
        renderTasks();
    });

    window.toggleCompletion = function(index) {
        tasks[index].concluida = !tasks[index].concluida;
        renderTasks();
    };

    window.editTask = function(index) {
        const newName = prompt("Digite o novo nome", tasks[index].name);
        const newDate = prompt("Digite a nova data", tasks[index].dueDate);
        const newPriority = prompt("Digite a nova prioridade (alta, media, baixa)", tasks[index].priority);
        if (newName && newDate && newPriority) {
            tasks[index].name = newName;
            tasks[index].dueDate = newDate;
            tasks[index].priority = newPriority;
            renderTasks();
        }
    };

    renderTasks();
});