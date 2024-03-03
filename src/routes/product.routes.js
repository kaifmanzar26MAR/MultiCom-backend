import { Router } from "express";
import { AddProduct } from "../controllers/product.controller.js";

const router = Router();

router.route("/addproduct").post(AddProduct);

export default router;
