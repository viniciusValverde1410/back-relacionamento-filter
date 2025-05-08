import express from "express";
import AnimeController from "../controllers/animeController.js";

const animesRouter = express.Router();

// Rotas de Animes
// GET /api/animes - Listar todos os animes
animesRouter.get("/", AnimeController.getAllAnimes);

// GET /api/animes/:id - Obter um anime pelo ID
animesRouter.get("/:id", AnimeController.getAnimeById);

// POST /api/animes - Criar um novo anime
animesRouter.post("/", AnimeController.createAnime);

// PUT /api/animes/:id - Atualizar um anime
animesRouter.put("/:id", AnimeController.updateAnime);

// DELETE /api/animes/:id - Remover um anime
animesRouter.delete("/:id", AnimeController.deleteAnime);

export default animesRouter;
