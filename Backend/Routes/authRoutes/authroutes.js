import express from "express";
let router = express.Router();

import { registration } from "../../Controllers/Authontication/registration.controller.js";
import { authontication } from "../../Controllers/Authontication/authontication.js";
import { isLoggin } from "../../Middlewares/isLoggin.middleware.js";
import { logout } from "../../Controllers/Authontication/user.logout.js";

router.route("/registration").post(registration);
router.route("/authontication").post(authontication);
router.route("/logout").get(logout);
export default router;