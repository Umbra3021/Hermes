import express from "express";
import uploadFile, { Auth } from "./Middleware.js";
import { addAlbum, addSong, addThumbail, deleteAlbum, deleteSong } from "./controller.js";


const router = express.Router();

router.post("/album/new", Auth, uploadFile, addAlbum);
router.post("/song/new", Auth, uploadFile, addSong);
router.post("/song/:id", Auth, uploadFile, addThumbail);
router.delete("/album/:id", Auth, deleteAlbum);
router.delete("/song/:id", Auth, deleteSong);

export default router;