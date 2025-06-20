import { Router } from 'express'
import {
    toggleCommentLike,
    toggleTweetLike,
    toggleVideoLike,
    getLikedVideos
}
from '../controllers/like.controller.js'
import { verifyJWT } from '../middlewares/auth.middleware.js'


const router = Router();
router.use(verifyJWT)   // to apply verifyJWT middleware to the all files of this router (user must be logged in)

router.route("/toggle/v/:videoId").post(toggleVideoLike);
router.route("/toggle/c/:commentId").post(toggleCommentLike);
router.route("/toggle/t/:tweetId").post(toggleTweetLike);
router.route("/videos").get(getLikedVideos);


