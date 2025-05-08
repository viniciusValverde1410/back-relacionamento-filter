## Contexto da Situação de Aprendizagem

Você foi contratado como desenvolvedor back-end para criar um sistema de gerenciamento para uma coleção de card games de anime. O sistema precisa registrar as coleções que os jogadores possuem e os cards dentro de cada coleção. Uma coleção pode ter vários cards, mas um card específico só pode pertencer a uma única coleção.

O cliente deseja poder:

- Cadastrar, listar, atualizar e remover coleções
- Cadastrar, listar, atualizar e remover cards
- Manter a integridade do sistema (se uma coleção for removida, todos os cards dessa coleção também devem ser removidos automaticamente)

Para implementar o sistema, você usará NodeJS com JavaScript (ES Modules), seguindo o padrão MVC adaptado, e utilizará o Prisma como ORM para interagir com o banco de dados.
