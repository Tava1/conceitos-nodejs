const express = require("express");
const cors = require("cors");

const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  response.json(repositories);
});

app.post("/repositories", (request, response) => {

  const { title, url, techs } = request.body;

  // Criando um novo projeto para inserir no array
  const repository = { id: uuid(), title, url, techs, likes: 0 }

  repositories.push(repository);

  response.json(repository);

});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  // buscar o repositorio no array, findIndex para retornar a posicao do elemento no array.
  const repositoryIndex = repositories.findIndex(repository => repository.id === id)

  if (repositoryIndex < 0)
    return response.status(400).json({ error: 'Repository not found.' });

  const repository = {
    id,
    title,
    url,
    techs
  }

  // Atribuindo o novo repositorio a posicao do array correspondente
  repositories[repositoryIndex] = repository

  response.json(repository)
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
});

module.exports = app;
