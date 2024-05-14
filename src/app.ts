import config from 'config';
import * as dotenv from 'dotenv';
import connect from './utils/connect';
import logger from './utils/logger';
import createServer from './utils/server';

const port = config.get<number>('port');
const app = createServer();
dotenv.config();

app.listen(port, async () => {
  logger.info(`App is running at http://localhost:${port}`);
  await connect();
});
