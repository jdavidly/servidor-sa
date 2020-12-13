const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const cors = require('cors');
const indexRoutes = require('./routes/index');
const userRoutes = require('./routes/user');
const productsRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');

app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use('', indexRoutes);
app.use('/user', userRoutes);
app.use('/product', productsRoutes);
app.use('/cart', cartRoutes);

app.listen(port, () => console.log(`Escuchando en puerto ${port}...`));