import { Router } from "express";

import { container } from "../../dependency-injection-setup";

const FileController = container.resolve("fileController");
const router = Router();

router.get("/", FileController.getUser);

export default router;
