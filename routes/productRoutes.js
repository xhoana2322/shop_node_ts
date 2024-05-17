"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ProductController_1 = __importDefault(require("../controller/ProductController"));
const router = express_1.default.Router();
router.route('/')
    .get((0, ProductController_1.default)().getAllProducts)
    .post((0, ProductController_1.default)().createProduct);
router.route('/:id')
    .get((0, ProductController_1.default)().getSingleProduct)
    .patch((0, ProductController_1.default)().updateProduct)
    .delete((0, ProductController_1.default)().deleteProduct);
exports.default = router;
