//import "../instrument.mjs"; // Ensure SEntry is initialized as early as possible
import express from 'express';
import * as Sentry from "@sentry/node";
import { ENV } from './config/env.js';
import cors from "cors";
import { connectDB } from './config/db.js';
import {clerkMiddleware} from '@clerk/express';
import { functions, inngest } from './config/inngest.js';
import {serve} from "inngest/express";
import chatRoutes from './routes/chat.route.js'; 



const app = express();

app.use(express.json());
app.use(cors({origin:ENV.CLIENT_URL,credentials: true}));
app.use(clerkMiddleware()); // req.auth will be available in the request object  

app.get("/debug-sentry", (req, res) =>{
  throw new Error("My first Sentry error!");
}
);

app.get('/', (req, res) => {
  res.send('API is running...');
});


app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/chat", chatRoutes);

Sentry.setupExpressErrorHandler(app);

// Error handler middleware


const startServer = async () => {
  try {
    await connectDB();
    if ( ENV.MODE_ENV !== "production")
    {
      app.listen(ENV.PORT, () => {
        console.log("server started on port :", ENV.PORT);
      })
    }
  }catch(error)
  {
    console.error("error starting server: ", error)
    process.exit(1);
  }
}

startServer();

export default app;