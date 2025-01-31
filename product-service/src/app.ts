import express from 'express';
import { genericController , genericRouter } from 'shared';
import Product from './models/product.model';
import cors from 'cors'

const app = express();

app.use(express.json());

const allowedOrigins = (process.env.CORS_ORIGINS ?? "").split(',')

const corsOptions = {
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or Postman)
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
            callback(null, true); // Origin is allowed
        } else {
            callback(new Error('Not allowed by CORS')); // Origin is not allowed
        }
    },
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

// Apply CORS middleware
app.use(cors(corsOptions));

const productsController = genericController(Product) ;

app.use("/products" , genericRouter(productsController));

// Default Testing route.
app.get('/', (req, res) => {
    res.status(200).send('The User service is Up!');
});

export default app;