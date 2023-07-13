// See https://github.com/typicode/json-server#module
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);

// Adicione a seguinte linha para permitir o uso de variáveis de ambiente na Vercel
// const apiKey = process.env.API_KEY;
const apiKey = "123456";

// Middleware para verificar a chave da API
server.use((req, res, next) => {
  const { headers } = req;
  const requestApiKey = headers['x-api-key'];

  if (requestApiKey && requestApiKey === apiKey) {
    next();
  } else {
    res.status(401).json({ error: 'API key is required or invalid.' });
  }
});

// Adicione as rotas personalizadas antes do uso do router
server.get('/users', (req, res) => {
  const users = router.db.get('users').value();
  res.json(users);
});

server.get('/threads', (req, res) => {
  const threads = router.db.get('threads').value();
  res.json(threads);
});

server.use(router);

server.listen(() => {
  console.log(`JSON Server is running.`);
});

// Exporte a API do servidor
module.exports = server;
