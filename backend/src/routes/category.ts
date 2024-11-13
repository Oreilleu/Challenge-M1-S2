import {Router} from 'express';
import {createCategory, getCategories, getCategoryById, updateCategory, deleteCategory} from '../controllers/category';

const categoryRoute = () => {
    const router = Router();

    router.get('/', getCategories);

    router.get('/:id', getCategoryById);

    router.post('/', createCategory);

    router.put('/:id', updateCategory);

    router.delete('/:id', deleteCategory);

    return router;
}

export default categoryRoute;