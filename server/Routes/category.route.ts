import express from "express";
import { CreateCategory, DeleteCategory, ListAllCategory, UpdateCategory } from "../Controllers/category.controller";
import { AdminCheck, authCheck } from "../Middleware/authCheck";

const router = express.Router();


router.post("/create-category",authCheck, AdminCheck, CreateCategory);
router.patch("/update-category",authCheck, AdminCheck, UpdateCategory);
router.delete("/delete-category",authCheck, AdminCheck, DeleteCategory);
router.get("/get-all-category",authCheck, AdminCheck, ListAllCategory);

/* 
CreateCategory
UpdateCategory
ListAllCategory
DeleteCategory
 */
module.exports = router;