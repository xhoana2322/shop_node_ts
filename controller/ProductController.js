"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.getSingleProduct = exports.createProduct = exports.getAllProducts = void 0;
// in ts i file vengono importati come in react
const productModel_1 = require("../model/productModel");
class APIProduct {
    // in ts dobbiamo dichiarare le variabili prima di utilizzarle
    // query: any;
    // queryBody: any;
    // secondo metodo è di usare le proprietà di incapsulamento (public, private o protected)
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
        this.query = query;
        this.queryString = queryString;
    }
    filter() {
        const queryBody = Object.assign({}, this.queryString);
        const excludeFields = ['page', 'sort', 'limit', 'fields'];
        excludeFields.forEach(el => delete queryBody[el]);
        let queryStr = JSON.stringify(queryBody);
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte)\b/g, match => `$${match}`);
        this.query.find(JSON.parse(queryStr));
        return this;
    }
}
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const apiProduct = new APIProduct(productModel_1.Product.find(), req.query)
            .filter();
        const products = yield apiProduct.query;
        res.status(200).json({
            status: 'success',
            data: {
                products
            },
        });
    }
    catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error.message,
        });
    }
});
exports.getAllProducts = getAllProducts;
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield productModel_1.Product.create(req.body);
        res.status(201).json({
            status: 'success',
            data: { product }
        });
    }
    catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error
        });
    }
    ;
});
exports.createProduct = createProduct;
const getSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield productModel_1.Product.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            data: {
                product
            }
        });
    }
    catch (error) {
        res.status(500).json({
            status: 'fail',
            message: error
        });
    }
    ;
});
exports.getSingleProduct = getSingleProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield productModel_1.Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(201).json({
            status: 'success',
            data: {
                product
            }
        });
    }
    catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error
        });
    }
    ;
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield productModel_1.Product.findByIdAndDelete(req.params.id);
        res.status(201).json({
            status: 'success',
            data: {
                product
            }
        });
    }
    catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error
        });
    }
});
exports.deleteProduct = deleteProduct;
const productController = () => {
    return {
        getAllProducts,
        createProduct,
        getSingleProduct,
        updateProduct,
        deleteProduct
    };
};
exports.default = productController;
