require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {Characters} = require('./models/characters');
var {User} = require('./models/user');
var {Skills} = require('./models/skills');
var {authenticate} = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.put('/CreateCharacter', authenticate, (req, res) => {
  var characters = new Characters( {
    name: req.body.name,
    level: req.body.level,
    exp: req.body.exp,
    endurance: req.body.endurance,
    willpower: req.body.willpower,
    strength: req.body.strength,
    dexterity: req.body.dexterity,
    wisdom: req.body.wisdom,
    intelligence: req.body.intelligence,
    speed: req.body.speed,
    agility: req.body.agility,
    constitution: req.body.constitution,
    statPoints: req.body.statPoints,
    needForNextLevel: req.body.needForNextLevel,
    skillPoints: req.body.skillPoints,
    maxHealthPoints: req.body.maxHealthPoints,
    currentHealthPoints: req.body.currentHealthPoints,
    maxFatiguePoints: req.body.maxFatiguePoints,
    currentFatiguePoints: req.body.currentFatiguePoints,
    nextRegenTick: req.body.nextRegenTick,
    _creator: req.user._id,
    characterMadeAt: new Date().getTime()
  });
  console.log(characters);

  characters.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/Characters', authenticate, (req, res) => {
  Characters.find({
    _creator: req.user._id
  }).then((characters) => {
    res.send({characters});
  }, (e) => {
    console.log(e);
    res.status(400).send(e);
  });
});

app.get('/Characters/:id', authenticate, (req, res) => {
  var id = req.params.id;

  if(!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Characters.findOne({
    _id: id,
    _creator: req.user._id
  }).then((characters) => {
    if(!characters) {
      return res.status(404).send();
    }
    res.send({characters});
  }).catch((e) => {
    res.status(400).send();
  });
});

app.put('/CreateSkill/:id', authenticate, (req, res) => {
  var skills = new Skills( {
    _creator: req.params.id,
    level: req.body.level,
    currentExp: req.body.currentExp,
    needForNextLevel: req.body.needForNextLevel,
    difficultyMod: req.body.difficultyMod,
    title: req.body.title
  });
  console.log(skills);

  skills.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/Skills/:id', authenticate, (req, res) => {
  Skills.find({
    _creator: req.params.id
  }).then((skills) => {
    res.send({skills});
  }, (e) => {
    console.log(e);
    res.status(400).send(e);
  });
});

app.put('/Skills/:id', authenticate, (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['title','_creator', 'level', 'currentExp', 'needForNextLevel', 'difficultyMod']);
  if(!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  //console.log(body);
  Skills.findOneAndUpdate({_id: id, _creator: req.body._creator}, {$set: body}, {new: true}).then((skills) => {
    if(!skills) {
      return res.status(404).send();
    }

    res.send({skills});
  }).catch((e) => {
    res.status(400).send();
  })
});

app.put('/Characters/:id', authenticate, (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['name', 'level', 'exp', 'endurance', 'willpower', 'strength', 'dexterity', 'wisdom', 'intelligence', 'speed', 'agility', 'constitution', 'statPoints', 'needForNextLevel', 'skillPoints', 'maxHealthPoints', 'currentHealthPoints', 'maxFatiguePoints', 'currentFatiguePoints', 'nextRegenTick']);
  if(!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  //console.log(body);
  Characters.findOneAndUpdate({_id: id, _creator: req.user._id}, {$set: body}, {new: true}).then((characters) => {
    if(!characters) {
      return res.status(404).send();
    }

    res.send({characters});
  }).catch((e) => {
    res.status(400).send();
  })
});

app.post('/todos', authenticate, (req, res) => {
  var todo = new Todo( {
    text: req.body.text,
    _creator: req.user._id
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos', authenticate, (req, res) => {
  Todo.find({
    _creator: req.user._id
  }).then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos/:id', authenticate, (req, res) => {
  var id = req.params.id;

  if(!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findOne({
    _id: id,
    _creator: req.user._id
  }).then((todo) => {
    if(!todo) {
      return res.status(404).send();
    }
    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });
});


app.delete('/todos/:id', authenticate, (req, res) => {
  var id = req.params.id;

  if(!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  Todo.findOneAndRemove({
    _id: id,
    _creator: req.user._id
  }).then((todo) => {
    if(!todo) {
      return res.status(404).send();
    }
      res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });
});

app.patch('/todos/:id', authenticate, (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);
  if(!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  if(_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }
  Todo.findOneAndUpdate({_id: id, _creator: req.user._id}, {$set: body}, {new: true}).then((todo) => {
    if(!todo) {
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  })
});

app.put('/updateUser', authenticate, (req, res) => {
  var id = req.user._id;
  var body = _.pick(req.body, ['gold', 'food', 'lastFoodTick']);
  if(!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  User.findOneAndUpdate({_id: id}, {$set: body}, {new: true}).then((user) => {
    if(!user) {
      return res.status(404).send();
    }

    res.send({user});
  }).catch((e) => {
    res.status(400).send();
  })
});

app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body)

  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token) => {
    res.header('x-auth', token).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  })
});

app.put('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password', 'gold', 'food', 'lastFoodTick']);
  var user = new User(body)

  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token) => {
    res.header('x-auth', token).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  })
});




app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

app.post('/users/login', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  User.findByCredentials(body.email, body.password).then((user) => {
    return user.generateAuthToken().then((token) => {
      res.header('x-auth', token).send(user);
    });
  }).catch((e) => {
    res.status(400).send();
  });
});

app.put('/users/login', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  User.findByCredentials(body.email, body.password).then((user) => {
    return user.generateAuthToken().then((token) => {
      res.header('x-auth', token).send(user);
    });
  }).catch((e) => {
    res.status(400).send();
  });
});

app.delete('/users/me/token', authenticate, (req,res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send();
  }, () => {
    res.status(400).send();
  });
});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = { app };
