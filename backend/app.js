const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const todoRoutes = require('./routes/todos');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/login', authRoutes);
app.use('/todos', todoRoutes);

module.exports = app;
