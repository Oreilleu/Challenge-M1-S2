import {
  REGEX_EMAIL_VALIDATION,
  REGEX_PASSWORD_VALIDATION,
  DEFAULT_SALT,
  REGEX_PHONE_VALIDATION,
} from "../utils/const";

describe("Constants and Regular Expressions", () => {
  it("should validate email addresses correctly", () => {
    expect(REGEX_EMAIL_VALIDATION.test("test@example.com")).toBe(true);
    expect(REGEX_EMAIL_VALIDATION.test("invalid-email")).toBe(false);
  });

  it("should validate passwords correctly", () => {
    expect(REGEX_PASSWORD_VALIDATION.test("Password1!")).toBe(true);
    expect(REGEX_PASSWORD_VALIDATION.test("password")).toBe(false);
  });

  it("should have the correct default salt value", () => {
    expect(DEFAULT_SALT).toBe(10);
  });

  it("should validate phone numbers correctly", () => {
    expect(REGEX_PHONE_VALIDATION.test("+1-800-555-5555")).toBe(true);
    expect(REGEX_PHONE_VALIDATION.test("(123) 456-7890")).toBe(true);
    expect(REGEX_PHONE_VALIDATION.test("123-456-7890")).toBe(true);
    expect(REGEX_PHONE_VALIDATION.test("123.456.7890")).toBe(true);
    expect(REGEX_PHONE_VALIDATION.test("1234567890")).toBe(true);
    expect(REGEX_PHONE_VALIDATION.test("123")).toBe(true);
    expect(REGEX_PHONE_VALIDATION.test("123-45-6789")).toBe(true);
    expect(REGEX_PHONE_VALIDATION.test("123-4567")).toBe(true);
    expect(REGEX_PHONE_VALIDATION.test("123-456-789")).toBe(true);
  });
});
