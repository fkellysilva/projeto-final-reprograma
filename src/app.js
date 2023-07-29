require("dotenv").config();
const express = require("express");
const cors = require("cors");
const database = require("./database/connect");
const authRoutes = require("./routes/auth");
const walletRoutes = require("./routes/wallet");
const transactionRoutes = require("./routes/transaction");
const categoryRoutes = require("./routes/category");
const authMiddleware = require("./middlewares/auth");

const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("../swagger_output.json");

const app = express();

app.use(express.json());
app.use(cors());

database.connect();

app.use("/api/auth", authRoutes);
app.use("/api/wallet", authMiddleware, walletRoutes);
app.use("/api/category", authMiddleware, categoryRoutes);
app.use("/api/transaction", authMiddleware, transactionRoutes);

app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));

module.exports = app;
