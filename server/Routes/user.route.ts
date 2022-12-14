import express from "express";
import { CurrentUser, ListAllImage, LoginUser, RegisterUser, UserGetBookMark, SearchFunction, UpLoadImageCon,UpdateUser,UpdatePassword } from "../Controllers/user.controller";
import { authCheck } from "../Middleware/authCheck";
import upload from "../Middleware/uploadImage";
import validate from "../Middleware/validateResource";
import { createUserSchema, loginSchema } from "../Schema/user.schema";

const router = express.Router();

router.post("/register", validate(createUserSchema), RegisterUser);
router.post("/login", validate(loginSchema), LoginUser);

router.get("/current-user", authCheck, CurrentUser);
router.get("/get-bookMark", authCheck, UserGetBookMark);
router.get("/test2",ListAllImage);

router.post("/test",upload.array("images",5), UpLoadImageCon);
router.patch("/update-user",authCheck , upload.array("images",1), UpdateUser);

router.patch("/change-password", authCheck, UpdatePassword);

router.post("/search",SearchFunction);

module.exports = router;