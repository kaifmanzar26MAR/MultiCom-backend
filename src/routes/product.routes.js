import { Router } from "express";
import {
  AddProduct,
  AddReview,
  UpdateProduct,
} from "../controllers/product.controller.js";

const router = Router();

router.route("/addproduct").post(AddProduct);
router.route("/updateproduct").post(UpdateProduct);
router.route("/addreview").post(AddReview);
export default router;
