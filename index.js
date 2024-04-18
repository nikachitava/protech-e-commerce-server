import express from 'express';
const app = express();
import cors from 'cors'
import { connection } from './connection.js';
import productsRoutes from './routes/products.js'
import categoriesRoutes from "./routes/categories.js"
import authRoutes from "./routes/auth.js"
import cookieParser from 'cookie-parser';


/* middlewares */
app.use(cors());
app.use(express.json());
app.use(cookieParser())



app.use("/products", productsRoutes);
app.use("/categories", categoriesRoutes)
app.use("/register", authRoutes)

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to database');
});
