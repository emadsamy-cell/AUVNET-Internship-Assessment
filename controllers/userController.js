const User = require("../models/User");
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
    const features = new ApiFeatures(User.find({role: "user"}), req.query).paginate();
    const result = await features.query.select('-user -_v');
    sendResult(res, result, 200);
});


exports.remove = catchAsync(async (req, res) => {
    await User.findByIdAndDelete(req.params.id);

    sendResult(res, {}, 200);
});