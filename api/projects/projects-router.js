// Write your "projects" router here!
const router = require('express').Router();
const Projects = require('./projects-model')

router.get('/', (req, res) => {
    Projects.get(req.query)
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving projects',
      });
    });
  });
  router.get('/:id', (req, res) => {
    const {id} = req.params;
      Projects.get(id)
      .then(project => {
          res.json(project)
      })
      .catch(err => {
        res.status(500).json({ message: err.message });
      });
  });
  
  router.post('/', (req, res) => {
      Projects.insert(req.body)
      .then(projects => {
        res.status(201).json(projects);
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          message: 'Error adding project',
        });
      });
    });
  
    router.put('/:id', (req, res) => {
      const changes = req.body;
      Projects.update(req.params.id, changes)
      .then(project => {
        if (project) {
          res.status(200).json(project);
        } else {
          res.status(404).json({ message: 'The project was not found' });
        }
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          message: 'Its perfect the way it is we wont be changing it',
        });
      });
    });
  
    router.delete('/:id', (req, res) => {
      Projects.remove(req.params.id)
      .then(count => {
        if (count > 0) {
          res.status(200).json({ message: 'We got rid of the project' });
        } else {
          res.status(404).json({ message: 'Its hiding from us' });
        }
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          message: 'The project is too powerful',
        });
      });
    });

    router.get('/:id/actions'), (req, res) => {
        Projects.getProjectActions(req.params.id)
        .then(actions => {
            if (actions.length) {
                res.json(actions)
            } else{
                res.json({ message: 'nope'})
            }
        })
        .catch(err => {
            res.json({error: err.message})
        })
    }