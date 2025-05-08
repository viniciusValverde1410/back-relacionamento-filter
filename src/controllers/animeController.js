import AnimeModel from "../models/animeModel.js";

class AnimeController {
  // GET /api/animes
  async getAllAnimes(req, res) {
    try {
      const animes = await AnimeModel.findAll();
      res.json(animes);
    } catch (error) {
      console.error("Erro ao buscar animes:", error);
      res.status(500).json({ error: "Erro ao buscar animes" });
    }
  }

  // GET /api/animes/:id
  async getAnimeById(req, res) {
    try {
      const { id } = req.params;

      const anime = await AnimeModel.findById(id);

      if (!anime) {
        return res.status(404).json({ error: "Anime não encontrado" });
      }

      res.json(anime);
    } catch (error) {
      console.error("Erro ao buscar anime:", error);
      res.status(500).json({ error: "Erro ao buscar anime" });
    }
  }

  // POST /api/animes
  async createAnime(req, res) {
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

      // Verifica se o título do anime foi fornecido

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

      // Criar o novo anime
      const newAnime = await AnimeModel.create(
        title,
        description,
        episodes,
        releaseYear,
        studio,
        genres,
        rating,
        imageUrl
      );

      if (!newAnime) {
        return res.status(400).json({ error: "Erro ao criar anime" });
      }

      res.status(201).json(newAnime);
    } catch (error) {
      console.error("Erro ao criar anime:", error);
      res.status(500).json({ error: "Erro ao criar anime" });
    }
  }

  // PUT /api/animes/:id
  async updateAnime(req, res) {
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

      // Atualizar o anime
      const updatedAnime = await AnimeModel.update(
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

      if (!updatedAnime) {
        return res.status(404).json({ error: "Anime não encontrado" });
      }

      res.json(updatedAnime);
    } catch (error) {
      console.error("Erro ao atualizar anime:", error);
      res.status(500).json({ error: "Erro ao atualizar anime" });
    }
  }

  // DELETE /api/animes/:id
  async deleteAnime(req, res) {
    try {
      const { id } = req.params;

      // Remover o anime
      const result = await AnimeModel.delete(id);

      if (!result) {
        return res.status(404).json({ error: "Anime não encontrado" });
      }

      res.status(204).end(); // Resposta sem conteúdo
    } catch (error) {
      console.error("Erro ao remover anime:", error);
      res.status(500).json({ error: "Erro ao remover anime" });
    }
  }
}

export default new AnimeController();
