const Category = require("../models/Category");
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
    const features = new ApiFeatures(Category.find({parent: null}), req.query).paginate();

    const result = await features.query.populate({
        path: 'children',
        populate: {
            path: 'children',
            populate: {
                path: 'children',
            },
        },
    });

    sendResult(res, result, 200);
});

// Function to get the depth of a category
const getCategoryDepth = async (category) => {
    let depth = 0;
    while (category.parent) {
      category = await Category.findById(category.parent);
      depth += 1;
    }
    return depth;
};

exports.add = catchAsync(async (req, res) => {
    const { name, type, parent } = req.body;

    // Check if the parent category exists and if it's within 3 levels
    if (parent) {
        const parentCategory = await Category.findById(parent);
        if (!parentCategory) {
            return res.status(404).json({ message: 'Parent category not found' });
        }
        const parentHierarchyDepth = await getCategoryDepth(parentCategory);
        if (parentHierarchyDepth >= 3) {
            return res.status(400).json({ message: 'Category depth exceeds maximum allowed levels' });
        }
    }

    const newCategory =  await Category.create({
        name,
        type,
        parent: parent || null,
    });
  
    sendResult(res, newCategory, 201);
});


exports.update = catchAsync(async (req, res) => {
    const { name, type } = req.body;
  
    const category = await Category.findByIdAndUpdate(
    req.params.id,
    { name, type },
    { new: true, runValidators: true }
    );
  

    sendResult(res, category, 201);
});

// Recursive function to delete all child categories
const deleteCategoryAndChildren = async (categoryId) => {
    const children = await Category.find({ parent: categoryId });
  
    for (const child of children) {
      await deleteCategoryAndChildren(child._id);
    }
  
    await Category.findByIdAndDelete(categoryId);
};

exports.remove = catchAsync(async (req, res) => {
    const category = await Category.findById(req.params.id);
    await deleteCategoryAndChildren(category._id);
    sendResult(res, {}, 200);
});