import express from "express";
import { CurrentUser, LoginUser, RegisterUser } from "../Controllers/user.controller";
import { authCheck } from "../Middleware/authCheck";
import validate from "../Middleware/validateResource";
import { createUserSchema, loginSchema } from "../Schema/user.schema";

const router = express.Router();

router.post("/register", validate(createUserSchema), RegisterUser);
router.post("/login", validate(loginSchema), LoginUser);
router.get("/current-user", authCheck, CurrentUser);


module.exports = router;