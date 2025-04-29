let todoInput = document.querySelector(".input");
let addToDoButton = document.querySelector(".button");
let showTodos = document.querySelector(".todos-container");
let todo;
let localData = JSON.parse(localStorage.getItem("todo"));
let todolist = localData || [];

/** Creating function to get unique id */
function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (param) {
        let number = Math.random() * 16 | 0;
        let randomNumber = param == 'x' ? number : (number & 0x3 | 0x8);
        return randomNumber.toString(16);
    });
}

addToDoButton.addEventListener("click", (e) =>{
    e.preventDefault();
    todo = todoInput.value;
    console.log(todo);
    if(todo.length > 0){
        todolist.push({id: uuid(), todo, isCompleted: false});
    }
    renderToDoList(todolist);
    localStorage.setItem("todo", JSON.stringify(todolist));
    todoInput.value = "";
})

showTodos.addEventListener("click", (e) => {
    let key = e.target.dataset.key;
    let delTodokey = e.target.dataset.todokey
    todolist = todolist.map(todo => todo.id === key ? {...todo, isCompleted: !todo.isCompleted} : todo);
    todolist = todolist.filter(todo => todo.id !== delTodokey);
    localStorage.setItem("todo", JSON.stringify(todolist));
    renderToDoList(todolist);
})

function renderToDoList(todolist){
    showTodos.innerHTML = todolist.map(({id, todo, isCompleted}) => `
    <div class="todo relative">
        <input class="t-checkbox t-pointer" id="item-${id}" type="checkbox" data-key=${id} ${isCompleted ? "checked" : ""}>
        <label for="item-${id}"class="todo todo-text t-pointer ${isCompleted ? "checked-todo" : ""}" data-key=${id}>${todo}</label>
        <button class="absolute right-0 button cursor" >
            <span data-todokey=${id} class=" del-btn material-symbols-outlined"> delete </span>
        </button>
    </div>`)
}
renderToDoList(todolist);