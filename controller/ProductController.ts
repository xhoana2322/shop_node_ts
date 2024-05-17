// in ts i file vengono importati come in react
    import { Product } from '../model/productModel';
import { Request, Response } from 'express';

interface queryString {
    [key: string]: string | number | boolean; // Adatta questa interfaccia ai tuoi dati
}

class APIProduct {
 // in ts dobbiamo dichiarare le variabili prima di utilizzarle
   // query: any;
    // queryBody: any;

// secondo metodo è di usare le proprietà di incapsulamento (public, private o protected)
    constructor(public query: any, public queryString: any) {
        this.query = query;
        this.queryString = queryString;
    }

    filter() {
        const queryBody: queryString = { ...this.queryString };
        const excludeFields: string[] = ['page', 'sort', 'limit', 'fields'];

        excludeFields.forEach(el => delete queryBody[el]);

        let queryStr: string = JSON.stringify(queryBody);
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte)\b/g, match => `$${match}`);

        this.query.find(JSON.parse(queryStr));

        return this;
    }


}

const getAllProducts = async (req: Request, res: Response) => {
    try {
        const apiProduct = new APIProduct(Product.find(), req.query)
            .filter();
        
        const products = await apiProduct.query;

        res.status(200).json({
            status: 'success',
            data: {
                products
            },
        });
    } catch (error: any) {
        res.status(404).json({
            status: 'fail',
            message: error.message,
        });
    }
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