import express from "express";
import dotenv from "dotenv";
import songRoutes from "./route.js";

dotenv.config();

const app = express();

app.use("/api/v1/", songRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is up on ${PORT}`);
});