// Connect to database
import dotenv from 'dotenv'
import mongoose from 'mongoose';

dotenv.config();

const connection = mongoose.connect(process.env.MONGO_USER_SERVICE_URL as string);

export default connection