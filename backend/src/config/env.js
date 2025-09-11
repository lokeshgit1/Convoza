import "dotenv/config";

export const ENV ={
    PORT: process.env.PORT || 5000,
    MONGODB_URI: process.env.MONGODB_URI,
    MODE_ENV: process.env.MODE_ENV,
    CLERK_PUBLISHABLE_KEY: process.env.CLERK_PUBLISHABLE_KEY,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    STREAM_API_KEY: process.env.STREAM_API_KEY,
    STREAM_SECRET_KEY: process.env.STREAM_SECRET_KEY,
    SENTRY_DSN: process.env.SENTRY_DSN,
    INNGEST_API_KEY: process.env.INNGEST_API_KEY,
    INNGEST_SIGNING_KEY: process.env.INNGEST_SIGNING_KEY,
}; 