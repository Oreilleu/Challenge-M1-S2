import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  if (!(process.env.NODE_ENV === "test")) return;

  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  if (!(process.env.NODE_ENV === "test")) return;

  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  if (!(process.env.NODE_ENV === "test")) return;

  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
});
