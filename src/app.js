import express from 'express';
import 'dotenv/config';

const app = express();

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT);

server.on('error', onError);

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }
  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      process.stdout.write(`${PORT} requires elevated privileges\n`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      process.stdout.write(`port ${PORT} is already in use\n`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

server.on('listening', () => console.log(`App is running`));
