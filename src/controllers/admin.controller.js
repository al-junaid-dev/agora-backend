import { products } from "../data/products.data.js";
import { ApiError } from "../utils/ApiError.js";
import { notifications } from "../data/notifications.data.js";



export const getPendingProducts = (req, res, next) => {
  try {
    const pending = products.filter(p => p.status === "pending");

    res.status(200).json({
      success: true,
      data: pending,
    });
  } catch (error) {
    next(error);
  }
};

export const approveProduct = (req, res, next) => {
  try {
    const { id } = req.params;
    const product = products.find((p) => p.id == id);

    if (!product) {
      throw new ApiError(404, "Product not found");
    }

    product.status = "approved";

    notifications.push({
      id: notifications.length + 1,
      retailerId: product.retailerId,
      message: `Your product "${product.name}" has been approved.`,
      createdAt: new Date(),
      read: false,
    });

    res.status(200).json({
      success: true,
      message: "Product approved and retailer notified",
    });
  } catch (error) {
    next(error);
  }
};


