import express from "express";
import PersonagemController from "../controllers/personagemController.js";

const personagensRouter = express.Router();

// Rotas de Personagens
// GET /personagens - Listar todos os Personagens
personagensRouter.get("/", PersonagemController.getAllPersonagens);

// GET /personagens/:id - Obter um Personagem pelo ID
personagensRouter.get("/:id", PersonagemController.getPersonagemById);

// POST /personagens - Criar um novo Personagem
personagensRouter.post("/", PersonagemController.createPersonagem);

// PUT /personagens/:id - Atualizar um Personagem
personagensRouter.put("/:id", PersonagemController.updatePersonagem);

// DELETE /personagens/:id - Remover um Personagem
personagensRouter.delete("/:id", PersonagemController.deletePersonagem);

export default personagensRouter;
