const con = require('./conection').con.promise();
const handlerDB = require('../DB_Acsess/handlerDB');

async function searchComments(filterType, filterValue) {
    return await handlerDB.search("comments", filterType, filterValue);
}
async function readAllComments() {
    return await handlerDB.readAll("comments");
}
async function readComment(commentsId) {
    return await handlerDB.read("comments", "id", commentsId);
}
async function deletedComment(commentsId) {
    return await handlerDB.deleted("comments", "id", commentsId);
}
async function readCommentsOfPost(postId) {

    try {
        const [result] = await con.query(` SELECT *FROM comments  JOIN posts ON comments.post_id = posts.id WHERE comments.post_id=${postId}`);
        return result;

    } catch (err) {
        if (err.code != 404)
            err.code = 300;
        console.error(`Error post_id ${postId}} dosent exsit`, err);
        throw err;
    }
}
async function postComment(commentData) {
    var sql = "INSERT INTO comments (post_id, name, email, body) VALUES (?, ?, ?, ?)";
    var values = [
        commentData.postId,
        commentData.name,
        commentData.email,
        commentData.body
    ];

    try {
        const [result] = await con.query(sql, values);
        if (result.affectedRows == 0)
            return null;
        const commentDataObject = {
            id: result.insertId,
            postId: commentData.postId,
            name: commentData.name,
            email: commentData.email,
            body: commentData.body
        };
        return commentDataObject;
    } catch (err) {
        console.error(`Error posting comment:`, err);
        throw err;
    }
}
async function updateComment(filterType, filterValue, updateData) {
    var values = [
        updateData.postId,
        updateData.name,
        updateData.email,
        updateData.body
    ]; try {
        var sql = `UPDATE comments SET post_id = ?, name = ?, email= ? ,body = ? WHERE ${filterType} = ${filterValue}`;
        const [result] = await con.query(sql, values);
        if (result.affectedRows == 0)
            return null;
        return updateData;
    } catch (err) {
        if (err.code != 400)
            err.code = 300;
        console.error(`Error fetching posts  by ${filterType}:`, err);
        throw err;
    }

}
module.exports = { readCommentsOfPost, updateComment, postComment, readAllComments, readComment, deletedComment, searchComments }