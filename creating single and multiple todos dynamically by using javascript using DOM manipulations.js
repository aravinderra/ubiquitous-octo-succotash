let todoitemsContainer = document.getElementById("todoitemsContainer");
let saveButtonElement = document.getElementById("saveButton");



function getTodosListFromLocalStorage() {
    let stringifiedTodosList = localStorage.getItem("todosList");
    let parsedTodosList = JSON.parse(stringifiedTodosList);
    if (parsedTodosList === null) {
        return [];
    } else {
        return parsedTodosList;
    }

}
let todosList = getTodosListFromLocalStorage();
let todoCount = todosList.length;

saveButtonElement.onclick = function() {
    localStorage.setItem("todosList", JSON.stringify(todosList));
};

function onTodoStatusChanged(checkboxId, labelId, todoId) {
    let checkboxElement = document.getElementById(checkboxId);
    let labelElement = document.getElementById(labelId);
    if (checkboxElement.checked === true) {

        labelElement.classList.add("checked");
    } else {
        labelElement.classList.remove("checked");

    }
    let todoItemIndex = todosList.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueNo;
        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }
    });
    let todoObject = todosList[todoItemIndex];
    if (todoObject.isChecked === true) {
        todoObject.isChecked = false;
    } else {
        todoObject.isChecked = true;

    }

}

function onDeleteTodo(todoId) {
    let todoElement = document.getElementById(todoId);
    todoitemsContainer.removeChild(todoElement);
    let deletedTodoItemIndex = todosList.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueNo;
        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }

    });

    todosList.splice(deletedTodoItemIndex, 1);
}



function createtodoAndAppendTodo(eachTodo) {
    let checkboxId = "checkbox" + eachTodo.uniqueNo;
    let labelId = "label" + eachTodo.uniqueNo;
    let todoId = "todo" + eachTodo.uniqueNo;

    let todoElement = document.createElement("li");
    todoElement.classList.add("list-item-container", "d-flex", "flex-row");
    todoElement.id = todoId;
    todoitemsContainer.appendChild(todoElement);

    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkboxId;
    inputElement.checked = eachTodo.isChecked;

    inputElement.classList.add("checkbox-input");
    inputElement.onclick = function() {
        onTodoStatusChanged(checkboxId, labelId, todoId);
    };
    todoElement.appendChild(inputElement);

    let labelcontainerElement = document.createElement("div");
    labelcontainerElement.classList.add("label-container", "d-flex", "flex-row");
    todoElement.appendChild(labelcontainerElement);

    let labelElement = document.createElement("label");
    labelElement.id = labelId;
    labelElement.setAttribute("For", checkboxId);
    labelElement.classList.add("label-head");
    labelElement.textContent = eachTodo.text;
    if (eachTodo.isChecked === true) {
        labelElement.classList.add("checked");
    }
    labelcontainerElement.appendChild(labelElement);

    let deletecontainerElement = document.createElement("div");
    deletecontainerElement.classList.add("delete-icon-container");
    labelcontainerElement.appendChild(deletecontainerElement);

    let deleteiconElement = document.createElement("i");
    deleteiconElement.classList.add("delete-icon", "far", "fa-trash-alt");
    deleteiconElement.onclick = function() {
        onDeleteTodo(todoId);
    };
    deletecontainerElement.appendChild(deleteiconElement);

}
for (let eachTodo of todosList) {
    createtodoAndAppendTodo(eachTodo);
}


function addTodo() {
    let inputElement = document.getElementById("todoUserInput");
    let inputElementValue = inputElement.value;
    if (inputElementValue === "") {
        alert("Enter valid Text");
        return;
    }
    todoCount = todoCount + 1;

    let newTodo = {
        text: inputElement.value,
        uniqueNo: todoCount,
        isChecked: false
    };
    todosList.push(newTodo);
    createtodoAndAppendTodo(newTodo);
    inputElement.value = "";
}

let addTodoButtonElement = document.getElementById("addTodoButton");
addTodoButtonElement.onclick = function() {
    addTodo();
};