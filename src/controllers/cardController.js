import CardModel from "../models/cardModel.js";

class CardController {
  // GET /cartas
  async getAllCards(req, res) {
    const pagina = req.query.page;
    console.log("pagina", pagina);

    const limite = req.query.limit;
    console.log("limite", limite);

    try {
      const cartas = await CardModel.findAll();
      res.json(cartas);
    } catch (error) {
      console.error("Erro ao buscar as cartas:", error);
      res.status(500).json({ error: "Erro ao buscar as cartas" });
    }
  }

  // GET /cartas/:id
  async getCardById(req, res) {
    try {
      const { id } = req.params;

      const carta = await CardModel.findById(id);

      if (!carta) {
        return res.status(404).json({ error: "Carta não encontrada!" });
      }

      res.json(carta);
    } catch (error) {
      console.error("Erro ao buscar carta:", error);
      res.status(500).json({ error: "Erro ao buscar carta!" });
    }
  }

  // POST /cartas
  async createCard(req, res) {
    try {
      // Captura dos dados do corpo da requisição (frontend)
      const {
        name,
        rarity,
        attackPoints,
        defensePoints,
        imageUrl,
        collectionId,
      } = req.body;

      // Verifica se todos os campos da carta foram fornecidos
      if (
        !name ||
        !rarity ||
        !attackPoints ||
        !defensePoints ||
        !collectionId
      ) {
        return res.status(400).json({
          error:
            "Os campos nome, raridade, pontos de ataque, pontos de defesa e o id da coleção são obrigatórios",
        });
      }

      // Criar a nova Carta
      const newCard = await CardModel.create(
        name,
        rarity,
        attackPoints,
        defensePoints,
        imageUrl,
        collectionId
      );

      if (!newCard) {
        return res.status(400).json({ error: "Erro ao criar carta" });
      }

      res.status(201).json({
        message: "Carta criada com sucesso",
        newCard,
      });
    } catch (error) {
      console.error("Erro ao criar Carta:", error);
      res.status(500).json({ error: "Erro ao criar Carta" });
    }
  }

  // PUT /cartas/:id
  async updateCard(req, res) {
    try {
      const { id } = req.params;
      const {
        name,
        rarity,
        attackPoints,
        defensePoints,
        imageUrl,
        collectionId,
      } = req.body;

      // Atualizar a Carta
      const updatedCard = await CardModel.update(
        id,
        name,
        rarity,
        attackPoints,
        defensePoints,
        imageUrl,
        collectionId
      );

      if (!updatedCard) {
        return res.status(404).json({ error: "Carta não encontrada" });
      }

      res.json(updatedCard);
    } catch (error) {
      console.error("Erro ao atualizar Carta:", error);
      res.status(500).json({ error: "Erro ao atualizar Carta!" });
    }
  }

  // DELETE /cartas/:id
  async deleteCard(req, res) {
    try {
      const { id } = req.params;

      // Remover a Carta
      const result = await CardModel.delete(id);

      if (!result) {
        return res.status(404).json({ error: "Carta não encontrada!" });
      }

      res.status(200).json({
        message: "Carta removida com sucesso",
      });
    } catch (error) {
      console.error("Erro ao remover Carta:", error);
      res.status(500).json({ error: "Erro ao remover Carta!" });
    }
  }
}

export default new CardController();
