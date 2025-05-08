import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.log("Iniciando o seed...");

  await prisma.card.deleteMany({});
  await prisma.collection.deleteMany({});

  // Criar coleções de diferentes temáticas
  const nbaLegends = await prisma.collection.create({
    data: {
      name: "NBA Legends",
      description: "Jogadores lendários da história do basquete da NBA",
      releaseYear: 2023,
    },
  });

  const rockBands = await prisma.collection.create({
    data: {
      name: "Classic Rock",
      description: "Bandas clássicas do rock mundial",
      releaseYear: 2022,
    },
  });

  const worldMonuments = await prisma.collection.create({
    data: {
      name: "World Monuments",
      description: "Monumentos históricos famosos ao redor do mundo",
      releaseYear: 2021,
    },
  });

  const dinosaurs = await prisma.collection.create({
    data: {
      name: "Prehistoric Giants",
      description: "Dinossauros que habitaram a Terra há milhões de anos",
      releaseYear: 2023,
    },
  });

  const videogameConsoles = await prisma.collection.create({
    data: {
      name: "Gaming History",
      description: "Consoles de videogame que marcaram gerações",
      releaseYear: 2022,
    },
  });

  console.log("Coleções criadas. Inserindo cards...");

  // Cards para NBA Legends
  const nbaCards = await Promise.all([
    prisma.card.create({
      data: {
        name: "Michael Jordan",
        rarity: "Ultra Rare",
        attackPoints: 9800,
        defensePoints: 9200,
        imageUrl: "https://example.com/jordan.jpg",
        collectionId: nbaLegends.id,
      },
    }),
    prisma.card.create({
      data: {
        name: "LeBron James",
        rarity: "Ultra Rare",
        attackPoints: 9700,
        defensePoints: 9500,
        imageUrl: "https://example.com/lebron.jpg",
        collectionId: nbaLegends.id,
      },
    }),
    prisma.card.create({
      data: {
        name: "Kobe Bryant",
        rarity: "Ultra Rare",
        attackPoints: 9600,
        defensePoints: 9300,
        imageUrl: "https://example.com/kobe.jpg",
        collectionId: nbaLegends.id,
      },
    }),
    prisma.card.create({
      data: {
        name: "Magic Johnson",
        rarity: "Super Rare",
        attackPoints: 9400,
        defensePoints: 8700,
        imageUrl: "https://example.com/magic.jpg",
        collectionId: nbaLegends.id,
      },
    }),
    prisma.card.create({
      data: {
        name: "Larry Bird",
        rarity: "Super Rare",
        attackPoints: 9300,
        defensePoints: 8800,
        imageUrl: "https://example.com/bird.jpg",
        collectionId: nbaLegends.id,
      },
    }),
    prisma.card.create({
      data: {
        name: "Shaquille O'Neal",
        rarity: "Super Rare",
        attackPoints: 9500,
        defensePoints: 9400,
        imageUrl: "https://example.com/shaq.jpg",
        collectionId: nbaLegends.id,
      },
    }),
    prisma.card.create({
      data: {
        name: "Stephen Curry",
        rarity: "Rare",
        attackPoints: 9200,
        defensePoints: 8500,
        imageUrl: "https://example.com/curry.jpg",
        collectionId: nbaLegends.id,
      },
    }),
    prisma.card.create({
      data: {
        name: "Kevin Durant",
        rarity: "Rare",
        attackPoints: 9300,
        defensePoints: 8600,
        imageUrl: "https://example.com/durant.jpg",
        collectionId: nbaLegends.id,
      },
    }),
  ]);

  // Cards para Classic Rock
  const rockCards = await Promise.all([
    prisma.card.create({
      data: {
        name: "Queen",
        rarity: "Ultra Rare",
        attackPoints: 9600,
        defensePoints: 9200,
        imageUrl: "https://example.com/queen.jpg",
        collectionId: rockBands.id,
      },
    }),
    prisma.card.create({
      data: {
        name: "Led Zeppelin",
        rarity: "Ultra Rare",
        attackPoints: 9700,
        defensePoints: 9100,
        imageUrl: "https://example.com/ledzeppelin.jpg",
        collectionId: rockBands.id,
      },
    }),
    prisma.card.create({
      data: {
        name: "Pink Floyd",
        rarity: "Ultra Rare",
        attackPoints: 9500,
        defensePoints: 9300,
        imageUrl: "https://example.com/pinkfloyd.jpg",
        collectionId: rockBands.id,
      },
    }),
    prisma.card.create({
      data: {
        name: "The Beatles",
        rarity: "Ultra Rare",
        attackPoints: 9800,
        defensePoints: 9400,
        imageUrl: "https://example.com/beatles.jpg",
        collectionId: rockBands.id,
      },
    }),
    prisma.card.create({
      data: {
        name: "AC/DC",
        rarity: "Super Rare",
        attackPoints: 9300,
        defensePoints: 8800,
        imageUrl: "https://example.com/acdc.jpg",
        collectionId: rockBands.id,
      },
    }),
    prisma.card.create({
      data: {
        name: "The Rolling Stones",
        rarity: "Super Rare",
        attackPoints: 9400,
        defensePoints: 9000,
        imageUrl: "https://example.com/rollingstones.jpg",
        collectionId: rockBands.id,
      },
    }),
    prisma.card.create({
      data: {
        name: "Guns N' Roses",
        rarity: "Rare",
        attackPoints: 9100,
        defensePoints: 8700,
        imageUrl: "https://example.com/gunsnroses.jpg",
        collectionId: rockBands.id,
      },
    }),
    prisma.card.create({
      data: {
        name: "Metallica",
        rarity: "Rare",
        attackPoints: 9200,
        defensePoints: 8900,
        imageUrl: "https://example.com/metallica.jpg",
        collectionId: rockBands.id,
      },
    }),
  ]);

  // Cards para World Monuments
  const monumentCards = await Promise.all([
    prisma.card.create({
      data: {
        name: "Eiffel Tower",
        rarity: "Ultra Rare",
        attackPoints: 8800,
        defensePoints: 9500,
        imageUrl: "https://example.com/eiffel.jpg",
        collectionId: worldMonuments.id,
      },
    }),
    prisma.card.create({
      data: {
        name: "Great Wall of China",
        rarity: "Ultra Rare",
        attackPoints: 8500,
        defensePoints: 9800,
        imageUrl: "https://example.com/greatwall.jpg",
        collectionId: worldMonuments.id,
      },
    }),
    prisma.card.create({
      data: {
        name: "Taj Mahal",
        rarity: "Ultra Rare",
        attackPoints: 8700,
        defensePoints: 9600,
        imageUrl: "https://example.com/tajmahal.jpg",
        collectionId: worldMonuments.id,
      },
    }),
    prisma.card.create({
      data: {
        name: "Pyramids of Giza",
        rarity: "Ultra Rare",
        attackPoints: 8600,
        defensePoints: 9900,
        imageUrl: "https://example.com/pyramids.jpg",
        collectionId: worldMonuments.id,
      },
    }),
    prisma.card.create({
      data: {
        name: "Colosseum",
        rarity: "Super Rare",
        attackPoints: 8400,
        defensePoints: 9300,
        imageUrl: "https://example.com/colosseum.jpg",
        collectionId: worldMonuments.id,
      },
    }),
    prisma.card.create({
      data: {
        name: "Statue of Liberty",
        rarity: "Super Rare",
        attackPoints: 8300,
        defensePoints: 9200,
        imageUrl: "https://example.com/liberty.jpg",
        collectionId: worldMonuments.id,
      },
    }),
    prisma.card.create({
      data: {
        name: "Stonehenge",
        rarity: "Rare",
        attackPoints: 8000,
        defensePoints: 9400,
        imageUrl: "https://example.com/stonehenge.jpg",
        collectionId: worldMonuments.id,
      },
    }),
    prisma.card.create({
      data: {
        name: "Machu Picchu",
        rarity: "Rare",
        attackPoints: 8200,
        defensePoints: 9100,
        imageUrl: "https://example.com/machupicchu.jpg",
        collectionId: worldMonuments.id,
      },
    }),
  ]);

  // Cards para Prehistoric Giants
  const dinosaurCards = await Promise.all([
    prisma.card.create({
      data: {
        name: "Tyrannosaurus Rex",
        rarity: "Ultra Rare",
        attackPoints: 9900,
        defensePoints: 8800,
        imageUrl: "https://example.com/trex.jpg",
        collectionId: dinosaurs.id,
      },
    }),
    prisma.card.create({
      data: {
        name: "Velociraptor",
        rarity: "Super Rare",
        attackPoints: 9400,
        defensePoints: 8300,
        imageUrl: "https://example.com/velociraptor.jpg",
        collectionId: dinosaurs.id,
      },
    }),
    prisma.card.create({
      data: {
        name: "Brachiosaurus",
        rarity: "Super Rare",
        attackPoints: 8500,
        defensePoints: 9700,
        imageUrl: "https://example.com/brachiosaurus.jpg",
        collectionId: dinosaurs.id,
      },
    }),
    prisma.card.create({
      data: {
        name: "Triceratops",
        rarity: "Super Rare",
        attackPoints: 8700,
        defensePoints: 9600,
        imageUrl: "https://example.com/triceratops.jpg",
        collectionId: dinosaurs.id,
      },
    }),
    prisma.card.create({
      data: {
        name: "Stegosaurus",
        rarity: "Rare",
        attackPoints: 8400,
        defensePoints: 9500,
        imageUrl: "https://example.com/stegosaurus.jpg",
        collectionId: dinosaurs.id,
      },
    }),
    prisma.card.create({
      data: {
        name: "Spinosaurus",
        rarity: "Ultra Rare",
        attackPoints: 9800,
        defensePoints: 8700,
        imageUrl: "https://example.com/spinosaurus.jpg",
        collectionId: dinosaurs.id,
      },
    }),
    prisma.card.create({
      data: {
        name: "Ankylosaurus",
        rarity: "Rare",
        attackPoints: 8200,
        defensePoints: 9800,
        imageUrl: "https://example.com/ankylosaurus.jpg",
        collectionId: dinosaurs.id,
      },
    }),
    prisma.card.create({
      data: {
        name: "Pteranodon",
        rarity: "Rare",
        attackPoints: 9100,
        defensePoints: 8000,
        imageUrl: "https://example.com/pteranodon.jpg",
        collectionId: dinosaurs.id,
      },
    }),
  ]);

  // Cards para Gaming History
  const consoleCards = await Promise.all([
    prisma.card.create({
      data: {
        name: "Atari 2600",
        rarity: "Ultra Rare",
        attackPoints: 7500,
        defensePoints: 8000,
        imageUrl: "https://example.com/atari.jpg",
        collectionId: videogameConsoles.id,
      },
    }),
    prisma.card.create({
      data: {
        name: "Nintendo NES",
        rarity: "Ultra Rare",
        attackPoints: 8200,
        defensePoints: 8300,
        imageUrl: "https://example.com/nes.jpg",
        collectionId: videogameConsoles.id,
      },
    }),
    prisma.card.create({
      data: {
        name: "Sega Genesis",
        rarity: "Super Rare",
        attackPoints: 8100,
        defensePoints: 8200,
        imageUrl: "https://example.com/genesis.jpg",
        collectionId: videogameConsoles.id,
      },
    }),
    prisma.card.create({
      data: {
        name: "Super Nintendo",
        rarity: "Super Rare",
        attackPoints: 8300,
        defensePoints: 8400,
        imageUrl: "https://example.com/snes.jpg",
        collectionId: videogameConsoles.id,
      },
    }),
    prisma.card.create({
      data: {
        name: "PlayStation 1",
        rarity: "Rare",
        attackPoints: 8400,
        defensePoints: 8500,
        imageUrl: "https://example.com/ps1.jpg",
        collectionId: videogameConsoles.id,
      },
    }),
    prisma.card.create({
      data: {
        name: "Nintendo 64",
        rarity: "Rare",
        attackPoints: 8400,
        defensePoints: 8300,
        imageUrl: "https://example.com/n64.jpg",
        collectionId: videogameConsoles.id,
      },
    }),
    prisma.card.create({
      data: {
        name: "Xbox",
        rarity: "Common",
        attackPoints: 8600,
        defensePoints: 8700,
        imageUrl: "https://example.com/xbox.jpg",
        collectionId: videogameConsoles.id,
      },
    }),
    prisma.card.create({
      data: {
        name: "PlayStation 2",
        rarity: "Common",
        attackPoints: 8700,
        defensePoints: 8800,
        imageUrl: "https://example.com/ps2.jpg",
        collectionId: videogameConsoles.id,
      },
    }),
  ]);

  console.log(
    `Seed concluído! Criadas ${await prisma.collection.count()} coleções e ${await prisma.card.count()} cards.`
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });