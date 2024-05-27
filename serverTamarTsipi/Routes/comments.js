const express = require('express');
const router = express.Router();
const handlerCommentsDB = require('../DB_Acsess/handlerCommentsDB');
router.get('/:typeInformation=:value', async (req, res) => {
    try {
        let result
        const { typeInformation, value } = req.params;
        if (typeInformation && value) {
            result = await handlerCommentsDB.searchComments(typeInformation, value);

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
        if (req.query.postId) {
            result = await handlerCommentsDB.readCommentsOfPost(req.query.postId);
            console.log(result);
        }
        else
            result = await handlerCommentsDB.readAllComments();

        res.send(JSON.stringify(result));
    }
    catch (err) {
        res.status(300).send({ message: err.message });
    }
});

router.get('/:commentId', async (req, res) => {
    try {
        let result = await handlerCommentsDB.readComment(req.params.commentId);
        res.send(JSON.stringify(result));
    }
    catch (err) {
        res.status(300).send({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        let result = await handlerCommentsDB.postComment(req.body);
        res.send(JSON.stringify(result));
    }
    catch (err) {
        res.status(300).send({ message: err.message });
    }
});

router.delete('/:commentId', async (req, res) => {
    try {
        let result = await handlerCommentsDB.deletedComment(req.params.commentId);
        res.send(JSON.stringify("comment with deleted successfully"));
    }
    catch (err) {
        res.status(300).send({ message: err.message });
    }
});
router.put('/:commentId', async (req, res) => {
    try {
        let result = await handlerCommentsDB.updateComment("id", req.params.commentId, req.body);
        res.send(JSON.stringify(result));
    }
    catch (err) {
        res.status(300).send({ message: err.message });
    }
})

module.exports = router;