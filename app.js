const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB(process.env.MONGO_URI).then().catch();

app.get('/',  (req, res) => {
    return res.json("Hello backend ...");
});

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/users", require("./routes/user.routes"));

module.exports = app;

app.listen(5000, () => {
    console.log(process.env.MONGO_URI)
});