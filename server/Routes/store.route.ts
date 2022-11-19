import express from "express";
import { CreateStore, GetStore, GetSingleStoreForUploadImage, UploadImageHeaderStore, GetImageHeader, UploadImageStore, DeleteImageStore,RemoveStore, UserAddBookMark,GetStoreDetailUpdate, ChangeSequenceMenu, AddSingleMenuToStore, GetAllStore, GetSingleStore, UpdateStore, GetDataUploadImageMenu, GetSingleMenuData, UploadMenuStore, RemoveMenuStore } from "../Controllers/store.controller";
import { AdminCheck, authCheck } from "../Middleware/authCheck";
import upload from "../Middleware/uploadImage";
const router = express.Router();


router.post("/create-store",authCheck, AdminCheck, CreateStore);
router.get("/get-store",authCheck, AdminCheck, GetStore);
router.get("/get-single-store-upload-image",authCheck, AdminCheck, GetSingleStoreForUploadImage);
router.get("/get-single-update-store",authCheck, AdminCheck, GetStoreDetailUpdate);
router.get("/get-single-store", GetSingleStore);
router.get("/get-all-store", GetAllStore);
router.get("/get-data-upload-image-menu",authCheck, AdminCheck, GetDataUploadImageMenu);
router.get("/get-single-menu",authCheck, AdminCheck, GetSingleMenuData);
router.get("/get-single-store-image-header",authCheck, AdminCheck, GetImageHeader);

router.post("/upload-image-store",authCheck, AdminCheck, upload.array("images",8), UploadImageStore);
router.post("/upload-image-menu",authCheck, AdminCheck, upload.array("images",1), UploadMenuStore);


router.delete("/remove-menu",authCheck, AdminCheck, RemoveMenuStore);
router.delete("/remove-store",authCheck, AdminCheck, RemoveStore);

router.patch("/add-menu",authCheck,AdminCheck, upload.array("images",1), AddSingleMenuToStore);
router.patch("/delete-image-store",authCheck, AdminCheck, DeleteImageStore);
router.patch("/update-store",authCheck, AdminCheck, UpdateStore);
router.patch("/change-sequence-menu",authCheck, AdminCheck, ChangeSequenceMenu);
router.patch("/add-book-mark", authCheck, UserAddBookMark);
router.patch("/upload-image-header",authCheck, AdminCheck, upload.array("images",1), UploadImageHeaderStore);

module.exports = router;