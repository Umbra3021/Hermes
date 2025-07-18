import getBuffer from "./config/dataUri.js";
import TryCatch from "./TryCatch.js";
import { Request } from "express";
import cloudinary from "cloudinary";
import { sql } from "./config/DB.js";
import { redisClient } from "./index.js";

interface AuthenticateRequest extends Request {
    user?: {
        _id: string,
        role: string
    }
}

export const addAlbum = TryCatch(async (req: AuthenticateRequest, res) => {
    if (req.user?.role !== "admin") {
        res.status(401).json({ message: "Not Admin" });
        return;
    }

    const { title, description } = req.body;

    const file = req.file;

    if (!file) {
        res.status(400).json({ message: "No file selected" });
        return;
    }

    const fileBuffer = getBuffer(file);

    if (!fileBuffer || !fileBuffer.content) {
        res.status(500).json({ message: "Failed to generate File Buffer" });
        return;
    }

    const cloud = await cloudinary.v2.uploader.upload(fileBuffer.content, {
        folder: "albums"
    });

    const result = await sql`
        INSERT INTO albums (title,description,thumbnail) VALUES(${title},${description},
        ${cloud.secure_url}) RETURNING * `;

    if (redisClient.isReady) {
        await redisClient.del("albums");
        console.log("Redis cleared");
    }

    res.json({
        message: "Album created",
        album: result[0],
    })


});



export const addSong = TryCatch(async (req: AuthenticateRequest, res) => {

    if (req.user?.role !== "admin") {
        res.status(401).json({ message: "Not Admin" });
        return;
    }

    const { title, description, album } = req.body;

    const albumExists = await sql`SELECT * FROM albums WHERE id = ${album} `;

    if (albumExists.length === 0) {
        res.status(404).json({ message: "No album found" });
        return;
    }

    const file = req.file;

    if (!file) {
        res.status(400).json({ message: "No file selected" });
        return;
    }

    const fileBuffer = getBuffer(file);

    if (!fileBuffer || !fileBuffer.content) {
        res.status(500).json({ message: "Failed to generate File Buffer" });
        return;
    }

    const cloud = await cloudinary.v2.uploader.upload(fileBuffer.content, {
        folder: "songs",
        resource_type: "video",
    });

    const result = await sql`
        INSERT INTO songs (title,description,audio,album_id) VALUES 
        (${title},${description},${cloud.secure_url},${album})
    `;


    if (redisClient.isReady) {
        await redisClient.del("songs");
        console.log("Redis cleared");
    }

    res.status(200).json({ message: "Song added" });

});

export const addThumbail = TryCatch(async (req: AuthenticateRequest, res) => {

    if (req.user?.role !== "admin") {
        res.status(401).json({ message: "Not Admin" });
        return;
    }

    const song = await sql`
        SELECT * FROM songs WHERE id = ${req.params.id}
    `;

    if (song.length === 0) {
        res.status(404).json({ message: "No song found" });
        return;
    }


    const file = req.file;

    if (!file) {
        res.status(400).json({ message: "No file selected" });
        return;
    }

    const fileBuffer = getBuffer(file);

    if (!fileBuffer || !fileBuffer.content) {
        res.status(500).json({ message: "Failed to generate File Buffer" });
        return;
    }

    const cloud = await cloudinary.v2.uploader.upload(fileBuffer.content);

    const result = await sql`
        UPDATE songs SET thumbnail = ${cloud.secure_url} WHERE id = ${req.params.id} RETURNING *
    `;

    if (redisClient.isReady) {
        await redisClient.del("songs");
        console.log("Redis cleared");
    }

    res.status(200).json({
        message: "Thumbnail added",
        song: result[0]
    });

});


export const deleteAlbum = TryCatch(async (req: AuthenticateRequest, res) => {

    if (req.user?.role !== "admin") {
        res.status(401).json({ message: "Not Admin" });
        return;
    }

    const { id } = req.params;


    const albumExists = await sql`SELECT * FROM albums WHERE id = ${id} `;

    if (albumExists.length === 0) {
        res.status(404).json({ message: "No album found" });
        return;
    }


    await sql`DELETE FROM songs WHERE album_id = ${id}`;

    await sql`DELETE FROM albums WHERE id = ${id}`;

    if (redisClient.isReady) {
        await redisClient.del("albums");
        console.log("Redis cleared");
    }

    if (redisClient.isReady) {
        await redisClient.del("songs");
        console.log("Redis cleared");
    }

    res.status(200).json({ message: "Album Deleted!" });
});

export const deleteSong = TryCatch(async (req: AuthenticateRequest, res) => {

    if (req.user?.role !== "admin") {
        res.status(401).json({ message: "Not Admin" });
        return;
    }

    const { id } = req.params;

    const songExists = await sql`SELECT * FROM songs WHERE id = ${id} `;

    if (songExists.length === 0) {
        res.status(404).json({ message: "No song found" });
        return;
    }


    await sql`DELETE FROM songs WHERE id = ${id}`;



    if (redisClient.isReady) {
        await redisClient.del("songs");
        console.log("Redis cleared");
    }

    res.status(200).json({ message: "Song Deleted!" });
});