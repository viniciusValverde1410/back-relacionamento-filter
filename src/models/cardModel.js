  import prisma from "../../prisma/prisma.js";

        // where: { 
        //   attackPoints: {
        //     gte: Number(ataque),
        //   },
        //   rarity: raridade ,
        // },
        // where: { 
        //   attackPoints: { gte: 8000 , lte: 9000, }, 
        //   rarity: "Ultra Rare",
        // }, gte maior ou igual, lte menor ou igual

  class CardModel {
    // Obter todas as cartas
    async findAll(raridade, ataque, pagina, limite) {

      if (Number(pagina) < 1) {
        pagina = 1;
      }

      if (Number(limite) < 1 || Number(limite) > 100) {
        limite = 10;
      }

      const skip = (Number(pagina) - 1) * Number(limite);
      // quantos dados eu estou deixando de exibir, quantos eu estou deixando para trás

      const where = {}

      if (raridade) {
        where.rarity = raridade;
      }
      if (ataque) {
        where.attackPoints = get(Number(ataque));
      }

      const cartas = await prisma.card.findMany({ 
        skip,
        take: Number(limite),
        where,
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

    const total = await prisma.card.count({ where });   
    const totalExibido = cartas.length;  

      // console.log(cartas);

      return {totalExibido , total , cartas};
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
