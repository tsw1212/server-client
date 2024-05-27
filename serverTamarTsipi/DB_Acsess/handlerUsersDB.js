const con = require('./conection').con.promise();
const handlerDB = require('../DB_Acsess/handlerDB');
async function readAllUsers() {
    return await handlerDB.readAll("users");
}
async function updateUser(filterType, filterValue, updateData) {
    var values = [
        updateData.name,
        updateData.username,
        updateData.email,
        updateData.address.street,
        updateData.address.suite,
        updateData.address.city,
        updateData.address.zipcode,
        updateData.address.geo.lat,
        updateData.address.geo.lng,
        updateData.phone,
        updateData.website,
        updateData.company.name,
        updateData.company.catchPhrase,
        updateData.company.bs,

    ];
    try {
        var sql = `UPDATE users SET name = ?, email = ?, address_street = ?, address_suite = ?, address_city = ?, address_zipcode = ?, address_geo_lat = ?, address_geo_lng = ?, phone = ?, website = ?, company_name = ?, company_catchPhrase = ?, company_bs = ? WHERE ${filterType} = ${filterValue}`;
        const [result] = await con.query(sql, values);
        if (result.affectedRows == 0)
            return null;
        return updateData;
    } catch (err) {
        if (err.code != 400) {
            err.code = 300;
        }
        console.error(`Error fetching users  by ${filterType}:`, err);
        throw err;
    }

}
async function postUser(userData) {
    console.log(userData);
    var sql = "INSERT INTO users (name, username, email, address_street, address_suite, address_city, address_zipcode, address_geo_lat, address_geo_lng, phone, website, company_name, company_catchPhrase, company_bs) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    var values = [
        userData.name,
        userData.username,
        userData.email,
        userData.address.street,
        userData.address.suite,
        userData.address.city,
        userData.address.zipcode,
        userData.address.geo.lat,
        userData.address.geo.lng,
        userData.phone,
        userData.website,
        userData.company.name,
        userData.company.catchPhrase,
        userData.company.bs
    ];

    try {
        const [result] = await con.query(sql, values);
        if (result.affectedRows == 0)
            return null;
        var sql2 = "INSERT INTO passwords (userId, password) VALUES (?,?)";
        var values2 = [result.insertId, userData.password];
        const result2 = await con.query(sql2, values2);
        const userDataObject = {
            id: result.insertId,
            name: userData.name,
            username: userData.username,
            email: userData.email,
            address: {
                street: userData.address.street,
                suite: userData.address.suite,
                city: userData.address.city,
                zipcode: userData.address.zipcode,
                geo: {
                    lat: userData.address.geo.lat,
                    lng: userData.address.geo.lng
                }
            },
            phone: userData.phone,
            website: userData.website,
            company: {
                name: userData.company.name,
                catchPhrase: userData.company.catchPhrase,
                bs: userData.company.bs
            }
        };
        return userDataObject; // מחזיר את כל הערכים של אובייקט המשתמש
    } catch (err) {
        console.error(`Error fetching ${nameTable}  by ${filterType}:`, err);
        throw err;
    }
}
async function searchUsers(filterType, filterValue) {
    return await handlerDB.search("users", filterType, filterValue);

}
async function readUserNamePassword(userName, password) {

    try {

        const [result] = await con.query(" SELECT * FROM passwords JOIN users ON passwords.userId = users.id AND username= ? AND password= ?", [userName, password]);
        if (result.length == 0)
            return null;
        return restructureUserData(result[0]);
    } catch (err) {
        throw err;
    }
}
async function getMoreInformetionAbouteUser(userId, informetion) {

    try {

        const [result] = await con.query(` SELECT users.id AS userId, ${informetion}.*FROM users  JOIN ${informetion} ON users.id = ${informetion}.userId WHERE users.id = ${userId} `);
        return result;


    } catch (err) {
        throw err;
    }
}
async function readUser(filterType, filterValue) {
    try {

        const [result] = await con.query(`SELECT * FROM users WHERE ${filterType} = ?`, [filterValue]);
        return restructureUserData(result[0]);
    } catch (err) {
        console.error(`Error fetching users  by ${filterType}:`, err);
        throw err;
    }
}
async function deleteUser(userId) {
    return await handlerDB.deleted("users", "id", userId);

}
function restructureUserData(userData) {
    return {
        id: userData.id || null,
        name: userData.name || null,
        username: userData.username || null,
        email: userData.email || null,
        address: {
            street: userData.address_street || null,
            suite: userData.address_suite || null,
            city: userData.address_city || null,
            zipcode: userData.address_zipcode || null,
            geo: {
                lat: userData.address_geo_lat || null,
                lng: userData.address_geo_lng || null
            }
        },
        phone: userData.phone || null,
        website: userData.website || null,
        company: {
            name: userData.company_name || null,
            catchPhrase: userData.company_catchPhrase || null,
            bs: userData.company_bs || null
        }
    };
}


module.exports = { postUser, updateUser, readUserNamePassword, getMoreInformetionAbouteUser, readUser, deleteUser, readAllUsers, searchUsers }