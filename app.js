const express = require('express');
require('./db/mongoose');
const commentRouter = require('./routers/comment');
const workshopRouter = require('./routers/workshop');

const app = express();

// Each app.use(middleware) is called every time a request is sent to the server.

app.use(express.json());
app.use(commentRouter);
app.use(workshopRouter);

module.exports = app;
