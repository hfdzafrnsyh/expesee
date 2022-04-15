const express = require('express');
const router = express();

const TodoController = require('../../controllers/TodoController');

router.get('/todos', TodoController.todos);
router.get('/todos/:id', TodoController.detailTodo);
router.post('/todos/create', TodoController.createdTodo);
router.put('/todos/:id', TodoController.updateTodo);
router.delete('/todos/:id', TodoController.removeTodo);

module.exports = router;