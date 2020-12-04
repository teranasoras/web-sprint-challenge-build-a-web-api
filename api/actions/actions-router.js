// Write your "actions" router here!
const router = require('express').Router();
const Actions = require('./actions-model')


router.get('/', (req, res) => {
    Actions.get(req.query)
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving actions',
      });
    });
  });
  router.get('/:id', (req, res) => {
    const {id} = req.params;
      Actions.get(id)
      .then(action => {
          res.json(action)
      })
      .catch(err => {
        res.status(500).json({ message: err.message });
      });
  });

  router.post('/actions', (req, res) => {
    Actions.insert(req.body)
    .then(actions => {
      res.status(201).json(actions);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'Error adding action',
      });
    });
  });

  router.put('/actions/:id', (req, res) => {
    const changes = req.body;
    Actions.update(req.params.id, changes)
    .then(action => {
      if (action) {
        res.status(200).json(action);
      } else {
        res.status(404).json({ message: 'The action was not found' });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'Its perfect the way it is we wont be changing it',
      });
    });
  });

  router.delete('/actions/:id', (req, res) => {
    Actions.remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: 'We got rid of the action' });
      } else {
        res.status(404).json({ message: 'Its hiding from us' });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'The action is too powerful',
      });
    });
  });