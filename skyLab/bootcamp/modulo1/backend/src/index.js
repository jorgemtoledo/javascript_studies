const express = require('express');
const { uuid, isUuid } = require('uuidv4');

const app = express();

app.use(express.json());

const projects = [];

// Middleware log
function logRequest(request, response, next) {
  const { method, url } = request;

  const logLabel = `[${method.toUpperCase()}] ${url}`;

  // console.log(logLabel);
  console.time(logLabel);
  // return next();
  next();
  console.timeEnd(logLabel);
}


function validateProjectId(request, response, next) {
  const { id } = request.params;

  if (!isUuid(id)) {
    return response.status(400).json({ error: 'Invalid project ID.' });
  }

  return next();
}

app.use(logRequest);
app.use('projects/:id', validateProjectId);

app.get('/projects', (request, response) => {
  // return response.send('Hello');
  // const { title, owner } = request.query;

  const { title } = request.query;

  const results = title ? projects.filter(project => project.title.includes(title)) : projects;

  // return response.json([
  //   'Projeto 1',
  //   'Projeto 2'
  // ]);

  return response.json(results);
});

app.post('/projects', (request, response) => {
  // const body = request.body;
  const { title, owner } = request.body;

  // return response.json([
  //   'Projeto 1',
  //   'Projeto 2',
  //   'Projeto 3'
  // ]);

  const project = { id: uuid(),  title,  owner };
  projects.push(project);
  return response.json(project);
});

app.put('/projects/:id',  (request, response) => {
  const { id } = request.params;
  const { title, owner } = request.body;

  // const project = projects.find( projects => projects.id === id);
  const projectIndex = projects.findIndex( projects => projects.id === id);
  if (projectIndex < 0) {
    return response.status(400).json( { error: 'Project not found!'  });
  }

  const project = {
    id,
    title,
    owner,
  }

  projects[projectIndex] = project;

  // return response.json([
  //   'Projeto 4',
  //   'Projeto 2',
  //   'Projeto 3'
  // ]);

  return response.json(project);

});

app.delete('/projects/:id', validateProjectId,  (request, response) => {
  const { id } = request.params;

  const projectIndex = projects.findIndex( projects => projects.id === id);
  if (projectIndex < 0) {
    return response.status(400).json( { error: 'Project not found!'  });
  }

  projects.splice(projectIndex, 1);

  // return response.json([
  //   'Projeto 3',
  //   'Projeto 2'
  // ]);

  return response.status(204).send()
});

app.listen(3333, () => {
  console.log(' 🚀Back-end starded!')
});