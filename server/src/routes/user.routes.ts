import { Router } from "express";

const router = Router();

import userCtrls from "../controllers/user.controllers.js";
import { verifyJwtToken } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";

router.route("/email/:email").post(userCtrls.checkEmail);
router.route("/register").post(userCtrls.register);
router.route("/login").post(userCtrls.login);
router.route("/refresh-token").post(userCtrls.refreshToken);

router.use(verifyJwtToken);

router.route("/logout").post(userCtrls.logout);

router.route("/check-auth").get(userCtrls.checkAuth);

router.route("/me").get(userCtrls.getMe);
router.route("/update-me").put(userCtrls.updateMe);
router.route("/delete-me").delete(userCtrls.deleteMe);
router.route("/avatar").patch(upload.fields([{ name: "avatar", maxCount: 1 }]), verifyJwtToken, userCtrls.uploadAvatar);

export default router;
