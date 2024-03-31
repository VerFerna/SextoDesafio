import CartManager from "../../dao/mongoDB/cartManager.js"
import { Router } from "express";
const cartManager = new CartManager();
const router = Router();

router.get("/:cid", async (req, res) => {
  const { cid } = req.params;

  try {
    const cart = await cartManager.getCartById(cid);

    cart.title = "Margarita Maia | Cart"

    res.render("cart", cart);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
