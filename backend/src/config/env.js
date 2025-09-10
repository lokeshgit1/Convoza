import "dotenv/config";

export const ENV ={
    PORT: process.env.PORT || 5000,
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/chat-app',
    MODE_ENV: process.env.MODE_ENV || 'development'
}