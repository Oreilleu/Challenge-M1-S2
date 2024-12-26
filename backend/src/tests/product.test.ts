import path, { join } from "path";
import request from "supertest";
import ProductModel from "../models/product.model";
import app from "../server";
import CategoryModel from "../models/category.model";
import UserModel from "../models/user.model";
import { generateJsonWebToken } from "../utils/jsonWebtoken";
import { ExpiresIn } from "../types/expires-in.enum";
import { existsSync, mkdirSync, unlinkSync, writeFileSync } from "fs";

describe("Product Routes", () => {
  beforeEach(async () => {
    await ProductModel.deleteMany({});
    await CategoryModel.deleteMany({});
    await UserModel.deleteMany({});

    const userAdmin = new UserModel({
      email: "test-admin@mail.com",
      password: "TESTpassword1234*!",
      isAdmin: true,
      firstname: "Test",
      lastname: "Admin",
      civility: "man",
      isVerified: true,
      phone: "1234567890",
    });

    await userAdmin.save();

    const category = new CategoryModel({
      name: "Test Category",
      imageApi: {
        name: "test-image.jpg",
        path: "/uploads/test-image.jpg",
      },
    });

    await category.save();

    const product = new ProductModel({
      name: "Test Product",
      description: "This is a test product",
      idCategory: category._id,
      brand: "Test Brand",
      model: "Test Model",
      variations: [
        {
          suffix: "Variation 1",
          price: 100,
          quantity: 10,
          nameImages: ["test-image.jpg"],
        },
      ],
    });

    await product.save();
  });

  describe("GET /product/:id", () => {
    it("should return 200 and the product if found", async () => {
      const product = await ProductModel.findOne({ name: "Test Product" });

      if (!product) {
        throw new Error("Test Product not found in database");
      }

      const res = await request(app).get(`/api/product/get-one/${product._id}`);
      expect(res.status).toBe(200);
      expect(res.body.data.name).toBe("Test Product");
      expect(res.body.success).toBe(true);
    });

    it("should return 400 if product is not found", async () => {
      const res = await request(app).get("/api/product/get-one/invalidId");
      expect(res.status).toBe(500);
      expect(res.body.success).toBe(false);
    });
  });

  describe("POST /product/paginate", () => {
    it("should return 400 if page or limit is not provided", async () => {
      const res = await request(app).post("/api/product/get-paginate").send({});
      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it("should return 200 and paginated products", async () => {
      const res = await request(app)
        .post("/api/product/get-paginate")
        .send({ page: 1, limit: 10 });
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
    });
  });

  describe("POST /product", () => {
    it("should return 400 if product information is not provided", async () => {
      const user = await UserModel.findOne({ email: "test-admin@mail.com" });
      const adminToken = await generateJsonWebToken(user, ExpiresIn["24_HOUR"]);
      const res = await request(app)
        .post("/api/product/create")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({});

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it("should return 200 and create the product", async () => {
      const category = await CategoryModel.findOne({ name: "Test Category" });
      const user = await UserModel.findOne({ email: "test-admin@mail.com" });

      if (!category) {
        throw new Error("Test Category not found in database");
      }

      if (!user) {
        throw new Error("Test Admin not found in database");
      }

      const adminToken = await generateJsonWebToken(user, ExpiresIn["24_HOUR"]);

      const product = {
        name: "New Test Product",
        description: "This is a new test product",
        idCategory: category._id,
        brand: "New Test Brand",
        model: "New Test Model",
        variations: [
          {
            suffix: "Variation 10",
            price: 100,
            quantite: 10,
            nameImages: ["test-image.jpg"],
          },
        ],
      };

      const pathImage = path.resolve(
        __dirname,
        "../../public/images/product/test-image.jpg"
      );
      const dir = path.dirname(pathImage);

      if (!existsSync(dir)) {
        mkdirSync(dir, { recursive: true });
      }

      writeFileSync(pathImage, "test-image.jpg");

      try {
        const res = await request(app)
          .post("/api/product/create")
          .set("Authorization", `Bearer ${adminToken}`)
          .field("product", JSON.stringify(product))
          .attach("images", pathImage);

        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.data.name).toBe(product.name);
      } finally {
        unlinkSync(pathImage);
      }
    });
  });

  describe("PUT /product/:id", () => {
    it("should return 400 if product information is not provided", async () => {
      const user = await UserModel.findOne({ email: "test-admin@mail.com" });
      const adminToken = await generateJsonWebToken(user, ExpiresIn["24_HOUR"]);

      const res = await request(app)
        .put("/api/product/edit/invalidId")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({});

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it("should return 200 and update the product", async () => {
      const product = await ProductModel.findOne({ name: "Test Product" });
      const user = await UserModel.findOne({ email: "test-admin@mail.com" });
      const adminToken = await generateJsonWebToken(user, ExpiresIn["24_HOUR"]);

      if (!product) {
        throw new Error("Test Admin not found in database");
      }

      const updatedProduct = {
        name: "Updated Product",
        variations: [{ suffix: "Update variation", price: 200, quantity: 20 }],
      };
      const res = await request(app)
        .put(`/api/product/edit/${product._id}`)
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ product: JSON.stringify(updatedProduct) });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
    });
  });

  describe("DELETE /product/:id", () => {
    it("should return 400 if product is not found", async () => {
      const user = await UserModel.findOne({ email: "test-admin@mail.com" });
      const token = await generateJsonWebToken(user, ExpiresIn["24_HOUR"]);

      const res = await request(app)
        .delete("/api/product/delete/invalidId")
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(500);
      expect(res.body.success).toBe(false);
    });

    it("should return 200 and delete the product", async () => {
      const user = await UserModel.findOne({ email: "test-admin@mail.com" });
      const token = await generateJsonWebToken(user, ExpiresIn["24_HOUR"]);

      const product = await ProductModel.findOne({ name: "Test Product" });

      if (!product) {
        throw new Error("Test Admin not found in database");
      }

      const res = await request(app)
        .delete(`/api/product/delete/${product._id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.message).toBe("Produit supprimé avec succès");
    });
  });
});
