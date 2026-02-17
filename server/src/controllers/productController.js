const Product = require('../models/productModel');
const mongoose = require('mongoose');

exports.getAllProduct = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 15;

        const skip = (page - 1) * limit;
        const totalProducts = await Product.countDocuments({ isActive: true });

        const products = await Product.find({ isActive: true }).sort({ createdAt: -1 }).skip(skip).limit(limit);

        return res.status(200).send({ success: true, products, currentPage: page, totalPage: Math.ceil(totalProducts / limit) })
    }
    catch (error) {
        return res.status(500).send({ success: false, message: error.message });
    }
}

exports.getCategoryProduct = async (req, res) => {
    try {
        const { category } = req.params;

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 15;

        const skip = (page - 1) * limit;
        const totalProducts = await Product.countDocuments({ category, isActive: true });

        const products = await Product.find({ category, isActive: true }).sort({ createdAt: -1 }).skip(skip).limit(limit);

        return res.status(200).send({ success: true, products, currentPage: page, totalPage: Math.ceil(totalProducts / limit) })
    }
    catch (error) {
        return res.status(500).send({ success: false, message: error.message });
    }
}

exports.getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({
                success: false,
                message: "Invalid product ID"
            });
        }

        const product = await Product.findById({ _id: id });
        if (!product || !product.isActive) {
            return res.status(404).send({ success: false, message: "Product not found" });
        }
        return res.status(200).send({ success: true, product });
    }
    catch (error) {
        return res.status(500).send({ success: false, message: error.message });
    }
}

exports.getBestsellers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 15;

        const skip = (page - 1) * limit;
        const totalBestsellers = await Product.countDocuments({ bestseller: true, isActive: true });

        const products = await Product.find({ bestseller: true, isActive: true }).sort({ createdAt: -1 }).skip(skip).limit(limit);

        return res.status(200).send({ success: true, products, currentPage: page, totalPage: Math.ceil(totalBestsellers / limit) })
    }
    catch (error) {
        return res.status(500).send({ success: false, message: error.message });
    }
}