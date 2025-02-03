import dotenv from 'dotenv'
import app from "./app";
import connection from "./config/db";

dotenv.config();

const port = process.env.USER_SERVICE_PORT ?? 3001;

app.listen(port, () => {
    connection.then(() => console.log('Database connected')).catch(err => console.error(err));
    return console.log(`Product Service is listening at ${port}`);
});