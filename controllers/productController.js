const Product = require("../models/Product");
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
    const features = new ApiFeatures(Product.find(), req.query).paginate();
    const result = await features.query.select('-_v');
    sendResult(res, result, 200);
});

exports.add = catchAsync(async (req, res) => {
    const { name, description, price, category } = req.body;
    const user = req.user.id;

    const product = await Product.create({
        name,
        description,
        price,
        category,
        user
    });

    sendResult(res, product, 201);
});

exports.owner = catchAsync(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (product.user.toString() === req.user.id.toString() || req.user.role === "admin")
        next()
    else
        return next(
            new AppError("You don't have access to this product", 403),
        );
})

exports.update = catchAsync(async (req, res) => {
    const { name, price, description, category } = req.body;

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, description, category },
      { new: true, runValidators: true }
    );

    sendResult(res, product, 200);
});

exports.remove = catchAsync(async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);

    sendResult(res, {}, 200);
});