require("dotenv").config();
const express = require("express");
const cors = require("cors");
const database = require("./database/connect");
const authRoutes = require("./routes/auth");
const walletRoutes = require("./routes/wallet");
const authMiddleware = require("./middlewares/auth");

const app = express();

app.use(express.json());
app.use(cors());

database.connect();

app.use("/api/auth", authRoutes);
app.use("/api/wallet", authMiddleware, walletRoutes);

const PORT = process.env.PORT ?? 8000;
app.listen(PORT, () => console.log(`Running on http://localhost:${PORT}`));
