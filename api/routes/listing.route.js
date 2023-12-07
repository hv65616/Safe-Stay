import express from "express";
const router = express.Router();
import { createlisting ,deleteListing} from "../controller/listing.controller.js";
import { verifyuser } from "../utils/verifyuser.js";
router.post("/create",verifyuser, createlisting);
router.delete('/delete/:id',verifyuser,deleteListing );
export default router;