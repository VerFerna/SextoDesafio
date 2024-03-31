import mongoose from "mongoose";

import { ProductModel } from "../models/product.model.js";
import { getLocaleTime } from "../../helpers/utils.js";

class ProductManager {
  addProduct = async (product) => {
    try {
      const validate = await ProductModel.findOne({ code: product.code });

      if (validate) {
        console.log(
          `Product with code ${
            product.code
          } already exists - ${getLocaleTime()}`
        );
        throw new Error(`Product with code ${product.code} already exists`);
      }

      product.status = product.stock > 0 ? true : false;
      await ProductModel.create(product);

      console.log(`Product was loaded successfully - ${getLocaleTime()}`);

      const Reproducts = await this.getProducts();

      return Reproducts;
    } catch (error) {
      throw error;
    }
  };

  getProducts = async (limit) => {
    try {
      const products = await ProductModel.find().limit(Number(limit));

      return products;
    } catch (error) {
      console.log("Products not found");
      return [];
    }
  };

  getProductById = async (idP) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(idP)) {
        console.log(`Invalid product ID - ${getLocaleTime()}`);
        throw new Error("Invalid product ID");
      }

      const product = await ProductModel.findById(idP);

      if (!product) {
        console.log(`Not found Product - ${getLocaleTime()}`);
        throw new Error("Not found Product");
      }

      return product;
    } catch (error) {
      throw error;
    }
  };

  updateProduct = async (idP, props) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(idP)) {
        console.log(`Invalid product ID - ${getLocaleTime()}`);
        throw new Error("Invalid product ID");
      }

      if (props.hasOwnProperty("id") || props.hasOwnProperty("code")) {
        console.log(
          `Cannot update 'id' or 'code' property - ${getLocaleTime()}`
        );
        throw new Error("Cannot update 'id' or 'code' property");
      }

      if (props.hasOwnProperty("stock")) {
        props.status = props.stock > 0 ? true : false;
      }

      const newProduct = await ProductModel.findByIdAndUpdate(idP, props, {
        new: true,
      });

      if (!newProduct) {
        console.log(`Not found Product - ${getLocaleTime()}`);
        throw new Error(`Not found Product`);
      }

      console.log(newProduct);
      return newProduct;
    } catch (error) {
      throw error;
    }
  };

  deleteProduct = async (idP) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(idP)) {
        console.log(`Invalid product ID - ${getLocaleTime()}`);
        throw new Error("Invalid product ID");
      }

      const productDeleted = await ProductModel.findByIdAndDelete(idP);

      if (!productDeleted) {
        console.log(`Not found Product - ${getLocaleTime()}`);
        throw new Error("Not found Product");
      }

      console.log(`Product removed - ${getLocaleTime()}`);
      return true;
    } catch (error) {
      throw error;
    }
  };

  logicalDeleteProduct = async (idP) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(idP)) {
        console.log(`Invalid product ID - ${getLocaleTime()}`);
        throw new Error("Invalid product ID");
      }

      const updatedProduct = await ProductModel.findByIdAndUpdate(
        idP,
        { status: false },
        { new: true }
      );

      if (!updatedProduct) {
        console.log(`Not found Product - ${getLocaleTime()}`);
        throw new Error("Not found Product");
      }

      console.log(`Product removed - ${getLocaleTime()}`);
      return true;
    } catch (error) {
      throw error;
    }
  };
}

export default ProductManager;
