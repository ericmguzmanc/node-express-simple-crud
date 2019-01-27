const TodoModel = require('../models/todo.model');
const express = require('express');
const router = express.Router();

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
  if (!req.body._id) {
    return res.status(400).send('Missing URL parameter: title');
  }
  TodoModel.findOneAndUpdate({
    _id: req.body._id,
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
  if(!req.body._id) {
    return res.status(400).send('Missing URL parameter: title');
  }

  TodoModel.findOneAndRemove({
    _id: req.body._id
  })
    .then(doc => {
      res.json(doc)
    })
    .catch(err => {
      res.status(500).json(err);
    });

});


module.exports = router;