const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const product = require('./routes/product.route');

const url = 'mongodb://127.0.0.1:27017/test';
mongoose.connect(url, { useNewUrlParser: true })

const db = mongoose.connection;
db.once('open', _ => {
  console.log('Database connected:', url)
});
db.on('error', err => {
  console.error('connection error:', err)
});

const port = 1234;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/products', product);

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});
