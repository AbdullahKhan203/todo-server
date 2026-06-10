// const express = require("express");
// const router = express.Router();
// const Todo = require("../models/Todo");
// const todoRoutes = require("./routes/todoRoutes");


// app.use("/api/todos", todoRoutes);

// // GET all todos
// router.get("/", async (req, res) => {
//   const todos = await Todo.find().sort({ createdAt: -1 });
//   res.json(todos);
// });

// // CREATE todo
// router.post("/", async (req, res) => {
//   const todo = new Todo({
//     text: req.body.text,
//   });

//   await todo.save();
//   res.json(todo);
// });

// // DELETE todo
// router.delete("/:id", async (req, res) => {
//   await Todo.findByIdAndDelete(req.params.id);
//   res.json({ message: "Todo deleted" });
// });

// // UPDATE todo (toggle complete)
// router.put("/:id", async (req, res) => {
//   const todo = await Todo.findById(req.params.id);
//   todo.completed = !todo.completed;
//   await todo.save();
//   res.json(todo);
// });







// module.exports = router;










const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");

// GET all todos
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find().sort({
      createdAt: -1,
    });

    res.json(todos);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});



// CREATE todo
router.post("/", async (req, res) => {
  try {
    const { text, completed } = req.body;

    const todo = await Todo.create({
      text,
      completed,
    });

    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


// DELETE todo
router.delete("/:id", async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(
      req.params.id
    );

    if (!todo) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }

    res.json({
      message: "Todo deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


// TOGGLE todo
router.put("/:id", async (req, res) => {
  try {
    const { text, completed } = req.body;

    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      {
        text,
        completed,
      },
      { returnDocument: "after" }
    );

    if (!todo) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }

    res.json(todo);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});




router.patch("/:id/status", async (req, res) => {
  try {
    const { completed } = req.body;

    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      {
        completed,
      },
      { returnDocument: "after" }
    );

    res.json(todo);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});






module.exports = router;


