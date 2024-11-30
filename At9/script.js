document.addEventListener("DOMContentLoaded", function() {
    const taskForm = document.getElementById("taskForm");
    const taskList = document.getElementById("taskList");
    const filterStatusButton = document.getElementById("filterStatus");
    const filterPriorityButton = document.getElementById("filterPriority");
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let filterStatus = "all";
    let filterPriority = false;

    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function renderTasks() {
        taskList.innerHTML = "";
        let filteredTasks = tasks.filter(task => {
            if (filterStatus === "completed") return task.completed;
            if (filterStatus === "pending") return !task.completed;
            return true;
        });

        if (filterPriority) {
            filteredTasks.sort((a, b) => a.priority.localeCompare(b.priority));
        }

        filteredTasks.forEach((task, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
                <span>${task.name}</span>
                <span>${task.dueDate}</span>
                <span>${task.priority}</span>
                <span>${task.completed ? "Completed" : "Pending"}</span>
                <button onclick="editTask(${index})">Edit</button>
                <button onclick="toggleCompletion(${index})">Toggle</button>
            `;
            taskList.appendChild(li);
        });
    }

    function notifyUrgentTasks() {
        const now = new Date();
        tasks.forEach(task => {
            const dueDate = new Date(task.dueDate);
            if (!task.completed && dueDate - now < 2 * 24 * 60 * 60 * 1000) {
                alert(`Task "${task.name}" is near its deadline!`);
            }
        });
    }

    taskForm.addEventListener("submit", function(e) {
        e.preventDefault();
        const name = document.getElementById("taskName").value;
        const dueDate = document.getElementById("taskDueDate").value;
        const priority = document.getElementById("taskPriority").value;
        tasks.push({ name, dueDate, priority, completed: false });
        saveTasks();
        renderTasks();
        taskForm.reset();
    });

    filterStatusButton.addEventListener("click", function() {
        if (filterStatus === "all") filterStatus = "completed";
        else if (filterStatus === "completed") filterStatus = "pending";
        else filterStatus = "all";
        renderTasks();
    });

    filterPriorityButton.addEventListener("click", function() {
        filterPriority = !filterPriority;
        renderTasks();
    });

    window.toggleCompletion = function(index) {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
    };

    window.editTask = function(index) {
        const newName = prompt("Enter new name", tasks[index].name);
        const newDate = prompt("Enter new due date", tasks[index].dueDate);
        const newPriority = prompt("Enter new priority", tasks[index].priority);
        if (newName && newDate && newPriority) {
            tasks[index].name = newName;
            tasks[index].dueDate = newDate;
            tasks[index].priority = newPriority;
            saveTasks();
            renderTasks();
        }
    };

    renderTasks();
    notifyUrgentTasks();
});