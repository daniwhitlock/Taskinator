//GLOBAL VARIABLES
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var taskIdCounter = 0;
var pageContentEl = document.querySelector("#page-content");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");
var tasks = [];
    


//when the add a new task button is clicked, it will create a new task
var taskFormHandler = function(event) {

    event.preventDefault();
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    //check if input values are empty strings
    if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false;
    }

    formEl.reset(); //reset data on form to be empty
    
    var isEdit = formEl.hasAttribute("data-task-id"); //.hasAttribute allows us to know what attribute an element has
    
    // has data attribute, so get task id and call function to complete edit process
    if (isEdit) {
        var taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    }
    //no data attribute, so create object as normal and pass to createTaskEl function
    else {
        var taskDataObj = {
            name: taskNameInput,
            type: taskTypeInput,
            status: "to do"
        };
        createTaskEl(taskDataObj);
    }
};

var createTaskEl = function(taskDataObj) {
     console.log(taskDataObj);
     console.log(taskDataObj.status);
     //create list item
     var listItemEl = document.createElement("li"); //create var for li
     listItemEl.className = "task-item"; //adding the style of the css 
     
     //add task id as a custom attribute
     listItemEl.setAttribute("data-task-id", taskIdCounter);
     
     //add ability to drag and drop tasks
     listItemEl.setAttribute("draggable", "true");

     //create div to hold task info and add to list item
     var taskInfoEl = document.createElement("div");
     taskInfoEl.className = "task-info"; 
     //add HTML content to div
     taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "<h3><span class='task-type'>" + taskDataObj.type + "</span>";listItemEl.appendChild(taskInfoEl); //adds the taskInfoEl information to the list item
    
     taskDataObj.id = taskIdCounter;
     
     tasks.push(taskDataObj);
     console.log(tasks);
     console.log(taskDataObj);

     var taskActionsEl = createTaskActions(taskIdCounter);
     listItemEl.appendChild(taskActionsEl);
     console.log(taskDataObj.status);

     //add entire list item to list
    if (taskDataObj.status === "to do") {
        listItemEl.querySelector("select[name='status-change']").selectedIndex = 0;
        tasksToDoEl.appendChild(listItemEl);
    }
    else if (taskDataObj.status === "in progress") {
        listItemEl.querySelector("select[name='status-change']").selectedIndex = 1;
        tasksInProgressEl.appendChild(listItemEl);
    }
    else if (taskDataObj.status === "completed") {
        listItemEl.querySelector("select[name='status-change']").selectedIndex = 2;
        tasksCompletedEl.appendChild(listItemEl);
    }

     //increase task counter for next unique id
     taskIdCounter++;
     saveTasks();
};

var createTaskActions = function(taskId) {
    //Create new div element
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    //create edit button
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);
    actionContainerEl.appendChild(editButtonEl);
    

    //create delete button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className ="btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);
    actionContainerEl.appendChild(deleteButtonEl);

    //create Dropdown
    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);
    actionContainerEl.appendChild(statusSelectEl);

    //add options to Dropdown
    var statusChoices = ["To Do", "In Progress", "Completed"];
    for (var i=0; i < statusChoices.length; i++) {
        //create option element
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);

        //append to select
        statusSelectEl.appendChild(statusOptionEl);
    }

    return actionContainerEl;
};

var taskButtonHandler = function(event) {
    // get target element from event
    var targetEl = event.target;

    //if edit button was clicked
    if (event.target.matches(".edit-btn")) {
        var taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId);
    }

    //if delete button was clicked 
    else if (event.target.matches(".delete-btn")) {
        //get the elemen'ts task id
        var taskId=event.target.getAttribute("data-task-id");
        deleteTask(taskId);
    }
};

var deleteTask = function (taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();

    //create new array to hold updated list of tasks
    var updatedTaskArr = [];
    //loop through current tasks
    for (var i =0; i <tasks.length; i++) {
        //if tasks[i].id doesn't match the value of taskId, let's keep that task
        if (tasks[i].id !== parseInt(taskId)) {
            updatedTaskArr.push(tasks[i]);
        }
    }

    //reassign task array to be the same as updatedTaskArr
    tasks = updatedTaskArr;
    console.log(tasks);
    saveTasks();
};

var editTask = function (taskId) {
    console.log("editing task #: " + taskId);
    
    //get task list item element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    //get content from task name and type
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    var taskType = taskSelected.querySelector("span.task-type").textContent;
    
    //reuse selectors to update the form
    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;

    //update text of submit button to say SAVE TASK
    document.querySelector("#save-task").textContent = "Save Task";

    //include task-id when editing and keep number with edited version
    formEl.setAttribute("data-task-id", taskId);
};

var completeEditTask = function(taskName, taskType, taskId) {
    //find the matching task list item
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    //set new values
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;
   
    //loop through tasks array and task object with new content
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id ===parseInt(taskId)) {
            tasks[i].name = taskName;
            task[i].type = taskType;
        }
    };
    
    
    
    //reset the form by removing task id and changing the button text back to normal 
    formEl.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task"
    saveTasks();
    
    
};

var taskStatusChangeHandler = function(event) {
    //get the task item's id
    var taskId = event.target.getAttribute("data-task-id");

    //get the currently selected option's value and convert to lowercase
    var statusValue = event.target.value.toLowerCase();

    //find the parent task item element based on the id
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    if (statusValue === "to do") {
        tasksToDoEl.appendChild(taskSelected);
    }
    else if (statusValue === "in progress") {
        tasksInProgressEl.appendChild(taskSelected);
    }
    else if(statusValue === "completed") {
        tasksCompletedEl.appendChild(taskSelected);
    }

    //update task's in tasks array
    for (var i = 0; i < tasks.length; i++) {
        if (task[i].id === parseInt(taskId)) {
            tasks[i].status = statusValue;
        }
    }
    console.log(tasks);
    saveTasks();
    
};

var dragTaskHandler = function(event) {
    var taskId = event.target.getAttribute("data-task-id");
    event.dataTransfer.setData("text/plain", taskId);
    var getId = event.dataTransfer.getData("text/plain");
    console.log("getID: ", getId, typeof getId);
    // loop through tasks array to find and update the updated task's status
   
};

var dropZoneDragHandler = function(event) {
    var taskListEl = event.target.closest(".task-list");
    if (taskListEl) {
        event.preventDefault();
        taskListEl.setAttribute("style", "background: rgba(68, 233, 255, 0.7); border-style: dashed;"); 
    }
    
};

var dropTaskHandler = function (event) {
    var id = event.dataTransfer.getData("text/plain");
    var draggableElement = document.querySelector("[data-task-id='" + id + "']");
    var dropZoneEl = event.target.closest(".task-list");
    var statusType = dropZoneEl.id;
    
    //Set status of task based on dropZone id
    var statusSelectEl = draggableElement.querySelector("select[name='status-change']");
    if (statusType === "tasks-to-do") {
        statusSelectEl.selectedIndex = 0;
    }
    else if (statusType === "tasks-in-progress") {
        statusSelectEl.selectedIndex = 1;
    }
    else if (statusType === "tasks-completed") {
        statusSelectEl.selectedIndex = 2;
    }
    dropZoneEl.removeAttribute("style");
    dropZoneEl.appendChild(draggableElement);
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(id)) {
        tasks[i].status = statusSelectEl.value.toLowerCase();
        }
    }
    saveTasks();
    
    console.log(tasks);
};

var dragLeaveHandler = function(event) {
    var taskListEl = event.target.closest(".task-list");
    if (taskListEl) {
        taskListEl.removeAttribute("style");
    }
};

var saveTasks = function () {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

var loadTasks = function () {
    //Reassign the tasks variable to whatever localStorage returns.
    
    var savedTasks = localStorage.getItem("tasks"); 
   
    if (!savedTasks) { //same as saying savedTask === null
        
        return false; 
    }
    savedTasks = JSON.parse(savedTasks);
    //print items to page by going through createTaskEl function
    for (var i = 0; i < savedTasks.length; i++) {
        //pass each task object into the 'createTaskEl()' function
        createTaskEl(savedTasks[i]);
        

    }
    
    
};



formEl.addEventListener("submit", taskFormHandler);
pageContentEl.addEventListener("click", taskButtonHandler);
pageContentEl.addEventListener("change", taskStatusChangeHandler);
pageContentEl.addEventListener("dragstart", dragTaskHandler);
pageContentEl.addEventListener("dragover", dropZoneDragHandler);
pageContentEl.addEventListener("drop", dropTaskHandler);
pageContentEl.addEventListener("dragleave", dragLeaveHandler);
loadTasks();
