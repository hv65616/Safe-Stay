import express from "express";
import { test, updateuser } from "../controller/user.controller.js";
import { verifyuser } from "../utils/verifyuser.js";

const router = express.Router();
router.get("/test", test);
router.post("/update/:id", verifyuser, updateuser);
export default router;
