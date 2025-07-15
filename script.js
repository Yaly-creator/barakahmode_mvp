// Récupération des éléments
const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task");
const taskList = document.getElementById("task-list");

// Charger les tâches depuis le localStorage (s'il y en a)
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
renderTasks();

// Ajouter une tâche
addTaskBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    tasks.push(taskText);
    taskInput.value = "";
    saveTasks();
    renderTasks();
  }
});

// Afficher les tâches
function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${task}</span>
      <button onclick="deleteTask(${index})">✖</button>
    `;
    taskList.appendChild(li);
  });
}

// Supprimer une tâche
function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

// Sauvegarder dans le stockage local
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
// Liste des IDs de suivi spirituel
const trackerIds = [
  "fajr", "dhuhr", "asr", "maghrib", "isha",
  "quran", "fast"
];

// Charger les états depuis localStorage
trackerIds.forEach(id => {
  const checkbox = document.getElementById(id);
  const savedValue = localStorage.getItem(id);
  if (savedValue === "true") {
    checkbox.checked = true;
  }

  // Écouteur de changement pour sauvegarder
  checkbox.addEventListener("change", () => {
    localStorage.setItem(id, checkbox.checked);
  });
});
// Réinitialiser le tracker
const resetBtn = document.getElementById("reset-tracker");

resetBtn.addEventListener("click", () => {
  trackerIds.forEach(id => {
    document.getElementById(id).checked = false;
    localStorage.setItem(id, false);
  });
});
