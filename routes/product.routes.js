const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const { getProduct } = require("../controllers/product.controller");
const { createProduct } = require("../controllers/product.controller");

router.get("/products", auth(["user", "admin", "manager"]), getProduct);
router.post("/products", auth(["user", "admin", "manager"]), createProduct);

module.exports = router;
