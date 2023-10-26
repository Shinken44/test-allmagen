import config from 'config';
import pgPromise from 'pg-promise';

const dbClient = pgPromise({ schema: 'public' });
const db = dbClient(config.get('db'));

export default db;
