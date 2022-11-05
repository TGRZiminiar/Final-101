import express from "express";
import { AddCommentToStore } from "../Controllers/comment.controller";
import { CreateStore, GetStore, GetSingleStore,UploadImageStore, DeleteImageStore, GetStoreDetailUpdate } from "../Controllers/store.controller";
import { AdminCheck, authCheck } from "../Middleware/authCheck";
import upload from "../Middleware/uploadImage";
const router = express.Router();


router.post("/create-comment",authCheck, AddCommentToStore);

module.exports = router;