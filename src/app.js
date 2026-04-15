import express from 'express'
import cors from 'cors'
import productRoutes from './routes/product.routes.js'
import authRoutes from './routes/auth.routes.js'
import { errorHandler } from './middlewares/error.middleware.js';
import analyticsRoutes from './routes/analytics.routes.js';
import adminRoutes from './routes/admin.routes.js';
import notificationRoutes from "./routes/notifications.routes.js";



const app = express();

app.use(cors({
     origin: "*", // later restrict to frontend URL
    credentials: true,
}));
app.use(express.json());


app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/notifications", notificationRoutes);

app.use(errorHandler);
export default app;
