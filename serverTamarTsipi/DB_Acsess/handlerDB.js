const con = require('./conection').con.promise();

async function readAll(nameTable) {
    try {
        const [result] = await con.query(`SELECT * FROM ${nameTable}`);
        return result;
    } catch (err) {
        console.error(`Error reading all ${nameTable}:`, err);
        throw err;
    }
}

async function read(nameTable, filterType, filterValue) {
    try {
        const [result] = await con.query(`SELECT * FROM ${nameTable} WHERE ${filterType} = ?`, [filterValue]);
        return result;
    } catch (err) {
        if (err.code != 404) {
            err.code = 300;
        }
        console.error(`Error fetching ${nameTable}  by ${filterType}:`, err);
        throw err;
    }
}
async function search(nameTable, filterType, filterValue) {
    try {
        const [result] = await con.query(`SELECT * FROM ${nameTable} WHERE ${filterType} = ?`, [filterValue]);
        return result;
    } catch (err) {
        if (err.code != 404) {
            err.code = 300;
        }
        console.error(`Error fetching ${nameTable}  by ${filterType}:`, err);
        throw err;
    }
}




async function deleted(nameTable, filterType, filterValue) {
    try {
        const sql = `DELETE FROM ${nameTable} WHERE ${filterType} = ?`;
        const [result] = await con.query(sql, [filterValue]);
        return result;
    } catch (err) {
        console.error(`Error deleting item with ${filterType} ${filterValue} from ${nameTable}:`, err);
        throw err;
    }
}






module.exports = { readAll, read, deleted, search };