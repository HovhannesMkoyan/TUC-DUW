import { Router } from "express";
import formidable from "formidable";

import { container } from "../../dependency-injection-setup";

const FileController = container.resolve("fileController");
const router = Router();

router.post(
  "/",
  (req, res, next) => {
    const form = formidable({ multiples: true });
    
    form.parse(req, (err, fields, files) => {
      if (err) {
        next(err);
        return;
      }
      console.log({ fields, files });
      res.json({ fields, files });
    });

    next();
  },
  FileController.add
);

export default router;
