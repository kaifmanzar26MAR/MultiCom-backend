import { Router } from "express";
import {
  AddProduct,
  AddReview,
  GetAllProducts,
  UpdateProduct,
  GetProductbyId,
  SearchProdcut,
  AddProductToCart,
  GetProdcutReviews,
  GetAllProductCategory,
  GetProductImageByCategory,
  GetProductsByCategory,
} from "../controllers/product.controller.js";

const router = Router();

router.route("/addproduct").post(AddProduct);
router.route("/updateproduct").post(UpdateProduct);
router.route("/addreview").post(AddReview);
router.route("/getallproducts").get(GetAllProducts);
router.route("/getproductbyid").post(GetProductbyId);
router.route("/getprodcutreviewbyid").post(GetProdcutReviews);
router.route("/search").post(SearchProdcut);
router.route("/addtocart").post(AddProductToCart);
router.route("/getallproductcategory").get(GetAllProductCategory);
router.route(`/getproductimagebycategory/:category`).get(GetProductImageByCategory)
router.route(`/getproductswithcategory/:category`).get(GetProductsByCategory)
export default router;
