import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./route.js";
dotenv.config();

const connectDB = async () => {
    try {
        mongoose.connect(process.env.MONGO as string), {
            dibName: "Hermes",
        }

        console.log("Database is Connected");
    } catch (err) {
        console.log(err);

    }
}

const app = express();
app.use(express.json());

app.use("/api/v1", userRouter);

const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
    console.log(`Server is Up on Port : ${PORT}`);
    connectDB();

})