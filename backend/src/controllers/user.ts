import { BodyPaginateUser } from "./../types/body-paginate-user.interface";
import { RequestHandler } from "express";
import { AuthenticatedRequest } from "../types/authenticated-request.interface";
import { ColumnUser } from "../types/column-user.interface";
import UserModel from "../models/user.model";
import { User } from "../types/user.interface";

export const getOne: RequestHandler = (req, res, next) => {
  const { user } = req as AuthenticatedRequest;

  if (!user) {
    res.status(400).json({
      success: false,
      message: "Pas d'utilisateur authentifié",
    });
    return;
  }

  res.status(200).json({
    success: true,
    data: { ...user },
  });
};

export const isVerified: RequestHandler = async (req, res, next) => {
  const { user } = req as AuthenticatedRequest;

  if (!user) {
    res.status(400).json({
      success: false,
      message: "Pas d'utilisateur",
    });
    return;
  }

  const userDatabase = await UserModel.findOne({ email: user.email });

  if (!userDatabase) {
    res.status(400).json({
      success: false,
      message: "Pas d'utilisateur authentifié",
    });
    return;
  }

  const isVerified = userDatabase.isVerified;

  res.status(200).json({
    success: true,
    data: isVerified,
  });
};

export const isAdmin: RequestHandler = async (req, res, next) => {
  const { user } = req as AuthenticatedRequest;

  if (!user) {
    res.status(400).json({
      success: false,
      message: "Pas d'utilisateur",
    });
    return;
  }

  const userDatabase = await UserModel.findOne({ email: user.email });

  if (!userDatabase) {
    res.status(400).json({
      success: false,
      message: "Pas d'utilisateur authentifié",
    });
    return;
  }

  const isAdmin = userDatabase.isAdmin;

  res.status(200).json({
    success: true,
    data: isAdmin,
  });
};

export const getPaginate: RequestHandler = async (req, res, next) => {
  const { page, limit, searchOption } = req.body as BodyPaginateUser;
  if (!page || !limit) {
    res.status(400).json({
      success: false,
      message: "La numéro de page et le nombre d'élément par page est requis",
    });
    return;
  }

  const parsedPage = parseInt(page);
  const parsedLimit = parseInt(limit);

  const paginationOptions = {
    skip: parsedPage === 1 ? 0 : parsedPage * parsedLimit - parsedLimit,
    limit: parsedLimit,
  };

  const filterOptions =
    searchOption && searchOption?.searchInput.length < 3
      ? undefined
      : searchOption;

  const buildQuery = (filterOptions: any) => {
    if (!filterOptions) {
      return {};
    }

    const { column, searchInput } = filterOptions;
    const regex = { $regex: searchInput, $options: "i" };

    if (column === ColumnUser.ALL) {
      return {
        $or: [{ [ColumnUser.FIRSTNAME]: regex }, { [ColumnUser.EMAIL]: regex }],
      };
    }

    if (column === ColumnUser.FIRSTNAME) {
      return { [ColumnUser.FIRSTNAME]: regex };
    }

    return { [column]: regex };
  };
  const query = buildQuery(filterOptions);
  try {
    const users = await UserModel.find(query, null, paginationOptions);
    const total = await UserModel.countDocuments(query);

    res.status(200).json({
      success: true,
      data: {
        users,
        total,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: (error as Error).message,
    });
  }
};

export const edit: RequestHandler = async (req, res, next) => {
  const body: User = JSON.parse(req.body.user);
  const { id } = req.params;

  if (!id) {
    res.status(400).json({
      success: false,
      message: "L'identifiant de l'utilisateur est requis",
    });
    return;
  }

  if (!body) {
    res.status(400).json({
      success: false,
      message: "Les données de l'utilisateur sont requises",
    });
    return;
  }
  try {
    const user = await UserModel.findByIdAndUpdate(id, body);

    if (!user) {
      res.status(400).json({
        success: false,
        message: "Utilisateur non trouvé",
      });
      return;
    }
    await user.save();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: (error as Error).message,
    });
  }
};

export const remove: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await UserModel.findByIdAndDelete(id);

    if (!user) {
      res.status(404).json({
        success: false,
        message: "Utilisateur non trouvé",
      });
      return;
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: (error as Error).message,
    });

    res.status(200).json({
      success: true,
      message: "Utilisateur supprimé avec succès",
    });
  }
};
