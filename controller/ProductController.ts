// in ts i file vengono importati come in react
    import { Product } from '../model/productModel';
import { Request, Response } from 'express';

const getAllProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.find();
        res.status(200).json({
            status: 'success',
            data: products
        });
    } catch(error: any) {
        res.status(500).json({
            status: 'fail',
            message: error
        });
    };
};


const createProduct = async (req: Request, res: Response) => {
    try {
        const product = await Product.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {product}
        });
    } catch(error: any) {
        res.status(404).json({
            status: 'fail',
            message: error
        });
    };
};


const getSingleProduct = async (req: Request, res: Response) => { 
    try {

        const product = await Product.findById(req.params.id);

        res.status(200).json({
            status: 'success',
            data: {
                product
            }
        });
    } catch (error: any) {
        res.status(500).json({
            status: 'fail',
            message: error
        });
    };
};


const updateProduct = async (req: Request, res: Response) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(201).json({
            status: 'success',
            data: {
                product
            }
        });
    } catch (error: any) {
        res.status(404).json({
            status: 'fail',
            message: error
        });
    };
};


const deleteProduct = async (req: Request, res: Response) => {
    try {
        
        const product = await Product.findByIdAndDelete(req.params.id);

        res.status(201).json({
            status: 'success',
            data: {
                product
            }
        });
    } catch (error: any) {
        res.status(404).json({
            status: 'fail',
            message: error
        });
    }
};


export { 
    getAllProducts, 
    createProduct, 
    getSingleProduct, 
    updateProduct, 
    deleteProduct 
};

const productController = () => {
    return {
        getAllProducts,
        createProduct,
        getSingleProduct, 
        updateProduct,
        deleteProduct
    };
};

export default productController;