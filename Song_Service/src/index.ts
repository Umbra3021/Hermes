import express from "express";
import dotenv from "dotenv";
import songRoutes from "./route.js";
import redis from "redis";
import cors from 'cors';


dotenv.config();

export const redisClient = redis.createClient({
    password: process.env.Redis_Password,
    socket: {
        host: "redis-14320.c212.ap-south-1-1.ec2.redns.redis-cloud.com",
        port: 14320,
    }
});

redisClient.connect().then(() =>
    console.log("Connected to Redis")).catch(console.error);

const app = express();

app.use(cors());

app.use("/api/v1/", songRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is up on ${PORT}`);
});