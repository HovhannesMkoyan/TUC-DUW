import { Request, Response, NextFunction } from "express";

export default (req: Request, res: Response, next: NextFunction) => {
  if ((req.user as any).is_subscribed) {
    return next();
  } else {
    return res.status(401).json({
      success: false,
      error: "User is not subscribed",
    });
  }
};
