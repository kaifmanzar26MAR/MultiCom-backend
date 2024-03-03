import { Router } from "express";
import {
  AddProduct,
  AddReview,
  GetAllProducts,
  UpdateProduct,
  GetProductbyId
} from "../controllers/product.controller.js";

const router = Router();

router.route("/addproduct").post(AddProduct);
router.route("/updateproduct").post(UpdateProduct);
router.route("/addreview").post(AddReview);
router.route("/getallproducts").get(GetAllProducts);
router.route("/getproductbyid").post(GetProductbyId)
export default router;
