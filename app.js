const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");
const completedButton = document.querySelector(".complete-btn")


document.addEventListener("DOMContentLoaded",getLocalTodos);
todoButton.addEventListener("click",addTodo);
todoList.addEventListener("click",deleteCheck);
todoList.addEventListener("click",markCompleted);
filterOption.addEventListener("click",filterTodo);
// function to add todo


function addTodo(event) {
    // prevent form from submitting
    event.preventDefault();

    if(todoInput.value != ""){
       
        
        // todo div
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        const newTodo = document.createElement("li");
        newTodo.innerText = todoInput.value;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);
        saveLocalTodos(todoInput.value);

        const completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);

        const trashButton = document.createElement("button");
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);

        // append to list
        document.querySelector(".todo-list").appendChild(todoDiv);
        todoInput.value = "";

    }
    else{
        alert("Please enter a todo item");

    }
   
    
    
}

function deleteCheck(event){
    const item = event.target;
    console.log(event);

    if(item.classList[0]==="trash-btn"){
        const todo = item.parentElement;
        todo.classList.add("slide");
        
        todo.addEventListener("transitionend",function(){
            todo.remove();
        });
    }
}

function markCompleted(event){
    const item = event.target.parentElement;
    if(item.classList[0]==="complete-btn"){
        const todo = item.parentElement;
        todo.classList.add("completed");
        
    }

}


function filterTodo(event){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(event.target.value){
            case "all":
                todo.style.display = "flex";
                break;
            case "completed" :
                if(todo.classList.contains("completed")){
                    todo.style.display = "flex";
                }else{
                    todo.style.display = "none";
                }
                break;
            case "incomplete" :
                if(!todo.classList.contains("completed")){
                    todo.style.display = "flex";
                }else{
                    todo.style.display = "none";
                }
                break;
        }
    })
}




function saveLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}



function getLocalTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}
