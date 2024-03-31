import ProductManager from "../../dao/fileSystem/productManager.js";
import { Router } from "express";

const productManager = new ProductManager();
const router = Router();

router.post("/v1/products", async (req, res) => {
  const { title, description, price, code, stock, category } = req.body;
  const thumbnail = req.body.thumbnail ? req.body.thumbnail : [];

  try {
    const createProduct = await productManager.addProduct(
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      category
    );

    res.status(201).json("Successfully created product");
  } catch (error) {
    if (error.message.includes("All fields")) {
      res.status(400).json(error.message);
    } else if (err.message.includes("Product with")) {
      res.status(400).json(error.message);
    } else {
      res.status(500).json(error);
    }
  }
});

router.get("/v1/products", async (req, res) => {
  const { limit } = req.query;

  try {
    const products = await productManager.getProducts();

    if (products === undefined) {
      res.status(200).json([]);
    }

    if (!limit || limit < 1) {
      res.status(200).json(products);
    } else {
      const limitedProducts = products.slice(0, limit);
      res.status(206).json(limitedProducts);
    }
  } catch (err) {
    res.status(500).json(error);
  }
});

router.get("/v1/products/:pid", async (req, res) => {
  const { pid } = req.params;

  try {
    const product = await productManager.getProductById(Number(pid));

    res.status(200).json(product);
  } catch (error) {
    if (error.message.includes("Not found")) {
      res.status(404).json(error.message);
    } else {
      res.status(500).json(error);
    }
  }
});

router.put("/v1/products/:pid", async (req, res) => {
  const { pid } = req.params;
  const props = req.body;

  try {
    const updatedProduct = await productManager.updateProduct(
      Number(pid),
      props
    );

    res.status(200).json(updatedProduct);
  } catch (error) {
    if (error.message.includes("Not found")) {
      res.status(404).json(error.message);
    } else if (error.message.includes("Cannot update")) {
      res.status(404).json(error.message);
    } else {
      res.status(500).json(error);
    }
  }
});

router.delete("/v1/products/physical/:pid", async (req, res) => {
  const { pid } = req.params;

  try {
    const status = await productManager.deleteProduct(Number(pid));

    res.status(200).json(`Product with id: ${pid} was removed`);
  } catch (error) {
    if (err.message.includes("Not found")) {
      res.status(404).json(error.message);
    } else {
      res.status(500).json(error);
    }
  }
});

router.delete("/v1/products/logical/:pid", async (req, res) => {
  const { pid } = req.params;

  try {
    const status = await productManager.logicalDeleteProduct(Number(pid));

    res.status(200).json(`Product with id: ${pid} was removed`);
  } catch (error) {
    if (error.message.includes("Not found")) {
      res.status(404).json(error.message);
    } else {
      res.status(500).json(error);
    }
  }
});

export default router;
