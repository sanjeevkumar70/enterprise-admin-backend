const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const { getProduct, updateProduct ,createProduct} = require("../controllers/product.controller");

router.get("/products", auth(["user", "admin", "manager"]), getProduct);
router.post("/products", auth(["user", "admin", "manager"]), createProduct);
router.put("/products/:id", auth(["user", "admin", "manager"]), updateProduct);

module.exports = router;
