import User from "../models/user.model";
import { generateJsonWebToken } from "../utils/jsonWebtoken";
import app from "../server";
import request from "supertest";
import { ExpiresIn } from "../types/expires-in.enum";
import { sendEmail } from "../utils/senderMail";
import { resetPassword } from "../controllers/auth";


describe("User routes", () => {

    beforeEach(async () => {
        await User.deleteMany({});

        const user = new User({
            email: "test@user.com",
            password: "Password56**",
            firstname: "John",
            lastname: "Doe",
            civility: "man",
            isAdmin: false,
            isVerified: true,
            phone: "0606060606",
        });

        const userAdmin = new User({
            email: "test-admin@user.com",
            password: "Password56**",
            firstname: "Johny",
            lastname: "Doe",
            civility: "man",
            isAdmin: true,
            isVerified: true,
            phone: "0606060606",
        });

        const userNoVerified = new User({
            email: "test-noverified@user.com",
            password: "Password56**",
            firstname: "Johny",
            lastname: "Doe",
            civility: "man",
            isAdmin: true,
            isVerified: true,
            phone: "0606060606",
        });




        await user.save();
        await userAdmin.save();
        await userNoVerified.save();

        jest.clearAllMocks();
});



    describe("GET /get-one", () => {
        it("should return 200 if user found", async () => {
            const user = await User.findOne({ email: "test@user.com" });

            const token = await generateJsonWebToken(user, ExpiresIn["24_HOUR"]);

            try{
                const response = await request(app)
                .post("/api/user/get-one")
                .set("Authorization", `Bearer ${token}`)
                .send();

                expect(response.status).toBe(200);
                expect(response.body.success).toBe(true);

            } catch (error) {
                console.error(error);
            }
        });

        it("should return 400 if no user is found", async () => {

            const user = await User.findOne({ email: "test@user1.com" });

            const token = await generateJsonWebToken(user, ExpiresIn["24_HOUR"]);

            try{
                const response = await request(app)
                .post("/api/user/get-one")
                .set("Authorization", `Bearer ${token}`)
                .send();

                expect(response.status).toBe(400);
                expect(response.body.success).toBe(false);
            }
            catch (error) {
                console.error(error);
            }
        });

        it("should return 401 if no token is provided", async () => {
            try{
                const response = await request(app)
                .post("/api/user/get-one")
                .send();

                expect(response.status).toBe(401);
                expect(response.body.success).toBe(false);
            }
            catch (error) {
                console.error(error);
            }
        });
            
    });

    describe("GET /is-verified", () => {
        it("should return true 200 if user is verified", async () => {
            const user = await User.findOne({ email: "test@user.com"});

            const token = await generateJsonWebToken(user, ExpiresIn["24_HOUR"]);

            try{
                const response = await request(app)
                .get("/api/user/is-verified")
                .set("Authorization", `Bearer ${token}`)
                .send();

                expect(response.status).toBe(200);
                expect(response.body.success).toBe(true);
                expect(response.body.data).toBe(true);
            }
            catch (error) {
                console.error(error);
            }
        });
    });

    describe("GET /is-admin", () => {
        it("should return 200 if user is admin", async () => {
            const user = await User.findOne({ email: "test-admin@user.com"});

            const token = await generateJsonWebToken(user, ExpiresIn["24_HOUR"]);

            try{
                const response = await request(app)
                .get("/api/user/is-admin")
                .set("Authorization", `Bearer ${token}`)
                .send();

                expect(response.status).toBe(200);
                expect(response.body.success).toBe(true);
                expect(response.body.data).toBe(true);
            }
            catch (error) {
                console.error(error);
            }
        });
    });

    // jest.mock("../utils/senderMail", () => ({
    //     sendEmail: jest.fn().mockResolvedValue(true),
    // }));

    // const { sendEmail } = require("../utils/senderMail");

    // describe("GET /change-my-password", () => { 
    //     it("should return 200 if email is send", async () => {
    //         const user = await User.findOne({ email: "test@user.com"});

    //         const token = await generateJsonWebToken(user, ExpiresIn["24_HOUR"]);

    //         try{
    //             const response = await request(app)
    //             .get("/api/user/change-my-password")
    //             .set("Authorization", `Bearer ${token}`)
    //             .send();

    //             expect(sendEmail).toHaveBeenCalled();
    //             expect(response.status).toBe(200);
    //             expect(response.body.success).toBe(true);
    //         }
    //         catch (error) {
    //             console.error(error);
    //         }
    //     });
    // }); 
    
});