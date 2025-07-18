import express from "express";
import { allAlbumSongs, getAlbum, getSong, SingleSong } from "./controller.js";

const router = express.Router();

router.get("/albums/all", getAlbum);
router.get("/songs/all", getSong);
router.get("/albums/:id", allAlbumSongs);
router.get("/songs/:id", SingleSong);

export default router;