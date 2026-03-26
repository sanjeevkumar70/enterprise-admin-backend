const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const { getProduct, updateProduct, createProduct, deleteProduct, toggleWishlist, getWishlistProducts, toggleAddtocartlist, getAddtocartProducts } = require("../controllers/product.controller");

router.get("/products", auth(["user", "admin", "manager"]), getProduct);
router.post("/products", auth(["user", "admin", "manager"]), createProduct);
router.put("/products/:id", auth(["user", "admin", "manager"]), updateProduct);
router.delete("/products/:id", auth(["user", "admin", "manager"]), deleteProduct)
router.patch("/wishlist/:id", auth(["user", "admin", "manager"]), toggleWishlist)
router.get("/wishlist", auth(["user", "admin", "manager"]), getWishlistProducts)
router.patch("/cart/:id", auth(["user", "admin", "manager"]), toggleAddtocartlist)
router.get("/cart", auth(["user", "admin", "manager"]), getAddtocartProducts)

module.exports = router;
