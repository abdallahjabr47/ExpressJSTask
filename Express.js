const express = require('express');
//const app = express();
const router = express.Router();

// array of tasks
let todos = [
  {
    id: 1,
    title: '(Todo1: Go to the GYM)',
    description: '(Do some exercises in 1 hour)',
    completionStatus: false
  },
  {
    id: 2,
    title: '(Todo2: Go for shopping',
    description: '(Buy tuna, milk, egges, and some type of vegetables)',
    completionStatus: false
  },
  {
    id: 3,
    title: '(Todo3: Finish tasks)',
    description: '(Finish OOP tasks)',
    completionStatus: true
  },
  {
    id: 4,
    title: '(Todo4: Watch a match)',
    description: '(Watch a Barcelona match vs Madrid)',
    completionStatus: false
  }
];

// The Middleware function is used to check if ID exists or not!
function checkTodoId(req, res, next) {
  const id = parseInt(req.params.id);
  const todo = todos.find(todo => todo.id === id);
  if (!todo) {
    return res.status(404).json({ error: 'Todo not found.' });
  }
  next();
}

// The Middleware function is used to check if title and description are not empty or not!
function checkTodoData(req, res, next) {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).json({ error: 'Title and description are required fields.' });
  }
  next();
}

// (The GET endpoint) is used to list all todos above
router.get('/todos', (req, res) => {
  res.status(200).json(todos);
});

// (The GET endpoint) is used to show just one todo based on ID
router.get('/todos/:id', checkTodoId, (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find(todo => todo.id === id);
  res.status(200).json(todo);
});

// (The DELETE endpoint) is used to delete a todo
router.delete('/todos/:id', checkTodoId, (req, res) => {
  const id = parseInt(req.params.id);
  todos = todos.filter(todo => todo.id !== id);
  res.status(204).send();
});

// (The POST endpoint) is used to create a todo
router.post('/todos', checkTodoData, (req, res) => {
  const { title, description } = req.body;
  const newTask = {
    id: todos.length + 1,
    title,
    description,
    completionStatus: false
  };
  todos.push(newTask);
  res.status(201).json(newTask);
});

// (The PUT endpoint) is used to update a todo
router.put('/todos/:id', checkTodoId, checkTodoData, (req, res) => {
  const todoId = parseInt(req.params.id);
  const { title, description } = req.body;
  const updatedTodo = {
    id: todoId,
    title,
    description,
    completionStatus: false
  };
  todos = todos.map(todo => (todo.id === todoId ? updatedTodo : todo));
  res.status(200).json(updatedTodo);
});

module.exports = router;