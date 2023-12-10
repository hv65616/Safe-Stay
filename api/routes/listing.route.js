import express from "express";
const router = express.Router();
import {
  createlisting,
  deleteListing,
  updatelisting,
  getListing,
  getlistings,
} from "../controller/listing.controller.js";
import { verifyuser } from "../utils/verifyuser.js";
router.post("/create", verifyuser, createlisting);
router.delete("/delete/:id", verifyuser, deleteListing);
router.post("/update/:id", verifyuser, updatelisting);
router.get("/get/:id", getListing);
router.get("/get", getlistings);
export default router;
