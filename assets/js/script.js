//Assign the button element object repressentation to a variable in the file
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

//when the add a new task button is clicked, it will create a new task
var taskFormHandler = function(event) {

    event.preventDefault();
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    
    //package up data as an object
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };

    //send it as an argument to createTaskEl
    createTaskEl(taskDataObj);
   
    
};

var createTaskEl = function(taskDataObj) {
     //create list item
     var listItemEl = document.createElement("li"); //create a var for the list item
     listItemEl.className = "task-item"; //adding the style of the css .task-item class
     
     //create div to hold task info and add to list item
     var taskInfoEl = document.createElement("div");
     taskInfoEl.className = "task-info"; 
     //add HTML content to div
     taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "<h3><span class='task-type'>" + taskDataObj.type + "</span>";
 
     //Append/add to web page browser
     listItemEl.appendChild(taskInfoEl); //adds the taskInfoEl information to the list item
     //add entire list item to list
     tasksToDoEl.appendChild(listItemEl);
};


//On a button click, create a task using the createTaskHandler function

formEl.addEventListener("submit", taskFormHandler);


