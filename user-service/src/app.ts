import express from 'express';
import genericRoutes from 'shared/dist/generic-router/generic.router';
import genericController from 'shared/dist/generic-controller/generic.controller'
import User from './models/user.model';
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

const userController = genericController(User);

app.use(`/users`, genericRoutes(userController));

// Default Testing route.
app.get('/', (req, res) => {
    res.status(200).send('The User service is Up!');
});

export default app;