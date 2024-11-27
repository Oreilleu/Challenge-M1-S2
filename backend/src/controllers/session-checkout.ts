import { Request, Response } from "express";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const createSession = async (req: Request, res: Response) => {
  const { price, email, description, nameOrder } = req.body;

  if (!price || !description || !nameOrder) {
    res.status(400).send("Missing required parameters");
    return;
  }

  try {
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: nameOrder,
              description: description,
            },
            unit_amount: price * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      customer_email: email,
      return_url: `${process.env.FRONT_URL}/cart?session_id={CHECKOUT_SESSION_ID}`,
    });

    res
      .status(200)
      .json({ success: true, clientSecret: session.client_secret });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getSessionStatus = async (req: Request, res: Response) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(
      req.query.session_id
    );

    // Récupérer la facture de stripe

    res.status(200).json({
      status: session.status,
      customer_email: session.customer_details.email,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};
