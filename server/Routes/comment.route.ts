import express from "express";
import { AddCommentToStore, DisLikeComment, LikeComment } from "../Controllers/comment.controller";
import { AdminCheck, authCheck } from "../Middleware/authCheck";
const router = express.Router();


router.post("/create-comment",authCheck, AddCommentToStore);
router.patch("/like-comment",authCheck,LikeComment);
router.patch("/disLike-comment",authCheck,DisLikeComment);


module.exports = router;
