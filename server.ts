import express, {Request, Response} from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import productRouter from './routes/productRoutes';

const app = express();
app.use(express.json());
dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE?.replace('<PASSWORD>', process.env.DATABASE_PASSWORD!);

mongoose
    .connect(DB!)
    .then(() => console.log('DB connessa 😁👌'))
    .catch((err) => console.log(err, '🤡'));

// app.get('/', (req: Request, res: Response) => {
//     console.log('pagina iniziale');
//     res.end('ciao');
// });

app.use('/api/v1/products', productRouter);

const port: Number = parseInt(process.env.PORT || '3000', 10); // inseriamo il 10 per indicare che è un decimale

app.listen(port, () => {
    console.log(`Server attivo alla 🚪 ${port}...`);
});
