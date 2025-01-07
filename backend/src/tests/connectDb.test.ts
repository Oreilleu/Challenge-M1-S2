import mongoose from "mongoose";
import { connectDb } from "../utils/connectDb";
import { config } from "../config";

jest.mock("mongoose", () => ({
  connect: jest.fn(),
}));

describe("connectDb", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.clearAllMocks();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it("should connect to the database with the correct connection string", async () => {
    process.env.NODE_ENV = "development";
    await connectDb();
    expect(mongoose.connect).toHaveBeenCalledWith(config.db.connexionString);
  });

  it("should not connect to the database if NODE_ENV is 'test'", async () => {
    process.env.NODE_ENV = "test";
    await connectDb();
    expect(mongoose.connect).not.toHaveBeenCalled();
  });

  it("should log an error if connection fails", async () => {
    process.env.NODE_ENV = "development";
    const error = new Error("Connection failed");
    (mongoose.connect as jest.Mock).mockRejectedValueOnce(error);
    console.error = jest.fn();

    await connectDb();

    expect(console.error).toHaveBeenCalledWith(
      "Erreur lors de la connexion à la base de données : ",
      error
    );
  });
});
