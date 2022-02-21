import mongodb, { MongoClient } from "mongodb";

let cachedClient: mongodb.MongoClient;
let cachedDb: mongodb.Db;

const DB_URL = process.env.DB_URL;
const DB_NAME = process.env.DB_NAME;

if (!DB_URL) {
  throw new Error(
    "Please define the DB_URL environment variable inside .env.local"
  );
}

if (!DB_NAME) {
  throw new Error(
    "Please define the DB_NAME environment variable inside .env.local"
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = await MongoClient.connect(DB_URL as string);
  const db = client.db(DB_NAME as string);

  cachedDb = db;
  cachedClient = client;

  return { client, db };
}
