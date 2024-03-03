import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Product } from "../models/products.model.js";
import { User } from "../models/user.model.js";
import { ProductReview } from "../models/productReview.model.js";

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
    [
      product_name,
      added_by,
      product_title,
      product_description,
      product_brand,
      product_imageUrl,
    ].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  if (product_quantity <= 0) {
    throw new ApiError(500, "Product quantity cant be less or equal to 0");
  }
  if (product_discount <= 0) {
    throw new ApiError(500, "Product discount cant be less or equal to 0");
  }
  if (product_price <= 0) {
    throw new ApiError(500, "Product price cant be less or equal to 0");
  }

  const isProducteists = await Product.findOne({ product_name });
  if (isProducteists) {
    throw new ApiError(500, "Prodcut already exists");
  }

  const isuserexists = await User.findOne({ _id: added_by });
  if (!isuserexists) {
    throw new ApiError(500, "User not found");
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

const UpdateProduct = asyncHandler(async (req, res) => {
  const { _id, datatoupdate } = req.body;

  const isProductexists = await Product.findOne({ _id });
  if (!isProductexists) {
    throw new ApiError(500, "Prodcut not Found");
  }

  const updatedProduct = await Product.findOneAndUpdate({ _id }, datatoupdate, {
    new: true,
  });

  if (!updatedProduct) {
    throw new ApiError(500, "Something went wrong in updation of Prodcut");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, updatedProduct, "Prodcut updated Successfully"));
});

const AddReview = asyncHandler(async (req, res) => {
    const { user_id, product_id, reviewtext } = req.body;
  
    if ([user_id, product_id, reviewtext].some((field) => field?.trim() === "")) {
      throw new ApiError(500, "All fields must be filled properly");
    }
  
    const isuserexists = await User.findOne({ _id: user_id });
    if (!isuserexists) {
      throw new ApiError(500, "User not found");
    }
  
    const isproductexists = await Product.findOne({ _id: product_id });
    if (!isproductexists) {
      throw new ApiError(500, "Product not found");
    }
  
    const newreview = await ProductReview.create({
      user_id,
      product_id,
      reviewtext,
      user_name: isuserexists.username,
    });
  
    if (!newreview) {
      throw new ApiError(500, "Something went wrong in the creation of the review");
    }
  
    const review_id = newreview._id; 
    
    const addReviewResult = await Product.updateOne(
      { _id: product_id },
      { $push: { product_reviews: {review_id} } }
    );

    if(!addReviewResult){
        throw new ApiError(500, "Something went wrong in updating review result")
    }
  
    return res
      .status(201)
      .json(new ApiResponse(200, addReviewResult, "Review added successfully"));
  });
  
  
export { AddProduct, UpdateProduct, AddReview };
