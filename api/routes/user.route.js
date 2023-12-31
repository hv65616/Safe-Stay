import express from "express";
import {
  test,
  updateuser,
  deleteuser,
  getuserlisting,
  getUser
} from "../controller/user.controller.js";
import { verifyuser } from "../utils/verifyuser.js";

const router = express.Router();
router.get("/test", test);
router.post("/update/:id", verifyuser, updateuser);
router.delete("/delete/:id",verifyuser,deleteuser);
router.get("/listings/:id",verifyuser,getuserlisting);
router.get('/:id',verifyuser, getUser)
export default router;
