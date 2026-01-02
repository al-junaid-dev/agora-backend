import { notifications } from "../data/notifications.data.js";

export const getRetailerNotifications = (req, res, next) => {
  try {
    const retailerId = req.user.id;

    const myNotifications = notifications.filter(
      (n) => n.retailerId === retailerId
    );

    res.status(200).json({
      success: true,
      data: myNotifications,
    });
  } catch (error) {
    next(error);
  }
};
