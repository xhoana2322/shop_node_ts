import express from 'express';
import productController from '../controller/ProductController';

const router = express.Router();

router.route('/')
    .get(productController().getAllProducts)
    .post(productController().createProduct);

router.route('/:id')
    .get(productController().getSingleProduct)
    .patch(productController().updateProduct)
    .delete(productController().deleteProduct);


export default router;