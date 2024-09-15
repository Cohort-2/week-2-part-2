const express = require("express");

const app = express();

app.use(express.json());

let todos = [
  {
    id: 1,
    title: "Buy groceries",
    completed: false,
    description: "I should buy groceries",
  },
  {
    id: 2,
    title: "Learn JavaScript",
    completed: false,
    description: "I should learn JavaScript",
  },
];

// Retrieve all todo items
app.get("/todos", function (req, res) {
  res.status(200).json(todos);
});

// Retrieve a specific todo item by ID
app.get("/todos/:id", function (req, res) {
  const id = parseInt(req.params.id);
  const todo = todos.find((todo) => todo.id === id);
  if (todo) {
    res.status(200).send(todo);
  } else {
    res.status(404).json({
      message: "Todo not found",
    });
  }
});

// Create a new todo item
app.post("/todos", function (req, res) {
  const { title, completed, description } = req.body;
  const todo = {
    id: todos.length + 1,
    title,
    completed,
    description,
  };
  todos.push(todo);
  res.status(201).json({
    success: true,
    message: "Todo created successfully",
    todo,
  });
});

// Update an existing todo item by ID
app.put("/todos/:id", function (req, res) {
  const id = parseInt(req.params.id);
  const todo = todos.find((todo) => todo.id === id);
  if (todo) {
    const { title, completed, description } = req.body;
    todo.title = title;
    todo.completed = completed;
    todo.description = description;
    res.status(200).json({
      success: true,
      message: "Todo updated successfully",
      todo,
    });
  } else {
    res.status(400).json({
      success: false,
      message: "Todo not found",
    });
  }
});

// Delete a todo item by ID
app.delete("/todos/:id", function (req, res) {
  const id = parseInt(req.params.id);
  const todo = todos.find((todo) => todo.id === id);
  if (todo) {
    todos = todos.filter((todo) => todo.id !== id);
    res.status(200).json({
      success: true,
      message: "Todo deleted successfully",
      todo,
    });
  } else {
    res.status(404).json({
      success: false,
      message: "Todo not found",
    });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
