//Assign the button element object repressentation to a variable in the file
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

//when the add a new task button is clicked, it will create a new task
var createTaskHandler = function(event) {

    event.preventDefault();
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    
    //create list item
    var listItemEl = document.createElement("li"); //create a var for the list item
    listItemEl.className = "task-item"; //adding the style of the css .task-item class
    
    //create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info"; //give it a class name to add styling
    //add HTML content to div, adding taskNameInput and taskTypeInput to the taskInfo variable
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskNameInput + "<h3><span class='task-type'>" + taskTypeInput + "</span>";

    //Append/add to web page browser
    listItemEl.appendChild(taskInfoEl); //adds the taskInfoEl information to the list item
    //add entire list item to list
    tasksToDoEl.appendChild(listItemEl);
    
};


//On a button click, create a task using the createTaskHandler function

formEl.addEventListener("submit", createTaskHandler);


