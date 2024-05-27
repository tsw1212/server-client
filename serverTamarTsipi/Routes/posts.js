const express = require('express');
const router = express.Router();
const hendlerPostsDB = require('../DB_Acsess/handlerPostsDB');
router.get('/:typeInformation=:value', async (req, res) => {
    try {
        let result
        const { typeInformation, value } = req.params;
        if (typeInformation && value) {
            result = await hendlerPostsDB.searchPosts(typeInformation, value);

        }

        res.send(JSON.stringify(result));
    }
    catch (err) {
        res.status(300).send({ message: err.message });
    }
});
router.get('/', async (req, res) => {
    try {
        let result = await hendlerPostsDB.readAllPosts();
        res.send(JSON.stringify(result));
    }
    catch (err) {
        res.status(300).send({ message: err.message });
    }
});

router.get('/:postId', async (req, res) => {
    try {
        let result = await hendlerPostsDB.readPostbyId(req.params.postId);
        res.send(JSON.stringify(result));
    }
    catch (err) {
        res.status(300).send({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        let result = await hendlerPostsDB.postPost(req.body);
        res.send(JSON.stringify(result));
    }
    catch (err) {
        res.status(300).send({ message: err.message });
    }
});

router.delete('/:postId', async (req, res) => {
    try {
        let result = await hendlerPostsDB.deletedPost(req.params.postId);
        res.send(JSON.stringify(`post ${req.params.postId} deleted successfully`));
    }
    catch (err) {
        res.status(300).send({ message: err.message });
    }
});
router.put('/:postId', async (req, res) => {
    try {
        let result = await hendlerPostsDB.updatePost("id", req.params.postId, req.body);
        res.send(JSON.stringify(result));
    }
    catch (err) {
        res.status(300).send({ message: err.message });
    }
})

module.exports = router;