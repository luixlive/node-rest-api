const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((result) => {
//   console.log(result);
// });

// findOneAndRemove
// findByIdAndRemove

Todo.findByIdAndRemove('598a88186dbf330bb1668afb').then((result) => {
  console.log(result);
});
