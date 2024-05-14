import config from 'config';
import cors from 'cors';
import express from 'express';
import routes from '../routes';
import swaggerDocs from './swagger';

function createServer() {
  const port = config.get<number>('port');
  const app = express();
  // Enable CORS for all routes
  app.use(cors());

  app.use(express.json());
  swaggerDocs(app, port);
  routes(app);

  return app;
}

export default createServer;
