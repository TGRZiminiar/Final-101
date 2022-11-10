import express from "express";
import { CreateStore, GetStore, GetSingleStoreForUploadImage,UploadImageStore, DeleteImageStore, GetStoreDetailUpdate, GetAllStore, GetSingleStore } from "../Controllers/store.controller";
import { AdminCheck, authCheck } from "../Middleware/authCheck";
import upload from "../Middleware/uploadImage";
const router = express.Router();


router.post("/create-store",authCheck, AdminCheck, CreateStore);
router.get("/get-store",authCheck, AdminCheck, GetStore);
router.get("/get-single-store-upload-image",authCheck, AdminCheck, GetSingleStoreForUploadImage);
router.get("/get-single-update-store",authCheck, AdminCheck, GetStoreDetailUpdate);
router.get("/get-single-store", GetSingleStore);

router.post("/upload-image-store",authCheck, AdminCheck, upload.array("images",8), UploadImageStore);
router.patch("/delete-image-store",authCheck, AdminCheck, DeleteImageStore)

router.get("/get-all-store", GetAllStore);
module.exports = router;