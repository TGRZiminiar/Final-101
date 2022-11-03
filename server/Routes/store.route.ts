import express from "express";
import { CreateStore } from "../Controllers/store.controller";
import { AdminCheck, authCheck } from "../Middleware/authCheck";

const router = express.Router();


router.post("/create-store",authCheck, AdminCheck, CreateStore);

module.exports = router;