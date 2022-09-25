import { UserController } from "../controllers/user.controller";
import { Router } from "express";
import { body } from "express-validator";
const router = Router();
const { create, find, borrowBook, returnBook, findOne } =
	new UserController();

router.post("/", body("name").isString(), create);
router.post("/:userId/borrow/:bookId", borrowBook);
router.post(
	"/:userId/return/:bookId",
	body("score").isInt({ min: 1, max: 10 }).notEmpty(),
	returnBook
);
router.get("/", find);
router.get("/:id", findOne);

export default router;
