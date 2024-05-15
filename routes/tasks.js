const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');



// Modelo de tareas
const taskInit = mongoose.model('tasks', {
  name: String,
  description: String,
  dueDate: String
}, 'tasks');

// Endpoint para obtener tareas
router.get('/getTask', function(req, res,next ) {
  taskInit.find({}).then(response =>
     res.status(200).json(response))
    .catch(err => res.status(500).json(err));
});

// remove una tarea específica
router.delete('/removeTask/:id', function(req, res,next) {
  if (req.params && req.params.id) {
    let id = req.params.id;
    taskInit.deleteOne({ _id: new mongoose.Types.ObjectId(id) }).then((response) =>{
      res.status(200).json(response);

    }).catch(err => res.status(500).json(err));
      
  } else {
    res.status(400).json({ });
  }

});

// Endpoint para agregar una tarea
router.post('/addTask', (req, res) => {
  if (req.body && req.body.name && req.body.description && req.body.dueDate) {
    const task = new taskInit(req.body);
    task.save().then(() => 
      res.status(200).json())
      .catch(err => res.status(500).json(err));
  } else {
    res.status(400).json({ err });
  }
});






module.exports = router;
