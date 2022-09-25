import { BookController } from "../controllers";
import { Router } from "express";
import { body } from "express-validator";
const router = Router();
const { create, find, findOne } = new BookController();

router.get("/:id", findOne);
router.post("/", body("name").isString(), create);
router.get("/", find);


export default router;
