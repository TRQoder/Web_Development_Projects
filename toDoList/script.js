const addBtn = document.querySelector("#add");
const lists = document.querySelector(".listContainer");
const inputText = document.querySelector("#inputText");
const modeSwitch = document.querySelector("#modeSwitch");

let savedTasks = JSON.parse(localStorage.getItem("data")) || [];


const displayTask = () => {
    lists.innerHTML = savedTasks.map((task, index) => `
    <li data-index="${index}" class="${task.checked ? 'checked' : ''}">
        <div class="text">
            <!-- Conditionally render the checkbox icon based on the task's checked status -->
            <i class="${task.checked ? 'ri-checkbox-circle-line' : 'ri-checkbox-blank-circle-line'}"></i>
            <span>${task.text}</span>
        </div>
        <div class="icons">
            <i class="ri-pencil-line edit"></i>
            <i class="ri-delete-bin-5-line delete"></i>
        </div>
    </li>
`).join('');
};

const addTask = () => {
    const task = inputText.value.trim();
    if (task) {
        savedTasks.push({ text: task, checked: false });
        updateLocalStorage();
        inputText.value = "";
    }
};

const deleteTask = (index) => {
    savedTasks.splice(index, 1);
    updateLocalStorage();
};

const toggleTaskCompletion = (index) => {
    savedTasks[index].checked = !savedTasks[index].checked;
    updateLocalStorage();
};

const editTask = (index) => {
    const newText = prompt("Edit your task:", savedTasks[index].text);
    if (newText !== null) {
        savedTasks[index].text = newText.trim() || savedTasks[index].text;
        updateLocalStorage();
    }
};

const updateLocalStorage = () => {
    localStorage.setItem("data", JSON.stringify(savedTasks));
    displayTask();
};



const modeSwitchFunc = () => {
    const isDarkMode = document.body.classList.toggle("dark-mode");
    modeSwitch.classList.toggle("ri-sun-line", isDarkMode);
    modeSwitch.classList.toggle("ri-moon-line", !isDarkMode);
    localStorage.setItem("mode", isDarkMode ? "dark" : "light");
};

const checkMode = () => {
    const savedMode = localStorage.getItem("mode");
    if (savedMode === "dark") {
        document.body.classList.add("dark-mode");
        modeSwitch.classList.add("ri-sun-line");
        modeSwitch.classList.remove("ri-moon-line");
    }
};

const eventListeners = () => {
    lists.addEventListener("click", (e) => {
        const li = e.target.closest("li");
        if (!li) return;
        const index = li.dataset.index;

        if (e.target.classList.contains("delete")) {
            deleteTask(index);
        } else if (e.target.classList.contains("edit")) {
            editTask(index);
        } else if (e.target.tagName === "LI" || e.target.closest(".text")) {
            toggleTaskCompletion(index);
        }
    });

    inputText.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            addTask();
        }
    });

    addBtn.addEventListener("click", addTask);
    modeSwitch.addEventListener("click", modeSwitchFunc);
}

const main = () => {
    checkMode();
    displayTask();
    eventListeners();
};

main();