import { Request, Response } from "express";
import Stripe from "stripe";
import { CartItem } from "../types/cart-item.interface";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const createSession = async (req: Request, res: Response) => {
  const { price, email, description, nameOrder, cart } = req.body;

  if (!price || !description || !nameOrder) {
    res.status(400).send("Missing required parameters");
    return;
  }

  try {
    const session: Stripe.Checkout.Session =
      await stripe.checkout.sessions.create({
        client_reference_id: email,
        customer_email: email,
        ui_mode: "embedded",
        payment_method_types: ["card"],
        line_items: cart.map((cartItem: CartItem) => {
          return {
            price_data: {
              currency: "eur",
              unit_amount: cartItem.product.variations.price * 100,
              product_data: {
                name: cartItem.product.name,
                description: cartItem.product.description,
              },
            },
            quantity: cartItem.quantite,
          };
        }),
        mode: "payment",
        return_url: `${process.env.FRONT_URL}/cart?session_id={CHECKOUT_SESSION_ID}`,
        automatic_tax: { enabled: true },
      });

    res
      .status(200)
      .json({ success: true, clientSecret: session.client_secret });
  } catch (error: any) {
    console.log("Error createSession", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getSessionStatus = async (req: Request, res: Response) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(
      req.query.session_id
    );

    res.status(200).json({
      status: session.status,
      customer_email: session.customer_details.email,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};
