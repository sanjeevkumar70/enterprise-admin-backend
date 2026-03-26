const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const { getProduct, updateProduct, createProduct, deleteProduct, toggleWishlist } = require("../controllers/product.controller");

router.get("/products", auth(["user", "admin", "manager"]), getProduct);
router.post("/products", auth(["user", "admin", "manager"]), createProduct);
router.put("/products/:id", auth(["user", "admin", "manager"]), updateProduct);
router.delete("/products/:id", auth(["user", "admin", "manager"]), deleteProduct)
router.patch("/wishlist/:id", auth(["user", "admin", "manager"]), toggleWishlist)

module.exports = router;
