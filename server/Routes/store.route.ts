import express from "express";
import { CreateStore, GetStore, GetSingleStore,UploadImageStore, DeleteImageStore, GetStoreDetailUpdate } from "../Controllers/store.controller";
import { AdminCheck, authCheck } from "../Middleware/authCheck";
import upload from "../Middleware/uploadImage";
const router = express.Router();


router.post("/create-store",authCheck, AdminCheck, CreateStore);
router.get("/get-store",authCheck, AdminCheck, GetStore);
router.get("/get-single-store",authCheck, AdminCheck, GetSingleStore);
router.get("/get-single-update-store",authCheck, AdminCheck, GetStoreDetailUpdate);
router.post("/upload-image-store",authCheck, AdminCheck, upload.array("images",8), UploadImageStore);
router.patch("/delete-image-store",authCheck, AdminCheck, DeleteImageStore)
module.exports = router;