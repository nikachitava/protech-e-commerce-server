import express from 'express'
import { getProducts, getProduct, deleteProduct } from '../controllers/products.js';

const router = express.Router()

router.get("/", getProducts)
router.get("/:productID", getProduct);
router.delete("/deleteproduct/:productID", deleteProduct)

export default router;