import { sql } from "./config/DB.js";
import TryCatch from "./TryCatch.js";

export const getAlbum = TryCatch(async (req, res) => {
    let albums;

    albums = await sql`SELECT * FROM albums`;

    res.json(albums);
});


export const getSong = TryCatch(async (req, res) => {
    let songs;

    songs = await sql`SELECT * FROM songs`;

    res.json(songs);
});

export const allAlbumSongs = TryCatch(async (req, res) => {
    const { id } = req.params;

    let albums, songs;

    albums = await sql`SELECT * FROM albums WHERE id = ${id}`;

    if (albums.length === 0) {
        res.status(404).json({
            message: "No albums found"
        });
        return;
    }

    songs = await sql`SELECT * FROM songs WHERE albums_id = ${id}`;

    const result = { songs, albums: albums[0] };

    res.json(result);

});

export const SingleSong = TryCatch(async (req, res) => {
    const song = await sql`SELECT * FROM songs WHERE id ${req.params.id}`;

    res.json(song);
})