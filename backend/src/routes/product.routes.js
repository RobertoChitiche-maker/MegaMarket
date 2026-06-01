const express = require("express");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar produtos." });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, category, price, stock, image, description } = req.body;

    if (!name || !category || !price || !stock) {
      return res.status(400).json({
        message: "Preencha nome, categoria, preço e stock.",
      });
    }

    const product = await prisma.product.create({
      data: {
        name,
        category,
        price,
        stock: Number(stock),
        image: image || "",
        description: description || "Produto disponível para venda.",
      },
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "Erro ao cadastrar produto." });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.product.delete({
      where: { id: Number(id) },
    });

    res.json({ message: "Produto eliminado com sucesso." });
  } catch (error) {
    res.status(500).json({ message: "Erro ao eliminar produto." });
  }
});

module.exports = router;