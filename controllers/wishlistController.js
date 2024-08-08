const Wishlist = require("../models/Wishlist");
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
    const features = new ApiFeatures( Wishlist.find({ user: req.user.id }), req.query).paginate();
    const result = await features.query.populate('product').select('-user -_v');
    sendResult(res, result, 200);
});

exports.add = catchAsync(async (req, res) => {
    const { product } = req.body;
    const user = req.user.id;

    const newItem = await Wishlist.create({
        user,
        product
    });

    sendResult(res, newItem, 201);
});

exports.remove = catchAsync(async (req, res) => {
    const wishlistID = req.params.id;

    await Wishlist.findByIdAndDelete(wishlistID);

    sendResult(res, {}, 200);
});