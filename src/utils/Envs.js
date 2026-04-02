import dotenv from 'dotenv';

dotenv.config();
const env = process.env;

const ENVs = {
    POST: env.POST || 2001,
    MONGO_URL: env.MONGO_URL,
}

export default ENVs;