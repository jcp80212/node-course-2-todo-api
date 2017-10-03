const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((result) => {
//   console.log(result);
// });

Todo.findOneAndRemove({_id: '59cc4601c69e569a24eba95c' }).then((todo) => {
  console.log(todo);
});

Todo.findByIdAndRemove('59cc4601c69e569a24eba95c').then((todo) => {
  console.log(todo);
});
