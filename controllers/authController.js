const User = require('../models/User');
const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const { promisify } = require('util');

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

const createSendToken = (data, statusCode, res) => {
    const token = createToken(data._id);
    res.status(statusCode).json({
        status: 'success',
        token,
        data,
    });
};

//catchAsync to remove try..catch block from the code we catch the error in it
exports.login = catchAsync(async (req, res, next) => {
    // Check if the username and password exists
    const { username, password } = req.body;
    if (!username || !password)
        return next(new AppError('Please provide Username and Password', 400));

    // Check if the username and password are correct
    const user = await User.findOne({ username: username }).select('+password');
    if (!user || !(await user.matchPassword(password))) {
        return next(new AppError('Incorrect Username and Password !', 401));
    }

    // Sign In and send token
    createSendToken(user, 200, res);
});

exports.signUp = catchAsync(async (req, res, next) => {
    const { username, email, password, passwordConfirm } = req.body;

    // Validate the required fields
    if (!username || !email || !password) {
      return next(new AppError('Please provide username, email, and password', 400));
    }

    // Create a new user
    const user = await User.create({
      username,
      email,
      password,
      passwordConfirm,
    });

    // Sign up and send token
    createSendToken(user, 201, res);
});

exports.protect = catchAsync(async (req, res, next) => {
    let token;
    //1)check if there is token in the header and get the token if there
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (!token)
        return next(
        new AppError("You're not logged in! Please log in to get access ", 401),
        );

    //2)verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const currenUser = await User.findById(decoded.id);
    if (!currenUser)
        return next(
            new AppError(
                'The user belonging to this token does no longer exist',
                401,
            ),
        );

    //3)put entire user data in the request
    req.user = currenUser;

    next();
});

exports.isAdmin = catchAsync(async (req, res, next) => {
    const currentUser = await User.findById(req.user.id);
    if (currentUser.role === 'user')
        return next(
            new AppError(
                'The user has no access!',
                403,
            ),
        );
    
    return next();
})