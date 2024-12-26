import request from "supertest";
import app from "../server";
import UserModel from "../models/user.model";
import bcrypt from "bcrypt";
import { DEFAULT_SALT } from "../utils/const";

describe("Auth Routes", () => {
  beforeEach(async () => {
    await UserModel.deleteMany({});

    const hashedPassword = await bcrypt.hash("testpassword", DEFAULT_SALT);
    await UserModel.create({
      username: "testuser",
      email: "testuser@example.com",
      password: hashedPassword,
      firstname: "Test",
      lastname: "User",
    });
  });

  describe("Auth Routes", () => {
    it("should return 200 for login route", async () => {
      const response = await request(app)
        .post("/api/login")
        .send({ email: "testuser@example.com", password: "testpassword" });
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("data.jwt");
    });

    it("should return 201 for successful registration", async () => {
      const response = await request(app).post("/api/register").send({
        email: "testuserRegistration@example.com",
        password: "Test@1234",
        confirmPassword: "Test@1234",
        firstname: "Test",
        lastname: "User",
        civility: "man",
        phone: "1234567890",
      });
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("data.user");
      expect(response.body).toHaveProperty("data.jwt");
    });

    it("should return 400 for registration with missing fields", async () => {
      const response = await request(app).post("/api/register").send({
        email: "testuser@example.com",
        password: "Test@1234",
        confirmPassword: "Test@1234",
        firstname: "Test",
        lastname: "User",
      });
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("errors");
    });

    it("should return 400 for registration with invalid email format", async () => {
      const response = await request(app).post("/api/register").send({
        email: "invalid-email",
        password: "Test@1234",
        confirmPassword: "Test@1234",
        firstname: "Test",
        lastname: "User",
        civility: "Mr",
        phone: "1234567890",
      });
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("errors");
    });

    it("should return 400 for registration with existing email", async () => {
      const response = await request(app).post("/api/register").send({
        email: "testuser@example.com",
        password: "Test@1234",
        confirmPassword: "Test@1234",
        firstname: "Test",
        lastname: "User",
        civility: "Mr",
        phone: "1234567890",
      });
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("errors");
    });

    it("should return 400 for registration with insecure password", async () => {
      const response = await request(app).post("/api/register").send({
        email: "testuser@example.com",
        password: "password",
        confirmPassword: "password",
        firstname: "Test",
        lastname: "User",
        civility: "Mr",
        phone: "1234567890",
      });
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("errors");
    });

    it("should return 400 for registration with non-matching passwords", async () => {
      const response = await request(app).post("/api/register").send({
        email: "testuser@example.com",
        password: "Test@1234",
        confirmPassword: "Test@12345",
        firstname: "Test",
        lastname: "User",
        civility: "Mr",
        phone: "1234567890",
      });
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("errors");
    });

    it("should return 400 for registration with invalid phone number", async () => {
      const response = await request(app).post("/api/register").send({
        email: "testuser@example.com",
        password: "Test@1234",
        confirmPassword: "Test@1234",
        firstname: "Test",
        lastname: "User",
        civility: "Mr",
        phone: "invalid-phone",
      });
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("errors");
    });
  });
});
