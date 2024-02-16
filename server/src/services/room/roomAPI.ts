import express from "express";
import roomC from "./roomController";

import authMiddleware from "../../auth/authMiddleware";
import { validate } from "../../validators/validate";
import { getRoomValidator } from "./roomValidators";

const router = express.Router();

router.get("/:id", authMiddleware(), validate(getRoomValidator), roomC.getRoom);

export default router;
