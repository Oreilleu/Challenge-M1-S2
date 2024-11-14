import { ObjectId } from "mongoose";
import { Image } from "./image.interface";

export interface Category {
  name: string;
  imageApi: Image;
  nameImage: string;
  description?: string;
  masterCategory: boolean;
  parent?: ObjectId;
}
