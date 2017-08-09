const { ObjectID } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');

const id = '598a693582ab6c085a8413dd';
const userId = '598a59d302c03205cb97088f';

if (!ObjectID.isValid(id)) {
  console.log('Id not valid');
}

Todo.find({
  _id: id
}).then((todos) => {
  console.log('todos: ', todos);
});

Todo.findOne({
  _id: id
}).then((todo) => {
  console.log('todo: ', todo);
});

Todo.findById(id).then((todo) => {
  if (!todo) {
    return console.log('Id not found');
  }
  console.log('todo: ', todo);
}).catch(e => console.log(e));

User.findById(userId).then((user) => {
  if (!user) {
    return console.log('User not found');
  }
  console.log('user: ', user);
}).catch(e => console.log(e));