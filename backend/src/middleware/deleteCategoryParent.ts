import { RequestHandler } from "express";
import Category from "../models/category.model"
import Product from "../models/product.model"

const checkChildren: RequestHandler = async (req, res, next) => {
    const { id } = req.params;

    try{

        const category = await Category.findById(id);

        if(!category){
            res.status(404).json({
                success: false,
                message: "Catégorie non trouvée."
            });
            return;
        }

        if(category?.masterCategory){
            const childrenCount = await Category.countDocuments({ parent: id });

            if(childrenCount > 0){
                res.status(400).json({
                    success: false,
                    message: `La catégorie ${category.name} ne peut pas être supprimée car elle contient des sous-catégories.`
            });
            return;
            }
        }
        else{
            const productsCount = await Product.countDocuments({ idCategory: id });

            if(productsCount > 0){
                res.status(400).json({
                    success: false,
                    message: `La catégorie ${category.name} ne peut pas être supprimée car elle contient des produits.`
                });
                return;
            }
        }
        next();
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Erreur survenue."
        });
        return;
    }
};

export default checkChildren;
