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
            p_image,
            wishlist:false
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
        const { id } = req.params; // get id from params
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }
        // Update fields
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

exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Product deleted successfully",
            data: deletedProduct
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error deleting product",
            error: error.message
        });
    }
};

exports.toggleWishlist = async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ correct way
    const product = await Product.findById(id);

    console.log(id, product, "wishlist check");

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // 🔥 Toggle wishlist (default false → true → false)
    product.wishlist = !product.wishlist;

    await product.save();

    return res.status(200).json({
      success: true,
      message: product.wishlist
        ? "Added to wishlist"
        : "Removed from wishlist",
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Error updating wishlist",
      error: error.message,
    });
  }
};

exports.getWishlistProducts = async (req, res) => {
  try {
    const products = await Product.find({ wishlist: true });

    return res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Error fetching wishlist products",
      error: error.message,
    });
  }
};

exports.toggleAddtocartlist = async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ correct way
    const product = await Product.findById(id);


    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // 🔥 Toggle wishlist (default false → true → false)
    product.add_to_cart = !product.add_to_cart;

    await product.save();

    return res.status(200).json({
      success: true,
      message: product.add_to_cart
        ? "Added to cart"
        : "Removed from cart",
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Error updating cart",
      error: error.message,
    });
  }
};

exports.getAddtocartProducts = async (req, res) => {
  try {
    const products = await Product.find({ add_to_cart: true });

    return res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Error fetching cart products",
      error: error.message,
    });
  }
};