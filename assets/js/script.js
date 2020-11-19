//Assign the button element object repressentation to a variable in the file
var buttonEl = document.querySelector("#save-task");
var tasksToDoEl = document.querySelector("#tasks-to-do");

//when the add a new task button is clicked, it will create a new task
var createTasksHandler = function () {
    var listItemEl = document.createElement("li"); //create a var for the list item
    listItemEl.className = "task-item"; //adding the style of the css .task-item class
    listItemEl.textContent = "This is a new task."; //what to type in
    tasksToDoEl.appendChild(listItemEl); //Append/add to the actual browser page
};


//On a button click, create a task using the createTaskHandler function
buttonEl.addEventListener("click", createTasksHandler); 


