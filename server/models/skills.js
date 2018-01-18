var mongoose = require('mongoose');

var Skills = mongoose.model('Skills', {
  title: {
    type: String,
    required: true
  },
  level: {
    type: Number,
    required: true
  },
  currentExp: {
    type: Number,
    required: true
  },
  needForNextLevel: {
    type: Number,
    required: true
  },
  difficultyMod: {
    type: Number,
    required: true
  },
  _creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});


module.exports = {Skills};
