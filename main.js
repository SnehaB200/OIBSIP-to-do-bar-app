

let tasks = [];

const saveTasks =() =>{
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

const addTask = ()=> {
    const taskInput = document.getElementById("taskInput");
    const text = taskInput.value.trim();

    if(text){
        tasks.push({ text: text, completed: false});
        taskInput.value = "";
        updateTaskList();
        updateStatus();
        saveTasks();
    }
};

const editTask = (index) =>{
    const taskInput = document.getElementById("taskInput");
    taskInput.value = tasks[index].text;
    tasks.splice(index, 1);
    updateTaskList();
    updateStatus();
    saveTasks();
}

const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTaskList();
    updateStatus();
    saveTasks();
};

const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTaskList();
    updateStatus();
    saveTasks();
};

const updateStatus = () =>{
    const completeTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;
    const progress = (completeTasks/totalTasks )* 100;
    const progressBar = document.getElementById("progress");
    progressBar.style.width = `${progress}%`;

    document.getElementById("numbers").innerText = `${completeTasks}/${totalTasks}`;
}

const updateTaskList = ()=>{
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = "";

    tasks.forEach((task,index) => {
        const listItem = document.createElement("li");

        listItem.innerHTML = `
            <div class="taskItem">
                <div class="task ${task.completed ? "completed" : ""}">
                    <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""} />
                    <p>${task.text}</p>
                </div>
                <div class="icon">
                    <img src="edit.png" onClick="editTask(${index})" />
                    <img src="del.png" onClick="deleteTask(${index})" />
                </div>
            </div>
        `;
        const checkbox = listItem.querySelector(".checkbox");
        checkbox.addEventListener("change", () => toggleTaskComplete(index));
        taskList.append(listItem);
    });
};

document.getElementById("newTask").addEventListener("click", function(e){
    e.preventDefault();
    addTask();
});