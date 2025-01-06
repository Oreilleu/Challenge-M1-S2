import { Request, Response } from "express";
import OrderModel from "../models/order.model";
import { AuthenticatedRequest } from "../types/authenticated-request.interface";
import { StatusOrder } from "../types/status-order.enum";
import DeliverAdressModel from "../models/delivery-address.model";
import { generateBufferPdf } from "../utils/generatePdf";
import { Order } from "../types/order.interface";
import { DeliveryAddress } from "../types/delivery-address.interface";
import { sendEmail } from "../utils/senderMail";
import { config } from "../config";
import invoiceOrderTemplate from "../utils/template-email/invoinceOrderTemplate";
import { paginateData } from "../utils/paginate";

export const create = async (req: Request, res: Response) => {
  const { user } = req as AuthenticatedRequest;
  const {
    cart,
    totalPrice,
    address: addressId,
    billingAddress,
    statusCheckout,
  } = req.body;

  let status = "";

  if (!user || !cart || !totalPrice || !statusCheckout) {
    res.status(404).send("Bad request");
    return;
  }

  try {
    if (statusCheckout === "complete") {
      const address = await DeliverAdressModel.findById(
        addressId
      ).lean<DeliveryAddress>();

      if (!address) {
        throw new Error("Address not found");
      }

      const order: Order = {
        cart,
        totalPrice,
        address,
        billingAddress,
        statusCheckout,
      };

      const pdf = await generateBufferPdf(user, order);

      await sendEmail(
        config.mailer.noreply,
        user.email,
        "Facture de votre commande",
        await invoiceOrderTemplate(user.firstname),
        [
          {
            filename: `invoice_${Date.now()}.pdf`,
            content: Buffer.from(pdf),
          },
        ]
      );

      status = StatusOrder.PAID;
    } else {
      status = StatusOrder.CANCELLED;
    }
  } catch (error) {
    status = StatusOrder.CANCELLED;
  }

  try {
    const order = await OrderModel.create({
      user: user._id,
      cart: cart.map((item: any) => ({
        product: item.product,
        quantite: item.quantite,
      })),
      address: addressId,
      totalPrice,
      billingAddress,
      status,
    });

    res.status(201).json({
      message: "Order created successfully",
      data: order,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAll = async (req: Request, res: Response) => {
  const { user } = req as AuthenticatedRequest;

  if (!user) {
    res.status(404).send("Bad request");
    return;
  }

  try {
    let orders;
    if (user.isAdmin) {
      orders = await OrderModel.find().populate("address");
    } else {
      orders = await OrderModel.find({ user: user._id }).populate("address");
    }

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getPaginatedOrders = async (req: Request, res: Response) => {
  const { user } = req as AuthenticatedRequest;

  // if (!user?.isAdmin) {
  //   res.status(403).send("Unauthorized");
  //   return;
  // }

  try {
    const orders = await OrderModel.find().populate("address").sort({ createdAt: -1 });

    const result = paginateData(req, orders);

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error: any) {
    console.error("Erreur pour récupérer les commandes paginées", error);
    res.status(500).json({
      success: false,
      message: (error as Error).message,
    });
  }
}

export const getOne = async (req: Request, res: Response) => {
  const { user } = req as AuthenticatedRequest;
  const { id } = req.params;

  if (!user || !id) {
    res.status(404).send("Bad request");
    return;
  }

  try {
    const order = await OrderModel.findById(req.params.id).populate("address");

    if (!order) {
      res.status(404).send("Order not found");
      return;
    }

    if (user._id !== order?.user._id.toString() && !user.isAdmin) {
      res.status(403).send("Unauthorized");
      return;
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const update = async (req: Request, res: Response) => {
  const { user } = req as AuthenticatedRequest;
  const { id } = req.params;
  const { cart, totalPrice, addressId, billingAddress, statusCheckout } =
    req.body;

  if (!user || !id) {
    res.status(404).send("Bad request");
    return;
  }

  try {
    const order = await OrderModel.findByIdAndUpdate(
      req.params.id,
      {
        cart,
        addressId,
        totalPrice,
        billingAddress,
        status: statusCheckout,
      },
      { new: true }
    );

    if (!order) {
      res.status(404).send("Order not found");
      return;
    }

    if (user._id !== order?.user._id.toString() && !user.isAdmin) {
      res.status(403).send("Unauthorized");
      return;
    }

    await order.save();

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
};

export const remove = async (req: Request, res: Response) => {
  const { user } = req as AuthenticatedRequest;
  const { id } = req.params;

  if (!user || !id) {
    res.status(404).send("Bad request");
    return;
  }

  try {
    const order = await OrderModel.findByIdAndDelete(req.params.id);

    if (!order) {
      res.status(404).send("Order not found");
      return;
    }

    if (user._id !== order?.user._id.toString() && !user.isAdmin) {
      res.status(403).send("Unauthorized");
      return;
    }

    res.status(200).json({
      success: true,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteOrder = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({
      success: false,
      message: "L'identifiant de la commande est requis",
    });
    return;
  }

  try {
    const order = await OrderModel.findByIdAndDelete(id);

    if (!order) {
      res.status(400).json({
        success: false,
        message: "Commande non trouvée",
      });
      return;
    }

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: (error as Error).message,
    });
  }
};
