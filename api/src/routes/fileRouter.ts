import { Router } from "express";
import formidableMiddleware from 'express-formidable';

import { container } from "../../dependency-injection-setup";

const FileController = container.resolve("fileController");
const router = Router();

router.post(
  "/",
  formidableMiddleware(),
  FileController.add
);

export default router;
