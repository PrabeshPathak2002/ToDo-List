const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const Todo = require('../models/Todo');

// GET all todos with filtering/sorting
router.get('/', auth, async (req, res) => {
  try {
    const filter = {};
    const sort = {};

    // Filter by status (e.g., ?status=completed)
    if (req.query.status) {
      filter.status = req.query.status;
    }

    // Sort by field (e.g., ?sortBy=deadline&order=asc)
    if (req.query.sortBy) {
      const order = req.query.order === "desc" ? -1 : 1;
      sort[req.query.sortBy] = order;
    }

    const todos = await Todo.find(filter).sort(sort);
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a new todo (with user association)
router.post('/', auth, async (req, res) => {
  try {
    const newTodo = await Todo.create({
      task: req.body.task,
      status: req.body.status,
      deadline: req.body.deadline,
      user: req.user.id, // Add user ID from auth middleware
    });
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE a todo
router.put('/:id', auth, async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedTodo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE a todo
router.delete('/:id', auth, async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
    res.json(deletedTodo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;