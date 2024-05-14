import config from 'config';
import mongoose from 'mongoose';
import ErrorService from '../service/ErrorService';
import log from './logger';

async function connect() {
  const dbUri = config.get<string>('dbUri');

  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(dbUri);
    log.info('DB connected');
  } catch (error) {
    ErrorService.notify('Could not connect to db', error);
    process.exit(1);
  }
}

export default connect;
