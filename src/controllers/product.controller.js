import { products } from "../data/products.data.js";
import { ApiError } from "../utils/ApiError.js";
import { rankProducts } from "../utils/ranking.util.js";
import { getCache, setCache } from "../utils/cache.util.js";

/**
 * SEARCH PRODUCTS
 * Supports:
 * - text search
 * - filters (price, distance)
 * - AI ranking
 * - caching
 * - pagination (Day 11)
 */
export const searchProducts = (req, res, next) => {
  try {
    const query = req.query.q;

    if (!query) {
      throw new ApiError(400, "Search query is required");
    }

    // ✅ Read filters safely
    const minPrice = Number(req.query.minPrice) || 0;
    const maxPrice = Number(req.query.maxPrice) || Infinity;
    const maxDistance = Number(req.query.maxDistance) || Infinity;

    // ✅ Pagination params (defensive)
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.min(Math.max(Number(req.query.limit) || 6, 1), 50);

    // ✅ Cache key (DO NOT include page/limit)
    const cacheKey = `search:${query.toLowerCase()}:${minPrice}:${maxPrice}:${maxDistance}`;
    const cached = getCache(cacheKey);

    let rankedProducts;

    // ✅ Use cache if available
    if (cached) {
      rankedProducts = cached;
    } else {
      // ✅ Single filter logic
      const filteredProducts = products.filter(
        (p) =>
          p.status === "approved" &&
          p.name.toLowerCase().includes(query.toLowerCase()) &&
          p.price >= minPrice &&
          p.price <= maxPrice &&
          p.distance <= maxDistance
      );

      rankedProducts = rankProducts(filteredProducts);

      // ✅ Cache FULL ranked list
      setCache(cacheKey, rankedProducts);
    }

    // ✅ Apply pagination AFTER ranking
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedProducts = rankedProducts.slice(start, end);

    return res.status(200).json({
      success: true,
      cached: Boolean(cached),
      meta: {
        page,
        limit,
        total: rankedProducts.length,
        hasMore: end < rankedProducts.length,
      },
      data: paginatedProducts,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * CREATE PRODUCT (Retailer only)
 * RBAC enforced at route level
 */
export const createProduct = (req, res, next) => {
  try {
    const { name, price, distance } = req.body;

    if (!name || !price || !distance) {
      throw new ApiError(400, "All fields are required");
    }

    const newProduct = {
      id: products.length + 1,
      name,
      price,
      distance,
      store: "Retailer Store",
      retailerId: req.user.id,
      status: "pending", // admin approval flow
      views: 0,
    };

    products.push(newProduct);

    res.status(201).json({
      success: true,
      message: "Product added successfully and pending approval",
      data: newProduct,
    });
  } catch (error) {
    next(error);
  }
};
