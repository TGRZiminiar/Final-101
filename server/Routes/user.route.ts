import express from "express";
import { CurrentUser, ListAllImage, LoginUser, RegisterUser, UpLoadImageCon } from "../Controllers/user.controller";
import { authCheck } from "../Middleware/authCheck";
import upload from "../Middleware/uploadImage";
import validate from "../Middleware/validateResource";
import { createUserSchema, loginSchema } from "../Schema/user.schema";

const router = express.Router();

router.post("/register", validate(createUserSchema), RegisterUser);
router.post("/login", validate(loginSchema), LoginUser);
router.get("/current-user", authCheck, CurrentUser);

router.post("/test",upload.array("images",5), UpLoadImageCon);
router.get("/test2",ListAllImage)
module.exports = router;