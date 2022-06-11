import { Router } from "express";

import { container } from "../../dependency-injection-setup";
import authenticate from "../middlewares/authenticate";
import isPremium from "../middlewares/is-premium";

const BookController = container.resolve("bookController");
const router = Router();

router.get("/", BookController.getBooks);
router.get("/downloads", BookController.getAllDownloadsNumber);
router.get("/categories", BookController.getCategoriesInfo);
router.get("/search", BookController.getBooksBySearch);
router.get("/:book_id", BookController.getBook);
router.get("/:book_id/suggestions", BookController.getSuggestions);

router.get(
  "/:book_id/activity",
  authenticate,
  BookController.getUserBookActivity
);
router.post(
  "/:book_id/activity",
  authenticate,
  isPremium,
  BookController.updateUserBookActivity
);
router.delete(
  "/:book_id/activity",
  authenticate,
  isPremium,
  BookController.deleteUserBookActivity
);

router.get("/:book_id/read", authenticate, BookController.readBook);
router.get("/:book_id/download", authenticate, BookController.downloadBook);
// router.post("/:book_id/comment", authenticate, BookController.addComment);

export default router;
