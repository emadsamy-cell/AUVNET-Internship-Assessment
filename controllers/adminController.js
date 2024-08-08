const User = require("../models/User");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const ApiFeatures = require('../utils/paginate');

const sendResult = (res, data, statusCode) => {
    res.status(statusCode).json({
        status: 'success',
        results: data.length,
        data,
    });
};

exports.view = catchAsync(async (req, res) => {
    const features = new ApiFeatures(User.find({role: "admin"}), req.query).paginate();
    const result = await features.query.select('-_v');
    sendResult(res, result, 200);
});

exports.add = catchAsync(async (req, res) => {
    const { username, email, password, passwordConfirm } = req.body;

    // Validate the required fields
    if (!username || !email || !password) {
        return next(new AppError('Please provide username, email, and password', 400));
      }
  
    // Check password and passwordConfirm
    if (password !== passwordConfirm) {
        return next(new AppError('Passwords must be the same!', 400));
    }
    
    // Create a new user
    const user = await User.create({
        username,
        email,
        password,
        passwordConfirm,
        role: "admin",
    });
  

    sendResult(res, user, 201);
});


exports.update = catchAsync(async (req, res) => {
    const { username, email, password, passwordConfirm } = req.body;

    // Validate the required fields
    if (!username || !email || !password) {
        return next(new AppError('Please provide username, email, and password', 400));
    }
  
    // Check password and passwordConfirm
    if (password !== passwordConfirm) {
        return next(new AppError('Passwords must be the same!', 400));
    }
    
    const user = await User.findByIdAndUpdate(
    req.params.id,
    { username, email, password, passwordConfirm },
    { new: true, runValidators: true }
    );
  

    sendResult(res, user, 201);
});

exports.remove = catchAsync(async (req, res) => {
    await User.findByIdAndDelete(req.params.id);

    sendResult(res, {}, 200);
});