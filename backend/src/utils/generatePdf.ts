import { User } from "../types/user.interface";
import { Order } from "../types/order.interface";
import { DeliveryAddress } from "../types/delivery-address.interface";
import puppeteer from "puppeteer";

export const generateBufferPdf = async (user: User, order: Order) => {
  const address = order.address as DeliveryAddress;
  const html = `
        <html>
            <body>
            <h1>Facture</h1>
            <p>User: ${user.email}</p>
            <p>Total Price: ${order.totalPrice}</p>
            <p>
                Address: ${address.postalCode} ${address.city}, ${
    address.street
  }
            </p>
            ${
              order.billingAddress
                ? `<p>Address: ${order.billingAddress.postalCode} ${order.billingAddress.city}, ${order.billingAddress.street}</p>`
                : "L'adresse de facturation est la même que l'adresse de livraison"
            }

            <h2>Panier : </h2>

            <table>
              <thead>
                <tr>
                  <th>Produit</th>
                  <th>Prix</th>
                  <th>Quantité</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                ${order.cart
                  .map(
                    (item) => `
                    <tr>
                      <td>${item.product.name}</td>
                      <td>${item.product.variations.price}</td>
                      <td>${item.quantite}</td>
                      <td>${item.quantite * item.product.variations.price}</td>
                    </tr>
                  `
                  )
                  .join("")}
              </tbody>
        </body>
      </html>
    `;

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(html);
  const pdfBuffer = await page.pdf({ format: "A4" });
  await browser.close();

  return pdfBuffer;
};
