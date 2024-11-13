import { ObjectId } from "mongoose";

export interface Category {
    name: string;
    description: string;
    image?: string;
    parent?: ObjectId;
}