"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
dotenv_1.default.config({ path: './config.env' });
const DB = (_a = process.env.DATABASE) === null || _a === void 0 ? void 0 : _a.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
mongoose_1.default
    .connect(DB)
    .then(() => console.log('DB connessa 😁👌'))
    .catch((err) => console.log(err, '🤡'));
// app.get('/', (req: Request, res: Response) => {
//     console.log('pagina iniziale');
//     res.end('ciao');
// });
app.use('/api/v1/products', productRoutes_1.default);
const port = parseInt(process.env.PORT || '3000', 10); // inseriamo il 10 per indicare che è un decimale
app.listen(port, () => {
    console.log(`Server attivo alla 🚪 ${port}...`);
});
