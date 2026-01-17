const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const { getUsers } = require("../controllers/user.controller");

router.get("/users", auth(["admin", "manager"]), getUsers);

module.exports = router;
