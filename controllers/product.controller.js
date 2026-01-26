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


// {
//   "p_code": "PRD-1001",
//   "p_name": "Smart Watch",
//   "p_price": 2999,
//   "p_description": "Fitness smart watch with heart rate tracking",
//   "rating": 4.5,
//   "dimension": "42mm x 38mm x 10mm",
//   "color": "Black",
//   "quantity": 50,
//   "p_image": "https://example.com/watch.png"
// }


exports.getProduct = async (req, res) => {
    const data = await Product.find();
    res.json({
        data: data,
        message: "product list fetched successfully!",
    });
};
