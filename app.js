const createError = require('http-errors');
const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv');
dotenv.config({ path: './config/.env' });


const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');
const authRoutes = require('./routes/authRoutes');
const wishlistRoutes = require('./routes/wishlistRoutes');

const app = express();
app.use(cors());

//open db connection
const connectDB = require('./config/db');
connectDB();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/auth', authRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use((req, res, next) => {
  return next(
    new AppError(`Can't find this ${req.originalUrl} On this server!`, 404),
  );
});
app.use(globalErrorHandler);
module.exports = app;
