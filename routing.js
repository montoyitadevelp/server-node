const http = require('node:http');
const json = require('./pokemon/poke.json');

const port = process.env.PORT ?? 3000;

const processRequest = (req, res) => {
  const { method, url } = req;

  switch (method) {
    case 'GET':
      switch (url) {
        case '/pokemon/ditto':
          res.setHeader('Content-Type', 'application/json; charset=utf-8');
          return res.end(JSON.stringify(json));
        default:
          res.statusCode = 404;
          res.setHeader('Content-Type', 'text/html; charset=utf-8');
          return res.end('<h1>Error 404</h1>');
      }
    case 'POST':
      switch (url) {
        case '/pokemon':
          let body = '';

          req.on('data', (chunk) => {
            body += chunk.toString();
          });

          req.on('end', () => {
            const data = JSON.parse(body);
            // LLamar el modelo de la base de datos para guardar la información
            res.writeHead(201, {
              'Content-Type': 'application/json; charset=utf-8',
            });

            data.timestamp = Date.now()
            res.end(JSON.stringify(data));
          });
          break;
        default:
          res.statusCode = 404;
          res.setHeader('Content-Type', 'text/html; charset=utf-8');
          return res.end('<h1>Error 404</h1>');
      }
  }
};

const server = http.createServer(processRequest);

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
