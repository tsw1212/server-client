const mysql = require('mysql2');
require('dotenv').config();

var conToCreatDb = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
});

var usersData = [
    {
        name: 'John Doe',
        username: 'johndoe',
        email: 'johndoe@example.com',
        address_street: '123 Main Street',
        address_suite: 'Apt 101',
        address_city: 'Anytown',
        address_zipcode: '12345',
        address_geo_lat: '40.7128',
        address_geo_lng: '-74.0060',
        phone: '555-1234',
        website: 'http://www.example.com',
        company_name: 'Example Company',
        company_catchPhrase: 'Making examples since 1990',
        company_bs: 'Example'
    },
    {
        name: 'Jane Smith',
        username: 'janesmith',
        email: 'janesmith@example.com',
        address_street: '456 Oak Avenue',
        address_suite: 'Suite 202',
        address_city: 'Smalltown',
        address_zipcode: '54321',
        address_geo_lat: '41.8781',
        address_geo_lng: '-87.6298',
        phone: '555-5678',
        website: 'http://www.example.org',
        company_name: 'Another Company',
        company_catchPhrase: 'Inventing new things daily',
        company_bs: 'Innovation'
    },
    {
        name: 'Bob Johnson',
        username: 'bobjohnson',
        email: 'bobjohnson@example.com',
        address_street: '789 Pine Street',
        address_suite: 'Apt 303',
        address_city: 'Villagetown',
        address_zipcode: '98765',
        address_geo_lat: '34.0522',
        address_geo_lng: '-118.2437',
        phone: '555-9012',
        website: 'http://www.example.net',
        company_name: 'ABC Company',
        company_catchPhrase: 'Building the future together',
        company_bs: 'Collaboration'
    },

];
var commentsData = [
    {
        postId: 1,
        name: 'id labore ex et quam laborum',
        email: 'bobjohnson@example.com',
        body: 'laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium'
    },
    {
        postId: 1,
        name: 'voluptatem quia et dolore',
        email: 'johndoe@example.com',
        body: 'est natus enim nihil est dolore omnis voluptatem numquam\net omnis occaecati quod ullam at\nvoluptatem error expedita pariatur\nnihil sint nostrum voluptatem reiciendis et'
    },
    {
        postId: 3,
        name: 'quo vero reiciendis velit similique earum',
        email: 'johndoe@example.com',
        body: 'est natus enim nihil est dolore omnis voluptatem numquam\net omnis occaecati quod ullam at\nvoluptatem error expedita pariatur\nnihil sint nostrum voluptatem reiciendis et'
    },

];
var postsData = [
    { userId: 1, title: 'Title 1', body: 'This is the first post' },
    { userId: 2, title: 'Title 2', body: 'This is the second post' },
    { userId: 3, title: 'Title 3', body: 'This is the third post' },
    { userId: 1, title: 'Title 4', body: 'This is the fourth post' },
    { userId: 1, title: 'Title 5', body: 'This is the fifth post' },
    { userId: 2, title: 'Title 6', body: 'This is the sixth post' },
    { userId: 2, title: 'Title 7', body: 'This is the seventh post' },
    { userId: 2, title: 'Title 8', body: 'This is the eighth post' },
    { userId: 2, title: 'Title 9', body: 'This is the ninth post' },
    { userId: 1, title: 'Title 10', body: 'This is the tenth post' }
];

var todosData = [
    { userId: 1, title: 'Complete task A', completed: false },
    { userId: 2, title: 'Finish project B', completed: true },
    { userId: 3, title: 'Finish project B', completed: true }
];
var passwordsData = [
    { userId: 1, password: "123" },
    { userId: 2, password: "456" },
    { userId: 3, password: "789" }
];







var con;

function createTableUsers() {

    con.connect(function (err) {
        if (err) throw err;

        var createSql = ` CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), username VARCHAR(255), email VARCHAR(255), address_street VARCHAR(255),  address_suite VARCHAR(255),address_city VARCHAR(255),address_zipcode VARCHAR(255),address_geo_lat VARCHAR(255),    address_geo_lng VARCHAR(255), phone VARCHAR(255),  website VARCHAR(255), company_name VARCHAR(255), company_catchPhrase VARCHAR(255), company_bs VARCHAR(255) )  `;

        // Execute the drop and create SQL queries
        con.query(createSql, function (err, result) {
            if (err) throw err;
            console.log("Table users created");
        });
    });

}

function createTableComments() {

    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");

        // SQL query for creating the comments table with DROP TABLE IF EXISTS
        var sql = ` CREATE TABLE comments (   id INT AUTO_INCREMENT PRIMARY KEY, post_id INT , name VARCHAR(255) ,email VARCHAR(255), body TEXT, FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE )`;
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Table comments created");
        });
    });
}

function createTablePosts() {


    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");

        // SQL query for creating the posts table with DROP TABLE IF EXISTS
        var sql = ` CREATE TABLE posts (id INT AUTO_INCREMENT PRIMARY KEY , userId INT,title VARCHAR(255),body VARCHAR(255),FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE)`;

        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Table posts created");
        });
    });
}

function createTableTodos() {


    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
        // SQL query for creating the todos table with DROP TABLE IF EXISTS
        var sql = ` CREATE TABLE todos (  id INT AUTO_INCREMENT PRIMARY KEY,userId INT,title VARCHAR(255), completed BOOLEAN,FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE)`;
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Table todos created");
        });
    });
}

function createTablePasswords() {

    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");

        // SQL query for creating the passwords table with DROP TABLE IF EXISTS
        var sql = `CREATE TABLE passwords (id INT AUTO_INCREMENT PRIMARY KEY,userId INT, password VARCHAR(20),FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE)`;

        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Table passwords created");
        });
    });
}

function createDatabaseIfNotExists() {
    return new Promise((resolve, reject) => {

        conToCreatDb.connect(function (err) {
            if (err) {
                console.error("Error connecting to database server:", err);
                reject(err);
            }
            console.log("Connected to the database server!");
            conToCreatDb.query(`CREATE DATABASE IF NOT EXISTS ${process.env.MYSQL_DB_NAME}`, function (err, result) {
                if (err) {
                    console.error(`Error creating database ${process.env.MYSQL_DB_NAME}:`, err);
                    reject(err);

                }
                console.log(`Database ${process.env.MYSQL_DB_NAME} created or already exists`);
                resolve(result);
            });
        });
    });
}

function createTablesFunc() {

    return new Promise((resolve, reject) => {
        createDatabaseIfNotExists().then(() => {
            console.log("Database 1");
            con = mysql.createConnection({
                host: process.env.MYSQL_HOST,
                port: process.env.MYSQL_PORT,
                user: process.env.MYSQL_USER,
                password: process.env.MYSQL_PASSWORD,
                database: process.env.MYSQL_DB_NAME,
            });
            createTableUsers();
            createTablePosts();
            createTableComments();
            createTableTodos();
            createTablePasswords();
            resolve(false);


        })
            .catch(err => {
                console.log(4);
                reject(err);
            });
    });

}

function insertUsers(usersData) {

    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
        usersData.forEach(function (userData) {
            var sql = "INSERT INTO users (name, username, email, address_street, address_suite, address_city, address_zipcode, address_geo_lat, address_geo_lng, phone, website, company_name, company_catchPhrase, company_bs) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            var values = [
                userData.name,
                userData.username,
                userData.email,
                userData.address_street,
                userData.address_suite,
                userData.address_city,
                userData.address_zipcode,
                userData.address_geo_lat,
                userData.address_geo_lng,
                userData.phone,
                userData.website,
                userData.company_name,
                userData.company_catchPhrase,
                userData.company_bs
            ];

            con.query(sql, values, function (err, result) {
                if (err) throw err;
                console.log("1 record inserted");
            });
        });
    });
}
function insertPosts(postsData) {
    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
        postsData.forEach(function (postsData) {
            var sql = "INSERT INTO posts (userId, title, body) VALUES (?, ?, ?)";

            var values = [
                postsData.userId,
                postsData.title,
                postsData.body
            ];

            con.query(sql, values, function (err, result) {
                if (err) throw err;
                console.log("1 record inserted");
            });
        });
    });


}
function insertTodos(todosData) {

    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");

        todosData.forEach(function (todoData) {
            var sql = "INSERT INTO todos (userId, title, completed) VALUES (?, ?, ?)";

            var values = [
                todoData.userId,
                todoData.title,
                todoData.completed
            ];

            con.query(sql, values, function (err, result) {
                if (err) throw err;
                console.log("1 record inserted");
            });
        });
    });
}
function insertPasswords(passwordsData) {

    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");

        passwordsData.forEach(function (passwordData) {
            var sql = "INSERT INTO passwords (userId, password) VALUES (?, ?)";

            var values = [
                passwordData.userId,
                passwordData.password
            ];

            con.query(sql, values, function (err, result) {
                if (err) throw err;
                console.log("1 record inserted");
            });
        });
    });
}
function insertComments(commentsData) {

    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");

        commentsData.forEach(function (commentData) {
            var sql = "INSERT INTO comments (post_id, name, email, body) VALUES (?, ?, ?, ?)";

            var values = [
                commentData.postId,
                commentData.name,
                commentData.email,
                commentData.body
            ];

            con.query(sql, values, function (err, result) {
                if (err) throw err;
                console.log("1 record inserted");
            });
        });
    });
}

function insertdbFunc() {
    try {
        insertUsers(usersData);
        insertPosts(postsData);
        insertComments(commentsData);
        insertTodos(todosData);
        insertPasswords(passwordsData);

    } catch (error) {
        console.log(error);
    }

}

function CreateAndInitDB() {
    createTablesFunc().then(() => { insertdbFunc(); }).catch(err => console.log(err));
}

module.exports = { CreateAndInitDB };