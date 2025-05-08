import PersonagemModel from "../models/personagemModel.js";

class PersonagemController {
  // GET /api/personagens
  async getAllPersonagens(req, res) {
    try {
      const personagens = await PersonagemModel.findAll();
      res.json(personagens);
    } catch (error) {
      console.error("Erro ao buscar personagens:", error);
      res.status(500).json({ error: "Erro ao buscar personagens" });
    }
  }

  // GET /api/personagens/:id
  async getPersonagemById(req, res) {
    try {
      const { id } = req.params;

      const personagem = await PersonagemModel.findById(id);

      if (!personagem) {
        return res.status(404).json({ error: "Personagem não encontrado" });
      }

      res.json(personagem);
    } catch (error) {
      console.error("Erro ao buscar personagem:", error);
      res.status(500).json({ error: "Erro ao buscar personagem" });
    }
  }

  // POST /api/personagens
  async createPersonagem(req, res) {
    try {
      // Validação básica
      const {
        title,
        description,
        episodes,
        releaseYear,
        studio,
        genres,
        rating,
        imageUrl,
      } = req.body;

      // Verifica se todos os campos do personagem foram fornecidos
      if (
        !title ||
        !description ||
        !episodes ||
        !releaseYear ||
        !studio ||
        !genres ||
        !rating ||
        !imageUrl
      ) {
        return res
          .status(400)
          .json({ error: "Todos os campos são obrigatórios" });
      }

      // Criar o novo personagem
      const newPersonagem = await PersonagemModel.create(
        title,
        description,
        episodes,
        releaseYear,
        studio,
        genres,
        rating,
        imageUrl
      );

      if (!newPersonagem) {
        return res.status(400).json({ error: "Erro ao criar personagem" });
      }

      res.status(201).json(newPersonagem);
    } catch (error) {
      console.error("Erro ao criar personagem:", error);
      res.status(500).json({ error: "Erro ao criar personagem" });
    }
  }

  // PUT /api/personagens/:id
  async updatePersonagem(req, res) {
    try {
      const { id } = req.params;
      const {
        title,
        description,
        episodes,
        releaseYear,
        studio,
        genres,
        rating,
        imageUrl,
      } = req.body;

      // Atualizar o personagem
      const updatedPersonagem = await PersonagemModel.update(
        id,
        title,
        description,
        episodes,
        releaseYear,
        studio,
        genres,
        rating,
        imageUrl
      );

      if (!updatedPersonagem) {
        return res.status(404).json({ error: "Personagem não encontrado" });
      }

      res.json(updatedPersonagem);
    } catch (error) {
      console.error("Erro ao atualizar personagem:", error);
      res.status(500).json({ error: "Erro ao atualizar personagem" });
    }
  }

  // DELETE /api/personagens/:id
  async deletePersonagem(req, res) {
    try {
      const { id } = req.params;

      // Remover o personagem
      const result = await PersonagemModel.delete(id);

      if (!result) {
        return res.status(404).json({ error: "Personagem não encontrado" });
      }

      res.status(204).end(); // Resposta sem conteúdo
    } catch (error) {
      console.error("Erro ao remover personagem:", error);
      res.status(500).json({ error: "Erro ao remover personagem" });
    }
  }
}

export default new PersonagemController();
