import { Router } from "express";

const router = Router();

import userCtrls from "../controllers/user.controllers.js";
import { verifyJwtToken } from "../middleware/auth.middleware.js";

router.route("/register").post(userCtrls.register);
router.route("/login").post(userCtrls.login);
router.route("/refresh-token").post(userCtrls.refreshToken);
router.route("/logout").post(verifyJwtToken, userCtrls.logout);

router.route("/check-auth").get(verifyJwtToken, userCtrls.checkAuth);

router.route("/me").get(verifyJwtToken, userCtrls.getMe);
router.route("/update-me").put(verifyJwtToken, userCtrls.updateMe);
router.route("/avatar").post(verifyJwtToken, userCtrls.uploadAvatar);
router.route("/delete-me").delete(verifyJwtToken, userCtrls.deleteMe);

export default router;
