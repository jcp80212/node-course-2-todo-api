var mongoose = require('mongoose');

var Characters = mongoose.model('Characters', {
  name: {
    type: String,
     required: true,
     minlength: 1,
     trim: true
  },
  level: {
    type: Number,
     required: true,
     minlength: 1
  },
  exp: {
    type: Number,
     required: true,
     minlength: 1
  },
  endurance: {
    type: Number,
     required: true,
     minlength: 1
  },
  willpower: {
    type: Number,
     required: true,
     minlength: 1
  },
  strength: {
    type: Number,
     required: true,
     minlength: 1
  },
  dexterity: {
    type: Number,
     required: true,
     minlength: 1
  },
  wisdom: {
    type: Number,
     required: true,
     minlength: 1
  },
  intelligence: {
    type: Number,
     required: true,
     minlength: 1
  },
  speed: {
    type: Number,
     required: true,
     minlength: 1
  },
  agility: {
    type: Number,
     required: true,
     minlength: 1
  },
  constitution: {
    type: Number,
     required: true,
     minlength: 1
  },
  statPoints: {
    type: Number,
     required: true,
     minlength: 1
  },
  needForNextLevel: {
    type: Number,
     required: true,
     minlength: 1
  },
  skillPoints: {
    type: Number,
     required: true,
     minlength: 1
  },
  maxHealthPoints: {
    type: Number,
     required: true,
     minlength: 1
  },
  currentHealthPoints: {
    type: Number,
     required: true,
     minlength: 1
  },
  maxFatiguePoints: {
    type: Number,
     required: true,
     minlength: 1
  },
  currentFatiguePoints: {
    type: Number,
     required: true,
     minlength: 1
  },
  characterMadeAt: {
    type: Number,
    default: null
  },
  _creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});


module.exports = {Characters};
