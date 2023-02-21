'use strict';

const express = require('express');
const notFound = require('./middleware/404');
const errorHandler = require('./middleware/500');
const userRouter = require('./auth/router');
const PORT = process.env.PORT || 3003;

// creates an express singleton
const app = express();

app.use(express.json());
app.use(userRouter);
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res, next) => {

  res.status(200).send('Hello World!');
});

app.get('/bad', (req, res, next) => {
  next('we have an error');
});


app.use('*', notFound);
app.use(errorHandler);

const start = () => {
  app.listen(PORT, () => console.log('server running on port', PORT));
};

module.exports = { start, app };
