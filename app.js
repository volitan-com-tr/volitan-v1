const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const dbconfig = require('./api/config/config');


const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/user');

mongoose.Promise = global.Promise;
mongoose.connect(dbconfig.db,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then( ()=>{
    console.log('Database bağlandı...')
},
  error => {
      console.log('Database bağlantı hatası: '+error)
  }  
)


app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(express.json());
app.use(cors());

// Routes which should handle requests
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/user', userRoutes);

app.use((req, res, next) => {
    const error = new Error('Modül Bulunamadı.!');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        hata: {
            mesaj: error.message
        }
    });
});

module.exports = app;