import express from "express";
const router = express.Router();
import { createlisting ,deleteListing,updatelisting} from "../controller/listing.controller.js";
import { verifyuser } from "../utils/verifyuser.js";
router.post("/create",verifyuser, createlisting);
router.delete('/delete/:id',verifyuser,deleteListing );
router.post("/update/:id",verifyuser,updatelisting);
export default router;