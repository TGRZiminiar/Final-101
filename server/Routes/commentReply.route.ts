import express from "express";
import { CreateReplyComment, DisLikeReplyComment, LikeReplyComment } from "../Controllers/commentReply.controller";
import { AdminCheck, authCheck } from "../Middleware/authCheck";
const router = express.Router();



router.post("/create-reply",authCheck, CreateReplyComment);
router.patch("/like-reply", authCheck, LikeReplyComment);
router.patch("/dis-like-reply", authCheck, DisLikeReplyComment);



module.exports = router;
