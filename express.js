const ditto = require('./pokemon/poke.json');
const express = require('express');
const app = express();

const PORT = process.env.PORT ?? 1234;

app.disable('x-powered-by');

// middleware
app.use(express.json())

app.use((req, res, next) => {
  if (req.method !== 'POST') return next();
  if (req.headers['content-type'] !== 'application/json') return next();

  let body = '';

  req.on('data', (chunk) => {
    body += chunk.toString();
  });

  req.on('end', () => {
    const data = JSON.parse(body);

    data.timestamp = Date.now();
    // mutar la request y meter la informacion en el req.body
    req.body = data;
    next();
  });

  // trackear la request a la base de datos
  // revisar si el usuario tiene cookies
});


app.get('/', (req, res) => {
  res.status(200).json(ditto);
});

app.post('/pokemon', (req, res) => {
  // con el req.body guardamos en bd
  res.status(201).json(req.body);
});

app.use((req, res) => {
  res.status(404).json({
    error: 'Ups, this resource doesnt exist 404',
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
