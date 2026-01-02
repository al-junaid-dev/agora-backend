import { products } from "../data/products.data.js";
import { ApiError } from "../utils/ApiError.js";

export const getRetailerAnalytics = (req, res, next) => {
  try {
    const retailerId = req.user.id;

    const myProducts = products.filter(
      (p) => p.retailerId === retailerId
    );

    if (!myProducts.length) {
      return res.status(200).json({
        success: true,
        data: {
          totalProducts: 0,
          avgPrice: 0,
          totalViews: 0,
        },
      });
    }

    const totalProducts = myProducts.length;
    const avgPrice =
      myProducts.reduce((sum, p) => sum + p.price, 0) / totalProducts;
    const totalViews = myProducts.reduce(
      (sum, p) => sum + p.views,
      0
    );

    res.status(200).json({
      success: true,
      data: {
        totalProducts,
        avgPrice: Math.round(avgPrice),
        totalViews,
      },
    });
  } catch (error) {
    next(error);
  }
};
