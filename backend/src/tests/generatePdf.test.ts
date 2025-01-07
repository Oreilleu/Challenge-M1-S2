import { generateBufferPdf } from "../utils/generatePdf";
import { User } from "../types/user.interface";
import { Order } from "../types/order.interface";
import puppeteer from "puppeteer";

jest.mock("puppeteer");

describe("generateBufferPdf", () => {
  const user: User = {
    _id: "1",
    email: "test@example.com",
    password: "password",
    firstname: "John",
    lastname: "Doe",
    civility: "Mr",
    isVerified: true,
    isAdmin: false,
  };

  const order: Order = {
    cart: [
      {
        product: {
          _id: "1",
          name: "Product 1",
          description: "A sample product",
          brand: "Brand A",
          model: "Model X",
          idCategory: "Category 1",
          variations: {
            _id: "1",
            imagesApi: [],
            price: 10,
            quantite: 1,
            filters: [],
          },
        },
        quantite: 2,
      },
    ],
    totalPrice: 20,
    address: {
      _id: "1",
      street: "123 Main St",
      city: "Anytown",
      postalCode: "12345",
      country: "USA",
    },
    statusCheckout: "completed",
  };

  it("should generate a PDF buffer", async () => {
    const mockPdfBuffer = Buffer.from("PDF content");
    const mockPage = {
      setContent: jest.fn(),
      pdf: jest.fn().mockResolvedValue(mockPdfBuffer),
    };
    const mockBrowser = {
      newPage: jest.fn().mockResolvedValue(mockPage),
      close: jest.fn(),
    };

    (puppeteer.launch as jest.Mock).mockResolvedValue(mockBrowser);

    const pdfBuffer = await generateBufferPdf(user, order);

    expect(puppeteer.launch).toHaveBeenCalled();
    expect(mockPage.setContent).toHaveBeenCalled();
    expect(mockPage.pdf).toHaveBeenCalledWith({ format: "A4" });
    expect(mockBrowser.close).toHaveBeenCalled();
    expect(pdfBuffer).toEqual(mockPdfBuffer);
  });
});
