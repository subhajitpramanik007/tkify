import { Router } from "express";
import { getOnlineUsers, getMessages, sendMessage } from "../controllers/message.controllers.js";
import { verifyJwtToken } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();

router.route("/online-users").get(verifyJwtToken, getOnlineUsers);
router.route("/:receiverId").get(verifyJwtToken, getMessages);
router.route("/send/:receiverId").post(upload.fields([{ name: "image", maxCount: 3 }]), verifyJwtToken, sendMessage);

export default router;
