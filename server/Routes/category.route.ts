import express from "express";
import { CreateCategory, DeleteCategory, ListAllCategory, UpdateCategory, ListAllCatogories } from "../Controllers/category.controller";
import { AdminCheck, authCheck } from "../Middleware/authCheck";
import upload from "../Middleware/uploadImage";

const router = express.Router();


router.post("/create-category",authCheck, AdminCheck, upload.array("images",1), CreateCategory);
router.patch("/update-category",authCheck, AdminCheck, upload.array("images",1), UpdateCategory);
router.delete("/delete-category",authCheck, AdminCheck, DeleteCategory);
router.get("/get-all-category",authCheck, AdminCheck, ListAllCategory);

router.get("/list-categories",ListAllCatogories);

/* 
CreateCategory
UpdateCategory
ListAllCategory
DeleteCategory
 */
module.exports = router;