var mongoose = require('mongoose');

var Skill = mongoose.model('Skill', {
  level: {
    type: Number,
    required: true
  },
  currentExp: {
    type: Number,
    required: true
  },
  _creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});


module.exports = {Skill};
