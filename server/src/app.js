const express = require('express');

require('./db/mongoose');
const path = require('path');
const userRouter = require('./routes/user');
const taskRouter = require('./routes/task');

const app = express();

const publicDirectoryPath = path.join(__dirname, '../client/build');
app.use(express.static(publicDirectoryPath));

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

module.exports = app;
