const express = require('express');
const router = express.Router();

let todos = [];
let id = 1;

router.get('/', (req, res) => res.json(todos));

router.post('/', (req, res) => {
  const todo = { id: id++, text: req.body.text };
  todos.push(todo);
  res.status(201).json(todo);
});

router.put('/:id', (req, res) => {
  const todo = todos.find(t => t.id == req.params.id);
  if (!todo) return res.status(404).json({ error: 'Not found' });
  todo.text = req.body.text;
  res.json(todo);
});

router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex(todo => todo.id === id);
  if (index === -1) {
    return res.sendStatus(404); 
  }
  todos.splice(index, 1);
  res.sendStatus(204);
});


module.exports = router;
