const express = require('express')
const app = express()

app.use(express.json())

//Store Todo items
let todos = [];

//Initial Todo ID
let nextID = 0;

// GET /todos - Retrieve all todo items 
app.get('/todos', (req,res) =>  {
    res.json(todos);
});

//GET /todos/:id - Retrieve by ID
app.get('todos/:id', (req,res) =>  {
    const id = parseInt(req.params.id);
    const todo = todo.find(t=>t.id === id);
    if(todo) {
        res.json(todo);
    } else {
        res.status(404).send('Item not found');
    }
});

//POST /'todos' New Todo
app.post('/todos', (req,res) => {
    const newItem = {id: nextID++, item: req.body.item };
    todos.push(newItem);
    res.status(201).json(newItem);
});

//PUT /'todos/:id'- Todo with ID
app.put('todos/:id', (req,res) => {
    const id = parseInt(req.params.id);
    const todoIndex = todos.findIndex(t=>t.id===id);
    if(todoIndex !== -1) {
        todos[todoIndex].item = req.body.item;
        res.json(todos[todoIndex]);
    }
    else {
        res.status(404).send('Item not found');
    };
});

//DELETE /'todos/:id' - Delete Specified Todo
app.delete('/todos/:id', (req,res) => {
    const id = parseInt(req.params.id);
    const todoIndex = todos.findIndex(t=>t.id=== id);
    if(todoIndex !== -1) {
        todos.splice(todoIndex,1);
        res.status(204).send();
    }
    else {
        res.status(404).send('Item not found');
    }
});

//Listen for server start on Port 3000
app.listen(3000, () =>  {
    console.log('Server started on port 3000')

})