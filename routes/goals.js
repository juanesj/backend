var express = require('express');
var router = express.Router();

// Arreglo 
let goals = [];

// Endpoint para obtener los objetivos de un usuario específico
router.get('/:getgoals', (req, res, next) => {
  const { userId } = req.params;
  const userGoals = goals.filter(goal => goal.userId === userId);
  res.json(userGoals);
});

//  agregar 
router.post('/addgoals', (req, res, next) => {
  let timestamp = Date.now() + Math.random();
  if (req.body && req.body.name && req.body.description && req.body.dueDate) {
      req.body.Id = timestamp.toString();
      goals.push(req.body);
      res.status(200).json(goals); //  estado 200
  } else {
      res.status(400).json({ error: 'Name, description, or due date is missing' });
  }
});

 
// Endpoint para eliminar una tarea de un usuario específico
router.delete('/removegoals/:Id', (req, res, next) => {
    if (req.params && req.params.Id ) {
      let Id= req.params.Id;
      goals=goals.filter(goals => goals.Id !== Id);
      res.json(goals)
  
    }else{
      res.json([{}])
    }
    res.json(goals)
  
  });
  
  module.exports = router;