const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middleware/error");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

const app = express();

//config deotenv help to Loads .env file contents into process.env.
dotenv.config({ path: "backend/config/config.env" });

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({limit:'50mb'}));
app.use(fileUpload());

//Route Imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);

//Middleware for Errors
app.use(errorMiddleware);

module.exports = app;
