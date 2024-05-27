const con = require('./conection').con.promise();
const handlerDB = require('../DB_Acsess/handlerDB');
async function readAllPosts() {
    return await handlerDB.readAll("posts");
}
async function updatePost(filterType, filterValue, updateData) {
    var values = [updateData.userId, updateData.title, updateData.body];
    try {
        var sql = `UPDATE posts SET userId = ?, title = ?, body = ? WHERE ${filterType} = ${filterValue}`;
        const [result] = await con.query(sql, values);
        if (result.affectedRows == 0)
            return null;
        return updateData;
    } catch (err) {
        console.error(`Error fetching posts  by ${filterType}:`, err);
        throw err;
    }

}
async function searchPosts(filterType, filterValue) {
    return await handlerDB.search("posts", filterType, filterValue);

}
async function postPost(postData) {
    var sql = "INSERT INTO posts (userId, title, body) VALUES (?, ?, ?)";
    var values = [
        postData.userId,
        postData.title,
        postData.body
    ];

    try {
        const [result] = await con.query(sql, values);
        if (result.affectedRows == 0)
            return null;
        const postDataObject = {
            id: result.insertId,
            userId: postData.userId,
            title: postData.title,
            body: postData.body
        };
        return postDataObject;
    } catch (err) {
        console.error(`Error posting post:`, err);
        throw err;
    }
}
async function readPostbyId(userId) {
    return await handlerDB.read("posts", "id", userId);
}
async function deletedPost(postId) {
    return await handlerDB.deleted("posts", "id", postId);

}
module.exports = { updatePost, postPost, readAllPosts, readPostbyId, deletedPost, searchPosts };