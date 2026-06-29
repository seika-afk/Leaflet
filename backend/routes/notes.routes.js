const express = require("express");

const router = express.Router();
const notesModel = require("../models/notes.model");

// Create a blog
router.post("/blogs", async (req, res) => {
  try {
    const { title, content, userId } = req.body;

    const blog = await notesModel.createNote(title, content, userId);

    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all blogs
router.get("/blogs", async (req, res) => {
  try {
    const blogs = await notesModel.getAllNotes();

    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one blog
router.get("/blogs/:id", async (req, res) => {
  try {
    const blog = await notesModel.getNoteById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
