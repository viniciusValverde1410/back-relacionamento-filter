# Tutorial: Criando um Backend Node.js para Gerenciamento de Animes

Este tutorial vai te guiar na criação de uma API REST para gerenciar uma coleção de animes, utilizando Node.js com Express. Vamos construir um CRUD completo seguindo uma arquitetura organizada com routes, controllers e models, usando um array em memória para armazenar os dados.

## Capacidades Técnicas Trabalhadas

- Utilizar paradigma da programação orientada a objetos
- Definir os elementos de entrada, processamento e saída para a programação da aplicação web
- Utilizar design patterns no desenvolvimento da aplicação web
- Definir os frameworks a serem utilizados no desenvolvimento da aplicação web
- Desenvolver API (web services) para integração de dados entre plataformas

## Pré-requisitos

- Node.js instalado (versão 18 ou superior)
- Um editor de código (VS Code recomendado)
- Conhecimentos básicos de JavaScript e Node.js

## Vamos começar!

### Passo 1: Inicializar o projeto

Crie uma pasta para o projeto e inicialize:

```bash
mkdir animes-api
cd animes-api
npm init
```

### Passo 2: Instalar dependências

```bash
npm install express nodemon dotenv
```

### Passo 3: Configurar o arquivo package.json

Modifique o arquivo `package.json` para incluir os scripts:

```json
{
  "name": "animes-api",
  "version": "1.0.0",
  "description": "Projeto base de uma API com MVC",
  "keywords": ["nodejs", "javascript", "prisma"],
  "license": "MIT",
  "author": "Felipe Dev",
  "type": "module",
  "main": "src/server.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "nodemon src/server.js"
  },
  "dependencies": {
    "dotenv": "^16.4.7",
    "express": "^5.1.0",
    "nodemon": "^3.1.9"
  }
}
```

### Passo 4: Criar o arquivo .gitignore

Adicionar o seguinte conteúdo ao arquivo `.gitignore`:

```
node_modules
.env
```

### Passo 5: Configurar o ambiente com dotenv

Crie um arquivo `.env` na raiz do projeto:

```
PORT=4000
```

### Passo 6: Criar o servidor Express

Crie o arquivo `src/server.js`:

```javascript
import express from "express";
import { config } from "dotenv";

config(); // Carrega variáveis de ambiente do arquivo .env
const port = process.env.PORT || 3000;

// Inicializa o Express
const app = express();

app.use(express.json()); // Parse de JSON

// Rota base para verificar se o servidor está rodando
app.get("/", (req, res) => {
  res.json({ message: "API de Coleção de Animes funcionando!" });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
```

### Passo 7: Criar o modelo Anime (usando array em memória)

Crie o arquivo `src/models/animeModel.js`:

```javascript
// Array para armazenar os animes em memória
let animes = [
  {
    id: 1,
    title: "Attack on Titan",
    description: "Humanidade lutando contra titãs em um mundo pós-apocalíptico",
    episodes: 75,
    releaseYear: 2013,
    studio: "MAPPA",
    genres: "Ação,Drama,Fantasia",
    rating: 4.8,
    imageUrl: "https://example.com/aot.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    title: "My Hero Academia",
    description:
      "Em um mundo onde quase todos possuem superpoderes, um garoto sem poderes luta para se tornar um herói",
    episodes: 113,
    releaseYear: 2016,
    studio: "Bones",
    genres: "Ação,Comédia,Super-heróis",
    rating: 4.6,
    imageUrl: "https://example.com/mha.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// Variável para controlar o próximo ID
let nextId = 3;

class AnimeModel {
  // Obter todos os animes
  findAll() {
    return animes;
  }

  // Obter um anime pelo ID
  findById(id) {
    return animes.find((anime) => anime.id === Number(id)) || null;
  }

  // Criar um novo anime
  create(
    title,
    description,
    episodes,
    releaseYear,
    studio,
    genres,
    rating,
    imageUrl
  ) {
    const newAnime = {
      id: nextId++,
      title,
      description,
      episodes,
      releaseYear,
      studio,
      genres,
      rating,
      imageUrl,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    animes.push(newAnime);
    return newAnime;
  }

  // Atualizar um anime
  update(
    id,
    title,
    description,
    episodes,
    releaseYear,
    studio,
    genres,
    rating,
    imageUrl
  ) {
    const anime = this.findById(id);

    if (!anime) {
      return null;
    }

    // Atualize o anime existente com os novos dados
    anime.title = title || anime.title;
    anime.description = description || anime.description;
    anime.episodes = episodes || anime.episodes;
    anime.releaseYear = releaseYear || anime.releaseYear;
    anime.studio = studio || anime.studio;
    anime.genres = genres || anime.genres;
    anime.rating = rating || anime.rating;
    anime.imageUrl = imageUrl || anime.imageUrl;
    anime.updatedAt = new Date(); // Atualiza a data de modificação

    return anime;
  }

  // Remover um anime
  delete(id) {
    const anime = this.findById(id);
    if (!anime) {
      return null;
    }

    // Filtra o anime a ser removido
    animes = animes.filter((anime) => anime.id !== Number(id));

    return true;
  }
}

export default new AnimeModel();
```

### Passo 8: Criar o controlador de Animes

Crie o arquivo `src/controllers/animeController.js`:

```javascript
import AnimeModel from "../models/animeModel.js";

class AnimeController {
  // GET /api/animes
  getAllAnimes(req, res) {
    try {
      const animes = AnimeModel.findAll();
      res.json(animes);
    } catch (error) {
      console.error("Erro ao buscar animes:", error);
      res.status(500).json({ error: "Erro ao buscar animes" });
    }
  }

  // GET /api/animes/:id
  getAnimeById(req, res) {
    try {
      const { id } = req.params;

      const anime = AnimeModel.findById(id);

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
  createAnime(req, res) {
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
      const newAnime = AnimeModel.create(
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
  updateAnime(req, res) {
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
      const updatedAnime = AnimeModel.update(
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
  deleteAnime(req, res) {
    try {
      const { id } = req.params;

      // Remover o anime
      const result = AnimeModel.delete(id);

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
```

### Passo 9: Criar as rotas

Crie o arquivo `src/routes/animeRoutes.js`:

```javascript
import express from "express";
import AnimeController from "../controllers/animeController.js";

const router = express.Router();

// Rotas de Animes
// GET /api/animes - Listar todos os animes
router.get("/", AnimeController.getAllAnimes);

// GET /api/animes/:id - Obter um anime pelo ID
router.get("/:id", AnimeController.getAnimeById);

// POST /api/animes - Criar um novo anime
router.post("/", AnimeController.createAnime);

// PUT /api/animes/:id - Atualizar um anime
router.put("/:id", AnimeController.updateAnime);

// DELETE /api/animes/:id - Remover um anime
router.delete("/:id", AnimeController.deleteAnime);

export default router;
```

### Passo 10: Iniciar o servidor

```bash
npm run dev
```

## Testando a API

Agora você pode testar o CRUD completo usando ferramentas como Postman, Insomnia ou Thunder Client:

### 1. Criar um anime (POST /api/animes)

```json
{
  "title": "Naruto Shippuden",
  "description": "Naruto Uzumaki retorna após três anos de treinamento para enfrentar a Akatsuki",
  "episodes": 500,
  "releaseYear": 2007,
  "studio": "Pierrot",
  "genres": "Ação,Aventura,Comédia,Shounen",
  "rating": 4.8,
  "imageUrl": "https://example.com/naruto.jpg"
}
```

### 2. Listar todos os animes (GET /api/animes)

### 3. Obter um anime específico (GET /api/animes/:id)

### 4. Atualizar um anime (PUT /api/animes/:id)

```json
{
  "episodes": 502,
  "rating": 4.9
}
```

### 5. Remover um anime (DELETE /api/animes/:id)

## Explicação do Projeto

Neste projeto, seguimos algumas boas práticas de desenvolvimento:

1. **Arquitetura MVC (Model-View-Controller)**:

   - Models: Encapsulam a lógica de acesso aos dados (em memória nesse caso)
   - Controllers: Gerenciam a lógica de negócios
   - (Sem Views, pois é uma API)

2. **Organização de código**:

   - Estrutura de pastas bem definida
   - Separação de responsabilidades
   - Código modular e reutilizável

3. **Armazenamento em memória**:

   - Utilização de arrays para armazenar dados temporários
   - Gestão de IDs para garantir unicidade
   - Simulação de operações assíncronas (async/await) para facilitar expansão futura

4. **Tratamento de erros**:

   - Try/catch blocks para lidar com exceções
   - Respostas de erro padronizadas

5. **Validação de dados**:
   - Validação básica implementada nos controllers
   - Pode ser aprimorada com bibliotecas como Joi ou Zod

## Adaptando o Projeto para Usar o Prisma ORM

Vamos transformar nosso projeto para utilizar o Prisma ORM para persistência de dados em um banco de dados real, ao invés de usar o armazenamento em memória.

### Passo 1: Instalar o Prisma

```bash
# Instalar o Prisma CLI e o cliente Prisma
npm install prisma @prisma/client
```

### Passo 2: Inicializar o Prisma

```bash
npx prisma init
```

Este comando cria:

- Uma pasta `prisma` com um arquivo `schema.prisma`
- Um arquivo `.env` para configuração da conexão com o banco de dados

### Passo 3: Configurar o banco de dados

Edite o arquivo `.env` para adicionar a URL de conexão com o banco de dados:

```env
PORT=4000

# Para SQLite
DATABASE_URL="file:./dev.db"

# Ou Para PostgreSQL
# DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/animes?schema=public"
```

Neste exemplo, estamos usando SQLite para facilitar o desenvolvimento, mas em um ambiente de produção, você provavelmente usaria PostgreSQL, MySQL ou MongoDB.

### Passo 4: Definir o modelo no Prisma

Edite o arquivo `prisma/schema.prisma`:

```prisma
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

model Anime {
  id          Int      @id @default(autoincrement())
  title       String
  description String?
  episodes    Int
  releaseYear Int
  studio      String
  genres      String
  rating      Float
  imageUrl    String
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

### Passo 5: Criar a instância do cliente Prisma

Crie o arquivo `prisma/prisma.js`:

```javascript
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default prisma;
```

### Passo 6: Executar a migração do banco de dados

```bash
npx prisma migrate dev
```

### Passo 7: Adaptar o modelo Anime

Substitua o código do arquivo `src/models/animeModel.js` pelo seguinte:

```javascript
import prisma from "../../prisma/prisma.js";

class AnimeModel {
  // Obter todos os animes
  async findAll() {
    const animes = await prisma.anime.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    console.log(animes);

    return animes;
  }

  // Obter um anime pelo ID
  async findById(id) {
    const anime = await prisma.anime.findUnique({
      where: {
        id: Number(id),
      },
    });

    return anime;
  }

  // Criar um novo anime
  async create(
    title,
    description,
    episodes,
    releaseYear,
    studio,
    genres,
    rating,
    imageUrl
  ) {
    const newAnime = await prisma.anime.create({
      data: {
        title,
        description,
        episodes,
        releaseYear,
        studio,
        genres,
        rating,
        imageUrl,
      },
    });

    return newAnime;
  }

  // Atualizar um anime
  async update(
    id,
    title,
    description,
    episodes,
    releaseYear,
    studio,
    genres,
    rating,
    imageUrl
  ) {
    const anime = await this.findById(id);

    if (!anime) {
      return null;
    }

    // Atualize o anime existente com os novos dados
    const data = {};
    if (title !== undefined) {
      data.title = title;
    }
    if (description !== undefined) {
      data.description = description;
    }
    if (episodes !== undefined) {
      data.episodes = episodes;
    }
    if (releaseYear !== undefined) {
      data.releaseYear = releaseYear;
    }
    if (studio !== undefined) {
      data.studio = studio;
    }
    if (genres !== undefined) {
      data.genres = genres;
    }
    if (rating !== undefined) {
      data.rating = rating;
    }
    if (imageUrl !== undefined) {
      data.imageUrl = imageUrl;
    }

    const animeUpdated = await prisma.anime.update({
      where: {
        id: Number(id),
      },
      data,
    });

    return animeUpdated;
  }

  // Remover um anime
  async delete(id) {
    const anime = await this.findById(id);

    if (!anime) {
      return null;
    }

    await prisma.anime.delete({
      where: {
        id: Number(id),
      },
    });

    return true;
  }
}

export default new AnimeModel();
```

### Passo 8: Adaptar o controller para trabalhar com operações assíncronas

Modifique o arquivo `src/controllers/animeController.js` para trabalhar com as operações assíncronas do Prisma:

```javascript
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
```

### Passo 9: Atualizar o servidor para usar as rotas

Atualize o arquivo `src/server.js`:

```javascript
import express from "express";
import { config } from "dotenv";
import animeRoutes from "./routes/animeRoutes.js";

config(); // Carrega variáveis de ambiente do arquivo .env
const port = process.env.PORT || 3000;

// Inicializa o Express
const app = express();

app.use(express.json()); // Parse de JSON

// Rota base para verificar se o servidor está rodando
app.get("/", (req, res) => {
  res.json({ message: "API de Coleção de Animes funcionando!" });
});

// Usar as rotas de animes
app.use("/animes", animeRoutes);

// Tratamento para encerrar o servidor e fechar conexões corretamente
const server = app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
```

## Vantagens de Usar o Prisma ORM

A principal diferença entre o projeto original e este com Prisma é:

1. **Persistência de dados**: Os dados não são mais perdidos quando o servidor é reiniciado
2. **Operações assíncronas reais**: As operações de banco de dados são assíncronas por natureza
3. **Segurança e validação**: O Prisma ajuda a prevenir injeção de SQL e validar tipos de dados
4. **Escalabilidade**: O projeto pode agora ser escalado para múltiplas instâncias do servidor
5. **Migrations**: O Prisma gerencia as alterações no schema do banco de dados

## Próximos Passos

Algumas melhorias que você pode adicionar ao projeto:

1. **Relações entre modelos**: Adicionar modelos relacionados como Gêneros, Estúdios, etc.
2. **Autenticação e autorização**: Implementar JWT para proteger as rotas
3. **Paginação e filtros**: Melhorar a rota de listagem com opções de paginação e filtros
4. **Validação avançada**: Usar bibliotecas como Joi ou Zod para validação mais robusta
5. **Testes automatizados**: Adicionar testes unitários e de integração
6. **Logging**: Implementar um sistema de log mais robusto
7. **Documentação da API**: Adicionar Swagger ou similar para documentar a API

Agora você tem uma API REST completa com persistência de dados usando Node.js, Express e Prisma ORM!

```

```
