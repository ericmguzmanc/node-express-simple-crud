let TodoModel = require('../models/todo.model');
let express = require('express');
let router = express.Router();

/**
 * ➕ Create a new ToDo
 * 📥 POST localhost:3001/todo
 */
router.post('/todo', (req, res) => {
  if(!req.body) {
    return res.status(400).send('Request body is missing');
  }

  let model = new TodoModel(req.body);
  model.save()
    .then(doc => {
      if (!doc || doc.length === 0) {
        return res.status(500).send(doc);
      }
      res.status(200).send(doc);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

/**
 * 📤 GET ToDos
 */
router.get('/todo', (req, res) => {
  TodoModel.find()
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

/**
 * 👇🏻 UPDATE Request
 */
router.put('/todo', (req, res) => {
  if (!req.body.title) {
    return res.status(400).send('Missing URL parameter: title');
  }
  console.log(req.body.title)

  TodoModel.findOneAndUpdate({
    title: req.body.title,
  }, req.body)
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

/**
 * ⚠ DELETE Request
 */
router.delete('/todo', (req, res) => {
  if(!req.body.title) {
    return res.status(400).send('Missing URL parameter: title');
  }

  TodoModel.findOneAndRemove({
    title: req.body.title
  })
    .then(doc => {
      res.json(doc)
    })
    .catch(err => {
      res.status(500).json(err);
    });

});


module.exports = router;