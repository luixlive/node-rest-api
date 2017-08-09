const bodyParser = require('body-parser');
const express = require('express');

const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');

const app = express();

app.use(bodyParser.json());

app.post('/todos', ({ body: { text }}, res) => {
  const todo = new Todo({ text });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({ todos });
  }, (err) => {
    res.status(400).send(e);
  });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});

module.exports = { app };