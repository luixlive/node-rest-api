require('./config/config');

const _ = require('lodash');
const bodyParser = require('body-parser');
const express = require('express');
const {ObjectID} = require('mongodb');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');
const {authenticate} = require('./middleware/authenticate');

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.post('/todos', authenticate, (req, res) => {
  const todo = new Todo({
    text: req.body.text,
    _creator: req.user.id,
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos', authenticate, (req, res) => {
  Todo.find({
    _creator: req.user._id,
  }).then((todos) => {
    res.send({todos});
  }, (err) => {
    res.status(400).send(e);
  });
});

app.get('/todos/:id', authenticate, (req, res) => {
  const id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.sendStatus(404);
  }
  Todo.findOne({
    _id: id,
    _creator: req.user._id,
  }).then((todo) => {
    if (!todo) return res.sendStatus(404);

    res.send({todo});
  }).catch((e) => res.sendStatus(400));
});

app.delete('/todos/:id', authenticate, async (req, res) => {
  const id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.sendStatus(404);
  }
  try {
    const todo = await Todo.findOneAndRemove({
      _id: id,
      _creator: req.user._id,
    });
    if (!todo) {
      res.sendStatus(404);
    } else {
      res.send({todo});
    }
  } catch(e) {
    res.sendStatus(400)
  }

  Todo.findOneAndRemove({
    _id: id,
    _creator: req.user._id,
  }).then((todo) => {
    if (!todo) return res.sendStatus(404);

    res.send({todo});
  }).catch((e) => res.sendStatus(400));
});

app.patch('/todos/:id', authenticate, (req, res) => {
  const id = req.params.id;
  const body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)) {
    return res.sendStatus(404);
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findOneAndUpdate({
    _id: id,
    _creator: req.user._id,
  }, {$set: body}, {new: true}).then((todo) => {
    if (!todo) {
      return res.sendStatus(404);
    }

    res.send({todo});
  }).catch((e) => {
    res.sendStatus(404);
  });
});

app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

app.post('/users', async (req, res) => {
  try {
    const body = _.pick(req.body, ['email', 'password']);
    const user = new User(body);
    await user.save();
    const token = await user.generateAuthToken();
    res.header('x-auth', token).send(user);
  } catch(e) {
    res.status(400).send(e);
  }
});

app.post('/users/login', async (req, res) => {
  try {
    const body = _.pick(req.body, ['email', 'password']);
    const user = await User.findByCredentials(body.email, body.password);
    const token = await user.generateAuthToken();
    res.header('x-auth', token).send(user);
  } catch(e) {
    res.sendStatus(400);
  }
});

app.delete('/users/me/token', authenticate, async (req, res) => {
  try {
    await req.user.removeToken(req.token);
    res.sendStatus(200);
  } catch(e) {
    res.sendStatus(400);
  }
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

module.exports = {app};
