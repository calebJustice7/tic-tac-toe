import express from "express";
import roomC from "./roomController";

import authMiddleware from "../../auth/authMiddleware";

const router = express.Router();

router.post("/", authMiddleware(), roomC.createRoom);

export default router;
