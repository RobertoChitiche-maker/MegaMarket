const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function getProducts(req, res) {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        id: "desc",
      },
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: "Erro ao listar produtos.",
      error: error.message,
    });
  }
}

async function createProduct(req, res) {
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
    res.status(500).json({
      message: "Erro ao cadastrar produto.",
      error: error.message,
    });
  }
}

async function deleteProduct(req, res) {
  try {
    const { id } = req.params;

    await prisma.product.delete({
      where: {
        id: Number(id),
      },
    });

    res.json({
      message: "Produto eliminado com sucesso.",
    });
  } catch (error) {
    res.status(500).json({
      message: "Erro ao eliminar produto.",
      error: error.message,
    });
  }
}

module.exports = {
  getProducts,
  createProduct,
  deleteProduct,
};