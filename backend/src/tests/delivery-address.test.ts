import request from "supertest";
import app from "../server";
import DeliveryAddressModel from "../models/delivery-address.model";
import mongoose from "mongoose";
import UserModel from "../models/user.model";
import { generateJsonWebToken } from "../utils/jsonWebtoken";
import { ExpiresIn } from "../types/expires-in.enum";

let token: string;
let userId: mongoose.Types.ObjectId;
let addressId: mongoose.Types.ObjectId;

describe("Delivery Address Routes", () => {
  beforeEach(async () => {
    await DeliveryAddressModel.deleteMany({});
    await UserModel.deleteMany({});

    const user = new UserModel({
      email: "test-admin@mail.com",
      password: "TESTpassword1234*!",
      isAdmin: false,
      firstname: "Test",
      lastname: "Admin",
      civility: "man",
      isVerified: true,
      phone: "1234567890",
    });

    const testAddress = new DeliveryAddressModel({
      idUser: user._id,
      address: "123 Test St",
      country: "France",
      postalCode: "75000",
      city: "Paris",
      street: "Test St",
    });

    await user.save();
    await testAddress.save();
    token = await generateJsonWebToken(user, ExpiresIn["24_HOUR"]);
    userId = user._id;
    addressId = testAddress._id;
  });

  describe("POST /delivery-address", () => {
    it("should create a new delivery address", async () => {
      const address = {
        idUser: userId,
        address: "123 Test St",
        country: "France",
        postalCode: "75000",
        city: "Paris",
        street: "Test St",
      };

      const response = await request(app)
        .post("/api/delivery-adress/add")
        .set("Authorization", `Bearer ${token}`)
        .send(address);

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
    });
  });

  describe("GET /delivery-address", () => {
    it("should get all delivery addresses for a user", async () => {
      const response = await request(app)
        .get("/api/delivery-adress/get-all")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
    });
  });

  describe("PUT /delivery-address/:id", () => {
    it("should update a delivery address", async () => {
      const testAddress = await DeliveryAddressModel.findById(addressId);

      if (!testAddress) {
        throw new Error("Test address not found");
      }

      const response = await request(app)
        .put(`/api/delivery-adress/update/${testAddress._id}`)
        .set("Authorization", `Bearer ${token}`)
        .send({ address: "456 New St" });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
    });

    it("should return 404 if delivery address not found", async () => {
      const response = await request(app)
        .put(`/api/delivery-adress/update/${new mongoose.Types.ObjectId()}`)
        .set("Authorization", `Bearer ${token}`)
        .send({ address: "456 New St" });

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
    });
  });

  describe("DELETE /delivery-address/:id", () => {
    it("should delete a delivery address", async () => {
      const testAddress = await DeliveryAddressModel.findById(addressId);

      if (!testAddress) {
        throw new Error("Test address not found");
      }

      const response = await request(app)
        .delete(`/api/delivery-adress/delete/${testAddress._id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
    });

    it("should return 404 if delivery address not found", async () => {
      const response = await request(app)
        .delete(`/api/delivery-adress/delete/${new mongoose.Types.ObjectId()}`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Adresse de livraison introuvable");
    });
  });
});
