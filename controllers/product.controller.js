const Product = require("../models/Product");

exports.createProduct = async (req, res) => {
    try {
        const {
            p_code,
            p_name,
            p_price,
            p_description,
            rating,
            dimension,
            color,
            quantity,
            p_image
        } = req.body;

        // Basic validation
        if (!p_code || !p_name || !p_price || !p_description) {
            return res.status(400).json({
                success: false,
                message: "Product code, name, price, and description are required"
            });
        }

        // 🔥 Check duplicate product code
        const existingProduct = await Product.findOne({ p_code });

        if (existingProduct) {
            return res.status(409).json({
                success: false,
                message: "Product with this product code already exists"
            });
        }

        const product = await Product.create({
            p_code,
            p_name,
            p_price,
            p_description,
            rating,
            dimension,
            color,
            quantity,
            p_image
        });

        return res.status(201).json({
            success: true,
            message: "Product created successfully",
            data: product
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error creating product",
            error: error.message
        });
    }
};


exports.getProduct = async (req, res) => {
    const data = await Product.find();
    res.json({
        data: data,
        message: "product list fetched successfully!",
    });
};


exports.updateProduct = async (req, res) => {
    try {
        const { _id } = req.params;

        const product = await Product.findOne({ _id });

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        // Duplicate code check (optional)
        if (req.body._id && req.body._id !== product._id) {
            const exists = await Product.findOne({ _id: req.body._id });
            if (exists) {
                return res.status(409).json({
                    success: false,
                    message: "Product code already exists"
                });
            }
        }

        Object.assign(product, req.body);
        await product.save();

        return res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: product
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error updating product",
            error: error.message
        });
    }
};
