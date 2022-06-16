import { Router } from "express";
import busboy from "connect-busboy";

import { container } from "../../dependency-injection-setup";

const FileController = container.resolve("fileController");
const router = Router();

router.post(
  "/",
  busboy({
    limits: {
      fileSize: 10 * 1024 * 1024,
    },
  }),
  FileController.add
);

export default router;
