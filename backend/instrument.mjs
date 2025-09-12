// Import with `import * as Sentry from "@sentry/node"` if you are using ESM
import * as Sentry from "@sentry/node";
//import express from 'express';
import { ENV } from './src/config/env.js';


Sentry.init({
    dsn: ENV.SENTRY_DSN,
    tracesSampleRate: 1.0,
    profileSampleRate: 1.0,
    environment: ENV.MODE_ENV || "development",
    includeLocalVariables: true,

    // Setting this option to true will send default PII data to Sentry.
    // For example, automatic IP address collection on events
    sendDefaultPii: true,
}); 