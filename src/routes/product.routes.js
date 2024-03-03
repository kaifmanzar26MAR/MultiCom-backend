import { Router } from "express";
import { AddProduct, UpdateProduct} from "../controllers/product.controller.js";

const router = Router();

router.route("/addproduct").post(AddProduct);
router.route("/updateproduct").post(UpdateProduct);

export default router;
