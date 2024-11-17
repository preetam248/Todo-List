document.addEventListener("DOMContentLoaded", function () {
    const todoInput = document.getElementById("todo-input");
    const addTaskButton = document.getElementById("add-task-btn");
    const todoList = document.getElementById("todo-list");

    let tasks = JSON.parse(localStorage.getItem("task")) || [];

    tasks.forEach((ele) => {
        renderTask(ele);
    })

    addTaskButton.addEventListener("click", function () {
        let inputTask = todoInput.value.trim();
        if (inputTask === "") {
            return;
        }

        let newTask = {
            id: Date.now(),
            text: inputTask,
            completed: false
        }

        tasks.push(newTask);
        saveTasks();
        renderTask(newTask);
        todoInput.value = "";
        //// console.log(tasks);
    }, false);

    function saveTasks() {
        localStorage.setItem("task", JSON.stringify(tasks));
    }

    function renderTask(task) {
        //// console.log(task);
        let listItem = document.createElement("li");
        listItem.setAttribute("data-id", task.id);
        if (task.completed) {
            listItem.classList.add("completed");
        }
        listItem.innerHTML = `
        <span>${task.text}</span>
        <button>Delete</button>
        `;

        listItem.addEventListener("click", function (e) {
            if (e.target.tagName === "BUTTON") return;
            task.completed = !task.completed;
            listItem.classList.toggle("completed");
            saveTasks();
        },false)

        listItem.querySelector("button").addEventListener("click", function (e) {
            tasks = tasks.filter((ele) => ele.id !== task.id);
            listItem.remove();
            saveTasks();
        }, false);

        todoList.appendChild(listItem);
    }


}, false)