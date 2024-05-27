const express = require('express');
const router = express.Router();
const handlerUsersDB = require('../DB_Acsess/handlerUsersDB')

router.get('/:typeInformation=:value', async (req, res) => {
    try {
        let result
        const { typeInformation, value } = req.params;
        if (typeInformation && value) {
            result = await handlerUsersDB.searchUsers(typeInformation, value);
        }
        res.send(JSON.stringify(result));
    }
    catch (err) {
        res.status(300).send({ message: err.message });
    }
});
router.get('/', async (req, res) => {
    try {
        let result
        if (req.query.username && req.query.password) {
            result = await handlerUsersDB.readUserNamePassword(req.query.username, req.query.password);
        }
        else
            result = await handlerUsersDB.readAllUsers();
        res.send(JSON.stringify(result));
    }
    catch (err) {
        res.status(300).send({ message: err.message });
    }
});

router.get('/:userId', async (req, res) => {
    try {

        let result = await handlerUsersDB.readUser("id", req.params.userId);
        res.send(JSON.stringify(result));
    }
    catch (err) {
        res.status(300).send({ message: err.message });
    }
});

router.get('/:userId/:typeInformation', async (req, res) => {
    try {

        let result = await handlerUsersDB.getMoreInformetionAbouteUser(req.params.userId, req.params.typeInformation);
        res.send(JSON.stringify(result));
    }
    catch (err) {
        res.status(300).send({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        let result = await handlerUsersDB.postUser(req.body);
        res.send(JSON.stringify(result));
    }
    catch (err) {
        res.status(300).send({ message: "details are not correct" });
    }
});

router.delete('/:userId', async (req, res) => {
    try {
        let result = await handlerUsersDB.deleteUser(req.params.userId);
        res.send(JSON.stringify(`user with id${req.params.userId} deleted successfully`));
    }
    catch (err) {
        res.status(300)
        res.ok = true;
        res.send({ message: err.message });
    }
});
router.put('/:userId', async (req, res) => {
    try {
        let result = await handlerUsersDB.updateUser("id", req.params.userId, req.body);
        res.send(JSON.stringify(result));
    }
    catch (err) {
        res.status(300).send({ message: err.message });
    }

})

module.exports = router;