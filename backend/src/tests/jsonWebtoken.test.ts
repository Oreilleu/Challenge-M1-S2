import {
  generateJsonWebToken,
  verifyJsonWebToken,
  killJsonWebToken,
} from "../utils/jsonWebtoken";
import { ExpiresIn } from "../types/expires-in.enum";
import jwt from "jsonwebtoken";

describe("JSON Web Token Utility Functions", () => {
  const payload = { userId: 1 };
  const secretKey = "test_secret_key";
  let token: string;

  beforeAll(() => {
    process.env.JWT_SECRET_KEY = secretKey;
  });

  afterAll(() => {
    delete process.env.JWT_SECRET_KEY;
  });

  it("should generate a valid JWT", async () => {
    token = await generateJsonWebToken(payload, ExpiresIn["15_MIN"]);
    const decoded = jwt.verify(token, secretKey) as jwt.JwtPayload;
    expect(decoded.data).toEqual(payload);
  });

  it("should verify a valid JWT", async () => {
    const verified = await verifyJsonWebToken(token);
    expect(verified).toBeTruthy();
  });

  it("should invalidate a JWT", async () => {
    await killJsonWebToken(token);
    await expect(verifyJsonWebToken(token)).rejects.toThrow(
      "Le token n'est plus valide."
    );
  });

  it("should clean expired tokens", async () => {
    const expiredToken = await generateJsonWebToken(
      payload,
      ExpiresIn["15_MIN"]
    );
    await killJsonWebToken(expiredToken);
    jest.advanceTimersByTime(16 * 60 * 1000); // Advance time by 16 minutes
    await expect(verifyJsonWebToken(expiredToken)).rejects.toThrow(
      "Le token n'est plus valide."
    );
  });
});
