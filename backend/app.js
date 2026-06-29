const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");

dotenv.config();

const userRouter = require("./routes/user.routes");
const notesRouter = require("./routes/notes.routes");

const app = express();

// MIDDLEWARES
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// ROUTES
app.use("/user", userRouter);
app.use("/notes", notesRouter);
app.get("/api", (req, res) => {
  res.json({ message: "200" });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("Server Running at 3001");
});
