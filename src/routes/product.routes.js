import {Router} from 'express';
import { searchProducts} from '../controllers/product.controller.js';
import { createProduct } from '../controllers/product.controller.js';
import { authorizeRoles } from '../middlewares/role.middleware.js';
import { authenticateUser } from '../middlewares/auth.middleware.js';

const router = Router();

// Route to search products for public access
router.get('/search', searchProducts);

// Route to create a new product, restricted to retailer
router.post('/', authenticateUser, authorizeRoles('retailer'), createProduct);

export default router;