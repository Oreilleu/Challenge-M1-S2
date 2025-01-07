import request from "supertest";
import app from "../server";
import UserModel from "../models/user.model";
import { generateJsonWebToken } from "../utils/jsonWebtoken";
import { ExpiresIn } from "../types/expires-in.enum";
import path from "path";
import { existsSync, mkdirSync, unlinkSync, writeFileSync } from "fs";
import CategoryModel from "../models/category.model";

describe("Category Routes", () => {
  beforeEach(async () => {
    await UserModel.deleteMany({});
    await CategoryModel.deleteMany({});

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

    const category1 = new CategoryModel({
      name: "Category 1",
      masterCategory: true,
      imageApi: {
        name: "test-image.jpg",
        path: "/uploads/test-image2.jpg",
      },
    });
    const category2 = new CategoryModel({
      name: "Category 2",
      masterCategory: false,
      imageApi: {
        name: "test-image.jpg",
        path: "/uploads/test-image2.jpg",
      },
    });

    await category1.save();
    await category2.save();
    await userAdmin.save();
  });

  describe("POST /categories", () => {
    it("should create a new category", async () => {
      const user = await UserModel.findOne({ email: "test-admin@mail.com" });
      const adminToken = await generateJsonWebToken(user, ExpiresIn["24_HOUR"]);

      const category = {
        name: "Test Category",
        masterCategory: true,
      };

      const pathImage = path.resolve(
        __dirname,
        "../../public/images/test-image.jpg"
      );
      const dir = path.dirname(pathImage);

      if (!existsSync(dir)) {
        mkdirSync(dir, { recursive: true });
      }

      writeFileSync(pathImage, "test-image.jpg");

      try {
        const response = await request(app)
          .post("/api/category/")
          .set("Authorization", `Bearer ${adminToken}`)
          .field("category", JSON.stringify(category))
          .attach("image", pathImage);

        expect(response.status).toBe(201);
        expect(response.body.success).toBe(true);
        expect(response.body.data.name).toBe(category.name);
      } finally {
        unlinkSync(pathImage);
      }
    });

    it("should return 400 if image or category is missing", async () => {
      const user = await UserModel.findOne({ email: "test-admin@mail.com" });
      const adminToken = await generateJsonWebToken(user, ExpiresIn["24_HOUR"]);

      const response = await request(app)
        .post("/api/category/")
        .set("Authorization", `Bearer ${adminToken}`);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });

    it("should return 400 if masterCategory and parent are both set", async () => {
      const user = await UserModel.findOne({ email: "test-admin@mail.com" });
      const adminToken = await generateJsonWebToken(user, ExpiresIn["24_HOUR"]);

      const category = {
        name: "Test Category",
        masterCategory: true,
        parent: "someParentId",
      };

      const pathImage = path.resolve(
        __dirname,
        "../../public/images/test-image.jpg"
      );
      const dir = path.dirname(pathImage);

      if (!existsSync(dir)) {
        mkdirSync(dir, { recursive: true });
      }

      writeFileSync(pathImage, "test-image.jpg");
      try {
        const response = await request(app)
          .post("/api/category/")
          .set("Authorization", `Bearer ${adminToken}`)
          .field("category", JSON.stringify(category))
          .attach("image", pathImage);

        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
      } finally {
        unlinkSync(pathImage);
      }
    });
  });

  describe("GET /categories", () => {
    it("should return all categories", async () => {
      const response = await request(app).get("/api/category/");

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.length).toBe(2);
      expect(response.body.data[0].name).toBe("Category 1");
      expect(response.body.data[1].name).toBe("Category 2");
    });

    it("should return 500 if there is a server error", async () => {
      const user = await UserModel.findOne({ email: "test-admin@mail.com" });
      const adminToken = await generateJsonWebToken(user, ExpiresIn["24_HOUR"]);

      jest.spyOn(CategoryModel, "find").mockImplementationOnce(() => {
        throw new Error("Server error");
      });

      const response = await request(app)
        .get("/api/category/")
        .set("Authorization", `Bearer ${adminToken}`);

      expect(response.status).toBe(500);
      expect(response.body.success).toBe(false);
    });

    describe("GET /categories/subcategories", () => {
      it("should return all subcategories", async () => {
        const response = await request(app).get("/api/category/sub-categories");

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
      });

      it("should return 500 if there is a server error", async () => {
        jest.spyOn(CategoryModel, "find").mockImplementationOnce(() => {
          throw new Error("Server error");
        });

        const response = await request(app).get("/api/category/sub-categories");

        expect(response.status).toBe(500);
        expect(response.body.success).toBe(false);
      });
    });

    describe("GET /categories/:id", () => {
      it("should return a category by id", async () => {
        const category = await CategoryModel.findOne({ name: "Category 1" });

        if (!category) {
          throw new Error("Test Category not found in database");
        }

        const response = await request(app).get(
          `/api/category/${category._id}`
        );

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
      });

      it("should return 500 if there is a server error", async () => {
        jest.spyOn(CategoryModel, "findById").mockImplementationOnce(() => {
          throw new Error("Server error");
        });

        const response = await request(app).get("/api/category/invalidId");

        expect(response.status).toBe(500);
        expect(response.body.success).toBe(false);
      });
    });
  });

  describe("PUT /categories/:id", () => {
    it("should update a category", async () => {
      const user = await UserModel.findOne({ email: "test-admin@mail.com" });
      const adminToken = await generateJsonWebToken(user, ExpiresIn["24_HOUR"]);

      const category = await CategoryModel.findOne({ name: "Category 1" });

      if (!category) {
        throw new Error("Test Category not found in database");
      }

      const updatedCategory = {
        name: "Updated Category",
        masterCategory: true,
      };

      const pathImage = path.resolve(
        __dirname,
        "../../public/images/test-image.jpg"
      );
      const dir = path.dirname(pathImage);

      if (!existsSync(dir)) {
        mkdirSync(dir, { recursive: true });
      }

      writeFileSync(pathImage, "test-image.jpg");

      try {
        const response = await request(app)
          .put(`/api/category/${category._id}`)
          .set("Authorization", `Bearer ${adminToken}`)
          .field("category", JSON.stringify(updatedCategory))
          .attach("image", pathImage);

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
      } finally {
        unlinkSync(pathImage);
      }
    });

    it("should return 400 if masterCategory and parent are both set", async () => {
      const user = await UserModel.findOne({ email: "test-admin@mail.com" });
      const adminToken = await generateJsonWebToken(user, ExpiresIn["24_HOUR"]);

      const category = await CategoryModel.findOne({ name: "Category 1" });

      if (!category) {
        throw new Error("Test Category not found in database");
      }

      const updatedCategory = {
        name: "Updated Category",
        masterCategory: true,
        parent: "someParentId",
      };

      const response = await request(app)
        .put(`/api/category/${category._id}`)
        .set("Authorization", `Bearer ${adminToken}`)
        .field("category", JSON.stringify(updatedCategory));

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });

    it("should return 400 if category or id is missing", async () => {
      const user = await UserModel.findOne({ email: "test-admin@mail.com" });
      const adminToken = await generateJsonWebToken(user, ExpiresIn["24_HOUR"]);

      const response = await request(app)
        .put("/api/category/invalidId")
        .set("Authorization", `Bearer ${adminToken}`);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });

    it("should return 404 if category is not found", async () => {
      const user = await UserModel.findOne({ email: "test-admin@mail.com" });
      const adminToken = await generateJsonWebToken(user, ExpiresIn["24_HOUR"]);

      const updatedCategory = {
        name: "Updated Category",
        masterCategory: true,
      };

      const response = await request(app)
        .put("/api/category/invalidId")
        .set("Authorization", `Bearer ${adminToken}`)
        .field("category", JSON.stringify(updatedCategory));

      expect(response.status).toBe(500);
      expect(response.body.success).toBe(false);
    });

    it("should return 500 if there is a server error", async () => {
      const user = await UserModel.findOne({ email: "test-admin@mail.com" });
      const adminToken = await generateJsonWebToken(user, ExpiresIn["24_HOUR"]);

      const category = await CategoryModel.findOne({ name: "Category 1" });

      if (!category) {
        throw new Error("Test Category not found in database");
      }

      const updatedCategory = {
        name: "Updated Category",
        masterCategory: true,
      };

      jest
        .spyOn(CategoryModel, "findByIdAndUpdate")
        .mockImplementationOnce(() => {
          throw new Error("Server error");
        });

      const response = await request(app)
        .put(`/api/category/${category._id}`)
        .set("Authorization", `Bearer ${adminToken}`)
        .field("category", JSON.stringify(updatedCategory));

      expect(response.status).toBe(500);
      expect(response.body.success).toBe(false);
    });
  });
  describe("DELETE /categories/:id", () => {
    it("should delete a category", async () => {
      const user = await UserModel.findOne({ email: "test-admin@mail.com" });
      const adminToken = await generateJsonWebToken(user, ExpiresIn["24_HOUR"]);

      const category = await CategoryModel.findOne({ name: "Category 1" });

      if (!category) {
        throw new Error("Test Category not found in database");
      }

      const response = await request(app)
        .delete(`/api/category/${category._id}`)
        .set("Authorization", `Bearer ${adminToken}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Catégorie supprimée avec succès");
    });

    it("should return 404 if category is not found", async () => {
      const user = await UserModel.findOne({ email: "test-admin@mail.com" });
      const adminToken = await generateJsonWebToken(user, ExpiresIn["24_HOUR"]);

      const response = await request(app)
        .delete("/api/category/invalidId")
        .set("Authorization", `Bearer ${adminToken}`);

      expect(response.status).toBe(500);
      expect(response.body.success).toBe(false);
    });

    it("should return 500 if there is a server error", async () => {
      const user = await UserModel.findOne({ email: "test-admin@mail.com" });
      const adminToken = await generateJsonWebToken(user, ExpiresIn["24_HOUR"]);

      const category = await CategoryModel.findOne({ name: "Category 1" });

      if (!category) {
        throw new Error("Test Category not found in database");
      }

      jest
        .spyOn(CategoryModel, "findByIdAndDelete")
        .mockImplementationOnce(() => {
          throw new Error("Server error");
        });

      const response = await request(app)
        .delete(`/api/category/${category._id}`)
        .set("Authorization", `Bearer ${adminToken}`);

      expect(response.status).toBe(500);
      expect(response.body.success).toBe(false);
    });
  });
});
