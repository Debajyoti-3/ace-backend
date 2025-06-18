import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    createTweet,
    getUserTweets,
    updateTweet,
    deleteTweet
}
from "../controllers/tweet.controller.js"

const router = Router();
router.use(verifyJWT)       // to apply verifyJWT middleware to the all files of this router

router.route("/").post(createTweet);
router.route("/get-tweet").get(getUserTweets);
router.route("/:tweetId").patch(updateTweet);
router.route("/:tweetId").delete(deleteTweet)

export default router



