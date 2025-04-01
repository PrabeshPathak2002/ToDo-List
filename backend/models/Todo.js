// models/Todo.js
const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema(
  {
    todo: { 
      type: String, 
      required: true 
    },
    status: { 
      type: String, 
      default: "pending" 
    },
    deadline: { 
      type: Date 
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Todo', todoSchema);