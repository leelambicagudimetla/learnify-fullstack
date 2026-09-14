const express = require("express");
const connectDB = require("./src/config/db");
require("dotenv").config();
const authRoute = require("./src/router/authRouter");


const app = express();
app.use(express.json());

app.use("/api/auth",authRoute);

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> {
    console.log(`Server runnning on port ${PORT}`);
});