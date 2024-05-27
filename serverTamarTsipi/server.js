require('dotenv').config();
const express = require('express');
const db = require('./DB_Acsess/initDB');
const cors = require('cors');

const server = express();
const host = process.env.HOST_NAME;//localhost
const port = process.env.PORT;
if (process.argv[2] == "true") {
    db.CreateAndInitDB();
}
server.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Origin', 'X-Requested-With', 'Accept', 'x-client-key', 'x-client-token', 'x-client-secret', 'Authorization'],
    credentials: true
})
);


const usersRouter = require('./Routes/users');
const postsRouter = require('./Routes/posts');
const todosRouter = require('./Routes/todos');
const commentsRouter = require('./Routes/comments');

server.use(express.json());
server.use('/users', usersRouter)
server.use('/posts', postsRouter);
server.use('/todos', todosRouter);
server.use('/comments', commentsRouter);

server.use((err, req, res, next) => {
    res.ok = false;
    res.status(500).send({
        message: err.message
    });
    next();
});
server.listen(port, host, async () => {

    console.log(`listening to requests at http://${host}:${port}`);
});


