import { sql } from "./config/DB.js";
import TryCatch from "./TryCatch.js";
import { redisClient } from './index.js';

export const getAlbum = TryCatch(async (req, res) => {
    let albums;

    const cache_Expiry = 1800; // 30mins

    if (redisClient.isReady) {
        albums = await redisClient.get("albums");

        if (albums) {
            res.json(JSON.parse(albums));
            return;
        }
        else {

            albums = await sql`SELECT * FROM albums`;
            if (redisClient.isReady) {
                await redisClient.set("albums", JSON.stringify(albums), {
                    EX: cache_Expiry,
                });
            }

            res.json(albums);


        }
    }


});


export const getSong = TryCatch(async (req, res) => {
    let songs;

    const cache_Expiry = 1800; // 30mins

    if (redisClient.isReady) {
        console.log("Redis hit");

        songs = await redisClient.get("songs");

        if (songs) {
            res.json(JSON.parse(songs));
            return;

        }

        else {

            console.log("Redis miss");

            songs = await sql`SELECT * FROM songs`;

            if (redisClient.isReady) {
                await redisClient.set("songs", JSON.stringify(songs), {
                    EX: cache_Expiry,
                });
            }


            res.json(songs);
        }
    }



});

export const allAlbumSongs = TryCatch(async (req, res) => {
    const { id } = req.params;

    let albums, songs;

    const cache_Expiry = 1800; // 30mins

    if (redisClient.isReady) {
        const cacheData = await redisClient.get(`albumSongs_${id}`);

        if (cacheData) {
            console.log("Redis hit");

            res.json(JSON.parse(cacheData));
            return;

        }
    }

    else {

    }

    albums = await sql`SELECT * FROM albums WHERE id = ${id}`;

    if (albums.length === 0) {
        res.status(404).json({
            message: "No albums found"
        });
        return;
    }

    songs = await sql`SELECT * FROM songs WHERE album_id = ${id}`;

    const result = { songs, albums: albums[0] };

    if (redisClient.isReady) {
        await redisClient.set(`albumSongs_${id}`, JSON.stringify(result), {
            EX: cache_Expiry,
        });
    }

    console.log("Redis miss");


    res.json(result);

});

export const SingleSong = TryCatch(async (req, res) => {
    console.log("Single song route hit");
    const song = await sql`SELECT * FROM songs WHERE id = ${req.params.id}`;

    res.json(song[0]);
})  