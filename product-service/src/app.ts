import express from 'express';
import { genericController, genericRouter } from 'shared';
import Product from './models/product.model';
import cors from 'cors'
import client from 'prom-client';

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

const productsController = genericController(Product);

app.use("/products", genericRouter(productsController));

// Default Testing route.
app.get('/', (req, res) => {
    res.status(200).send('The User service is Up!');
});

// --------------------------------- Metrics -------------------------------------------
// Create a counter metric
const httpRequestsTotal = new client.Counter({
    name: 'http_requests_total',
    help: 'Total number of HTTP requests',
    labelNames: ['method', 'route', 'status'], // Labels for detailed tracking
});

// Middleware to increment the counter
app.use((req, res, next) => {
    res.on('finish', () => {
        httpRequestsTotal.inc({
            method: req.method,
            route: req.route ? req.route.path : req.path,
            status: res.statusCode,
        });
    });
    next();
});

app.get('/metrics', async (req, res) => {
    console.log("Trigger");
    res.set('Content-Type', client.register.contentType);
    res.end(await client.register.metrics());
});

// --------------------------------- Metrics -------------------------------------------

export default app;