import { Request, Response, NextFunction } from "express";

export default (req: Request, res: Response, next: NextFunction) => {
  if (req.params.user_id) {
    const userId = req.params.user_id;
    const isValidId =
      /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi.test(
        userId
      );

    if (isValidId && req.user && (req.user as any).uuid === userId) {
      return next();
    } else {
      return res.status(401).json({
        success: false,
        error: "Not authorized",
      });
    }
  } else {
    if (req.user) {
      return next();
    } else {
      return res.status(401).json({
        success: false,
        error: "Not authorized",
      });
    }
  }
};
