const http = require('node:http');
const fs = require('node:fs');
const desiredPort = process.env.PORT ?? 3001;

const processRequest = (req, res) => {
  res.setHeader('Content-Type', 'text/html ;charset-UTF-8');

  if (req.url === '/') {
    res.statusCode = 200;
    res.end('<h1>Inicio de la pagina web</h1>');
  } else if (req.url === '/acerca') {
    fs.readFile('./Personal photo.jpeg', (err, img) => {
      if (err) {
        res.statusCode = 500;
        res.end('<h1>Error interno del servidor</h1>');
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'image/jpeg');
        res.end(img)
      }
    });

  } else if (req.url === '/contacto') {
    res.statusCode = 200;
    res.end('<h1>Contacto de la pagina web</h1>');
  } else {
    res.statusCode = 404;
    res.end('<h1>404 - Not Found</h1>');
  }
};

const server = http.createServer(processRequest);

server.listen(desiredPort, () => {
  console.log(`Server is listening on port ${desiredPort}`);
});
