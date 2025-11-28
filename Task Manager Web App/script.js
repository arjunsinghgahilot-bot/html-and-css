/* =========================================
   Task Manager with Edit, Search, Themes
   ========================================= */

// DOM Elements
const taskInput = document.getElementById("task-input");
const dateInput = document.getElementById("task-date");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");
const clearAllBtn = document.getElementById("clear-all");
const searchInput = document.getElementById("search-input");
const themeToggle = document.getElementById("theme-toggle");

// Load theme preference
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    themeToggle.checked = true;
}

// =========================================
// Add Task
// =========================================
addBtn.addEventListener("click", () => {
    const text = taskInput.value.trim();
    const dueDate = dateInput.value;

    if (text === "") return alert("Enter a task.");

    createTask(text, dueDate);
    saveTasks();
    taskInput.value = "";
    dateInput.value = "";
});

// Create Task Element
function createTask(text, dueDate) {
    const li = document.createElement("li");
    li.className = "task";

    // Deadline highlight logic
    if (dueDate) {
        const today = new Date();
        const deadline = new Date(dueDate);

        if (deadline < today.setHours(0,0,0,0)) {
            li.classList.add("overdue");
        } else if (deadline - today < 3 * 24 * 60 * 60 * 1000) {
            li.classList.add("warning");
        }
    }

    li.innerHTML = `
        <div class="task-text">
            <span class="text">${text}</span>
            ${dueDate ? `<span class="due-date">Due: ${dueDate}</span>` : ""}
        </div>

        <div class="actions">
            <button class="edit"><i class="fa-solid fa-pen"></i></button>
            <button class="delete"><i class="fa-solid fa-trash"></i></button>
        </div>
    `;

    // Edit button
    li.querySelector(".edit").addEventListener("click", () => editTask(li));

    // Delete button
    li.querySelector(".delete").addEventListener("click", () => {
        li.remove();
        saveTasks();
    });

    taskList.appendChild(li);
}

// =========================================
// Edit Task
// =========================================
function editTask(li) {
    const textEl = li.querySelector(".text");
    const oldText = textEl.textContent;

    const newText = prompt("Edit task:", oldText);
    if (newText === null || newText.trim() === "") return;

    textEl.textContent = newText;
    saveTasks();
}

// =========================================
// Save Tasks to LocalStorage
// =========================================
function saveTasks() {
    const tasks = [];
    document.querySelectorAll(".task").forEach(li => {
        tasks.push({
            text: li.querySelector(".text").textContent,
            due: li.querySelector(".due-date")
                  ? li.querySelector(".due-date").textContent.replace("Due: ", "")
                  : ""
        });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load Tasks on Start
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    tasks.forEach(t => createTask(t.text, t.due));
}

loadTasks();

// =========================================
// Clear All Tasks
// =========================================
clearAllBtn.addEventListener("click", () => {
    if (!confirm("Clear all tasks?")) return;
    taskList.innerHTML = "";
    saveTasks();
});

// =========================================
// Search / Filter Tasks
// =========================================
searchInput.addEventListener("input", () => {
    const term = searchInput.value.toLowerCase();
    document.querySelectorAll(".task").forEach(li => {
        const text = li.querySelector(".text").textContent.toLowerCase();
        li.style.display = text.includes(term) ? "flex" : "none";
    });
});

// =========================================
// Theme Toggle
// =========================================
themeToggle.addEventListener("change", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem("theme",
        document.body.classList.contains("dark") ? "dark" : "light"
    );
});
