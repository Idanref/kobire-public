const path = require('path');
const express = require('express');
require('./db/mongoose');
const commentRouter = require('./routers/comment');
const workshopRouter = require('./routers/workshop');

const app = express();

// Each app.use(middleware) is called every time a request is sent to the server.

app.use(express.json());
app.use(commentRouter);
app.use(workshopRouter);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('API Running');
  });
}

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log('Server is up on port ' + port);
});
