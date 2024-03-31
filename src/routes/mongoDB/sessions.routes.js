import { UserModel } from "../../dao/models/user.model.js"
import { Router } from "express";

const router = Router();

router.post("/v1/sesssion/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email, password });

  if (!user) return res.redirect("/");

  req.session.user = user;

  return res.redirect("/products/realtimeproducts");
});

router.post("/v1/sesssion/register", async (req, res) => {
  const user = req.body;

  if (
    user.email === "verferna@admin.com" &&
    user.password === "adminVF123"
  ) {
    user.rol = "admin";
  }

  await UserModel.create(user);

  return res.redirect("/");
});

router.get("/v1/sesssion/logout", (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      res.json({ message: error });
    }
    res.redirect("/");
  });
});

export default router;