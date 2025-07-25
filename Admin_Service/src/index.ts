import Express from "express";
import dotenv from "dotenv";
import { sql } from "./config/DB.js";
import adminRoutes from "./routes.js";
import cloudinary from "cloudinary";
import redis from "redis";
import cors from "cors";



const app = Express();
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

async function initialDB() {
    try {
        await sql`
        CREATE TABLE IF NOT EXISTS albums(
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            description VARCHAR(255) NOT NULL,
            thumbnail VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`;


        await sql`
        CREATE TABLE IF NOT EXISTS songs(
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            description VARCHAR(255) NOT NULL,
            thumbnail VARCHAR(255),
            audio VARCHAR(255) NOT NULL,
            album_id INTEGER REFERENCES albums(id) ON DELETE SET NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`;

        console.log("Database has been initialised");

    } catch (error) {
        console.log("DB error : ", error);

    }
}

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

cloudinary.v2.config({
    cloud_name: process.env.Cloud_Name,
    api_key: process.env.Cloud_API,
    api_secret: process.env.Cloud_API_Secret
});

app.use("/api/v1/", adminRoutes);

app.use(cors());

const PORT = process.env.PORT || 4000;


initialDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on ${PORT}`);
    })
});


