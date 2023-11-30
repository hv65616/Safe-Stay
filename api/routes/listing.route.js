import express from "express";
const router = express.Router();
import { createlisting } from "../controller/listing.controller.js";
import { verifyuser } from "../utils/verifyuser.js";
router.post("/create",verifyuser, createlisting);
export default router;