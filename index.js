// const express = require("express");
// const cors = require("cors");
// require("dotenv").config();

// const app = express();
// const connectDB = require("./config/db");
// connectDB();

// app.use(cors());
// app.use(express.json());

// app.get("/", (req, res) => {
//   res.json({ message: "Todo Server is running" });
// });

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });




const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const todoRoutes = require("./routes/todoRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Todo Server is running" });
});

app.use("/api/todos", todoRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


