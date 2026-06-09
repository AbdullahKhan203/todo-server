const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");
const todoRoutes = require("./routes/todoRoutes");


app.use("/api/todos", todoRoutes);

// GET all todos
router.get("/", async (req, res) => {
  const todos = await Todo.find().sort({ createdAt: -1 });
  res.json(todos);
});

// CREATE todo
router.post("/", async (req, res) => {
  const todo = new Todo({
    text: req.body.text,
  });

  await todo.save();
  res.json(todo);
});

// DELETE todo
router.delete("/:id", async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: "Todo deleted" });
});

// UPDATE todo (toggle complete)
router.put("/:id", async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  todo.completed = !todo.completed;
  await todo.save();
  res.json(todo);
});







module.exports = router;