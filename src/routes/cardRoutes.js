import express from "express";
import CardController from "../controllers/cardController.js";

const cardRouter = express.Router();

// Rotas de Cartas
// GET /cartas - Listar todas as Cartas
cardRouter.get("/", CardController.getAllCards);

// GET /cartas/:id - Obter uma Carta pelo ID
cardRouter.get("/:id", CardController.getCardById);

// POST /cartas - Criar uma nova Carta
cardRouter.post("/", CardController.createCard);

// PUT /cartas/:id - Atualizar uma Carta
cardRouter.put("/:id", CardController.updateCard);

// DELETE /cartas/:id - Remover uma Carta
cardRouter.delete("/:id", CardController.deleteCard);

export default cardRouter;
