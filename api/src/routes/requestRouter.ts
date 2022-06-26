import { Router } from "express";

import { container } from "../../dependency-injection-setup";

const RequestController = container.resolve("requestController");
const router = Router();

router.get("/", RequestController.getAll);
router.get("/:uuid", RequestController.get);
router.post("/", RequestController.add);

export default router;
