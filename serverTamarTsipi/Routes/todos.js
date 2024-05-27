const express = require('express');
const router = express.Router();
const handlertodosDB = require('../DB_Acsess/hendlerTodosDB');
router.get('/:typeInformation=:value', async (req, res) => {
    try {
        let result
        const { typeInformation, value } = req.params;
        if (typeInformation && value) {
            result = await handlertodosDB.searchTodos(typeInformation, value);

        }
        res.send(JSON.stringify(result));
    }
    catch (err) {
        res.status(300).send({ message: err.message });
    }
});
router.get('/', async (req, res) => {
    try {
        let result = await handlertodosDB.readAllTodos();
        res.send(JSON.stringify(result));
    }
    catch (err) {
        res.status(300).send({ message: err.message });
    }
});

router.get('/:todoId', async (req, res) => {
    try {
        let result = await handlertodosDB.readTodoById(req.params.todoId);
        res.send(JSON.stringify(result));
    }
    catch (err) {
        res.status(300).send({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        let result = await handlertodosDB.postTodo(req.body);
        res.send(JSON.stringify(result));
    }
    catch (err) {
        res.status(300).send({ message: err.message });
    }
});

router.delete('/:todoId', async (req, res) => {
    try {
        let result = await handlertodosDB.deletedTodo(req.params.todoId);
        res.send(JSON.stringify(result));
    }
    catch (err) {
        res.status(300).send({ message: err.message });
    }
});
router.put('/:todoId', async (req, res) => {
    try {
        let result = await handlertodosDB.updateTodo("id", req.params.todoId, req.body);
        res.send(JSON.stringify(result));
    }
    catch (err) {
        res.status(300).send({ message: err.message });
    }
})

module.exports = router;