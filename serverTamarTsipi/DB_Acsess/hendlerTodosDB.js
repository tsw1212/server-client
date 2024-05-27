const con = require('./conection').con.promise();
const handlerDB = require('../DB_Acsess/handlerDB');

async function updateTodo(filterType, filterValue, updateData) {
    var values = [updateData.userId, updateData.title, updateData.completed];
    try {
        var sql = `UPDATE todos SET userId = ?, title = ?, completed = ? WHERE ${filterType} = ${filterValue}`;
        const [result] = await con.query(sql, values);
        if (result.affectedRows == 0)
            return null;
        return updateData;
    } catch (err) {
        console.error(`Error fetching todos  by ${filterType}:`, err);
        throw err;
    }

}
async function searchTodos(filterType, filterValue) {
    return await handlerDB.search("todos", filterType, filterValue);

}
async function readTodoById(userId) {
    return await handlerDB.read("todos", "id", userId);
}
async function readAllTodos() {
    return await handlerDB.readAll("todos");
}
async function deletedTodo(userId) {
    return await handlerDB.deleted("todos", "id", userId);
}
async function postTodo(todoData) {
    var sql = "INSERT INTO todos (userId, title, completed) VALUES (?, ?, ?)";
    var values = [todoData.userId, todoData.title, todoData.completed];

    try {
        const [result] = await con.query(sql, values);
        // if (result.affectedRows == 0)
        //     return null;
        const todoDataObject = {
            id: result.insertId,
            userId: todoData.userId,
            title: todoData.title,
            completed: todoData.completed
        };
        return todoDataObject;
    } catch (err) {
        console.error(`Error posting todo:`, err);
        throw err;
    }
}
module.exports = { postTodo, updateTodo, readAllTodos, readTodoById, deletedTodo, searchTodos };