import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Product } from "../models/products.model.js";

const AddProduct = asyncHandler(async (req, res) => {
  const {
    product_name,
    added_by,
    product_title,
    product_price,
    product_discount,
    product_quantity,
    product_description,
    product_brand,
    product_imageUrl,
  } = req.body;
  if (
    [   product_name,
        added_by,
        product_title,
        product_description,
        product_brand,
        product_imageUrl,
    ].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  if(product_quantity<=0){
    throw new ApiError(500, "Product quantity cant be less or equal to 0")
  }
  if(product_discount<=0){
    throw new ApiError(500, "Product discount cant be less or equal to 0")
  }
  if(product_price<=0){
    throw new ApiError(500, "Product price cant be less or equal to 0")
  }

  const isProducteists = await Product.findOne({ product_name });
  if (isProducteists) {
    throw new ApiError(500, "Prodcut already exists");
  }

  const newProduct = await Product.create({
    product_name,
    added_by,
    product_title,
    product_price,
    product_discount,
    product_quantity,
    product_description,
    product_brand,
    product_imageUrl,
  });

  if (!newProduct) {
    throw new ApiError(500, "Something went worng in creating Product");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, newProduct, "Prodcut created Successfully"));
});
export { AddProduct };
