import { Router } from "express";
import { loginUser, logoutUser, registerUser, refreshAccessToken } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/register").post(
    upload.fields([     // used as middleware
        {
            name: "avatar",
            maxCount:1
        },
        {
            name:"coverImage",
            maxCount: 1
        }
    ]),
    registerUser)

router.route("/login").post(loginUser)


// secured routes (means here user have to logged in)
router.route("/logout").post(verifyJWT, logoutUser)     // verifyJWT -> middleware
router.route("/refresh-token").post(refreshAccessToken)



export default router