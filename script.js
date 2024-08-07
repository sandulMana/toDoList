const apiUrl = 'http://localhost:3000/todos';

async function fetchTodos() {
    const response = await fetch(apiUrl);
    const todos = await response.json();
    const todoList = []
    todoList.innerHTML ='';

    todos.forEach(todo => {
        const todoItem = document.createElement('div');//TASK creates a new div elememt
        todoItem.className = 'todo-item';
        todoItem.innerHTML =` 
        <span>${todo.item}</span>
        <div>
            <button onclick="editTodo(${todo.id})">Edit</button>
            <button onclick="deleteTodo(${todo.id})">Delete</button>
        </div>
        `

        //TASK: Append the new todo item to the list
        todoList.appendChild(todoItem); 
    });
}

document.addEventListener('DOMContentLoaded', fetchTodos); 

async function createTodo() {
    const newTodoInput = document.getElementById('new-todo'); 
    const newTodo = newTodoInput.value; 
    if (newTodo) {
    await fetch(apiUrl, {
    method: 'POST', 
    headers: {
    'Content-Type': 'application/json' 
    },
    body: JSON.stringify({ item: newTodo }) 
    });
    newTodoInput.value = ''; 
    // TASK: Refreshes the todo list
    fetchTodos();
    }
    }

    async function editTodo(id) {
        const newTodo = prompt("New Todo Task: ");// TASK: Prompts the user for the new todo text
        if (newTodo) {
         // TASK: Makes a PUT request to the API
         // TASK: Sets the content type to JSON
         // TASK: Sends the updated todo as a JSON string
         // TASK: Refreshes the todo list
         const req = await fetch(apiUrl, {
            method:'PUT',
            headers: {
                'Content-type':'applicaton/json'
            },
            body: JSON.stringify({item:newTodo})
         });
         todoList[id] = JSON.stringify({item:newTodo})
         todoList.innerHTML = todoList;
         fetchTodos();
        }
    }
