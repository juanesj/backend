var express = require('express');
var router = express.Router();

// Arreglo 
let tasks = [];

// Endpoint para obtener 
router.get('/:getTasks', (req, res, next) => {
  const { userId } = req.params;
  const userTasks = tasks.filter(task => task.userId === userId);
  res.json(userTasks);
});

router.post('/addtasks', (req, res, next) => {
  let timestamp = Date.now() + Math.random();
  if (req.body && req.body.name && req.body.description && req.body.dueDate) {
      req.body.Id = timestamp.toString();
      tasks.push(req.body);
      res.status(200).json(tasks); // devolver estado 200
  } else {
      res.status(400).json({ error: 'Name, description, or due date is missing' });
  }
});



// Endpoint para eliminar una tarea de un usuario específico
router.delete('/removeTask/:Id', (req, res, next) => {
  if (req.params && req.params.Id ) {
    let Id= req.params.Id;
    tasks=tasks.filter(task => task.Id !== Id);
    res.json(tasks)

  }else{
    res.json([{}])
  }
  res.json(tasks)

});

module.exports = router;

