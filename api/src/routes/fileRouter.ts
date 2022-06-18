import { Router } from "express";
import fileUpload from "express-fileupload";

import { container } from "../../dependency-injection-setup";

const FileController = container.resolve("fileController");
const router = Router();

router.post(
  "/",
  fileUpload({
    limits: { fileSize: 10 * 1024 * 1024 },
  }),
  FileController.add
);

export default router;
