import prisma from "../../prisma/prisma.js";

class CardModel {
  // Obter todas as cartas
  async findAll() {
    const cartas = await prisma.card.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        collection: {
          select: {
            name: true,
            description: true,
            releaseYear: true,
          },
        },
      },
    });

    // console.log(cartas);

    return cartas;
  }

  // Obter uma carta pelo ID
  async findById(id) {
    const carta = await prisma.card.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        collection: true,
      },
    });

    return carta;
  }

  // Criar uma nova carta
  async create(
    name,
    rarity,
    attackPoints,
    defensePoints,
    imageUrl,
    collectionId
  ) {
    const novaCarta = await prisma.card.create({
      data: {
        name,
        rarity,
        attackPoints,
        defensePoints,
        imageUrl,
        collectionId: Number(collectionId),
      },
    });

    return novaCarta;
  }

  // Atualizar uma carta
  async update(
    id,
    name,
    rarity,
    attackPoints,
    defensePoints,
    imageUrl,
    collectionId
  ) {
    const carta = await this.findById(id);

    if (!carta) {
      return null;
    }

    // Atualize a carta existente com os novos dados
    const cartaAtualizada = await prisma.card.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        rarity,
        attackPoints,
        defensePoints,
        imageUrl,
        collectionId: Number(collectionId),
      },
    });

    return cartaAtualizada;
  }

  // Remover uma carta
  async delete(id) {
    const carta = await this.findById(id);

    if (!carta) {
      return null;
    }

    await prisma.card.delete({
      where: {
        id: Number(id),
      },
    });

    return true;
  }
}

export default new CardModel();
