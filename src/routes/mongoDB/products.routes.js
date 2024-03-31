import ProductManager from "../../dao/mongoDB/productManager.js";
import { Router } from "express";

const productManager = new ProductManager();
const router = Router();

router.post("/v2/products", async (req, res) => {
  const { title, description, price, code, stock, category } = req.body;
  const thumbnail = Array.isArray(req.body.thumbnail)
    ? req.body.thumbnail
    : req.body.thumbnail.length > 0
    ? [req.body.thumbnail]
    : [];

  if (
    !title ||
    !description ||
    !code ||
    !price ||
    stock === undefined ||
    !category
  ) {
    return res.status(400).json("All fields are required");
  }

  try {
    const product = {
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      category,
    };

    await productManager.addProduct(product);
    res.status(201).json("Product created successfully");
  } catch (error) {
    if (err.message.includes("Product with")) {
      res.status(409).json(error.message);
    } else {
      res.status(500).json(error);
    }
  }
});

router.get("/v2/products", async (req, res) => {
  const { limit } = req.query;
  try {
    const products = await productManager.getProducts(limit);

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/v2/products/:pid", async (req, res) => {
  let { pid } = req.params;

  try {
    const product = await productManager.getProductById(pid);

    res.status(200).json(product);
  } catch (error) {
    if (error.message.includes("Invalid product")) {
      res.status(404).json(error.message);
    } else if (error.message.includes("Not found")) {
      res.status(404).json(error.message);
    } else {
      res.status(500).json(error);
    }
  }
});

router.put("/v2/products/:pid", async (req, res) => {
  const { pid } = req.params;
  const props = req.body;

  try {
    const updatedProduct = await productManager.updateProduct(pid, props);

    res.status(200).json(updatedProduct);
  } catch (error) {
    if (error.message.includes("Invalid product")) {
      res.status(404).json(error.message);
    } else if (error.message.includes("Cannot update")) {
      res.status(404).json(error.message);
    } else if (error.message.includes("Not found")) {
      res.status(400).json(error.message);
    } else {
      res.status(500).json(error);
    }
  }
});

router.delete("/v2/products/physical/:pid", async (req, res) => {
  const { pid } = req.params;
  
  try {
    let status = await productManager.deleteProduct(pid);

    res.status(200).json(`Product with id: ${pid} was removed`);
  } catch (error) {
    if (error.message.includes("Invalid product")) {
      res.status(404).json(err.message);
    } else if (error.message.includes("Not found")) {
      res.status(404).json(error.message);
    } else {
      res.status(500).json(error);
    }
  }
});

router.delete("/v2/products/logical/:pid", async (req, res) => {
  const { pid } = req.params;
  try {
    let status = await productManager.logicalDeleteProduct(pid);

    res.status(200).json(`Product with id: ${pid} was removed`);
  } catch (error) {
    if (error.message.includes("Invalid product")) {
      res.status(404).json(error.message);
    } else if (error.message.includes("Not found")) {
      res.status(404).json(error.message);
    } else {
      res.status(500).json(error);
    }
  }
});

export default router;
