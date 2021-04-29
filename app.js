const express = require('express');
const morgan = require('morgan');
const main = require('./views/main.js');

const { db, User, Page } = require('./models');
console.log('here is db in app >>>>', db);

// db.authenticate().then(() => {
//   console.log('connected to the database');
// });

const app = express();

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res, next) => {
  try {
    res.send(main());
  } catch (error) {
    next(error);
  }
});

const init = async () => {
  await db.sync({ force: true });

  const PORT = 3000;

  app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
  });
};
