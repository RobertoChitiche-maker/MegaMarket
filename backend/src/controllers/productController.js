const prisma = require("../prismaClient");

// Criar produto
async function createProduct(req, res) {
  try {
    const { name, description, price, image, stock, categoryId } = req.body;

    if (!name || !description || !price || !categoryId) {
      return res.status(400).json({
        message: "Nome, descrição, preço e categoria são obrigatórios.",
      });
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: Number(price),
        image,
        stock: Number(stock) || 0,
        categoryId: Number(categoryId),
      },
      include: {
        category: true,
      },
    });

    return res.status(201).json({
      message: "Produto criado com sucesso.",
      product,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao criar produto.",
      error: error.message,
    });
  }
}

// Listar produtos
async function getProducts(req, res) {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        id: "desc",
      },
      include: {
        category: true,
      },
    });

    return res.json(products);
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao listar produtos.",
      error: error.message,
    });
  }
}

// Buscar produto pelo ID
async function getProductById(req, res) {
  try {
    const { id } = req.params;

    const product = await prisma.product.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        category: true,
      },
    });

    if (!product) {
      return res.status(404).json({
        message: "Produto não encontrado.",
      });
    }

    return res.json(product);
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao buscar produto.",
      error: error.message,
    });
  }
}

// Atualizar produto
async function updateProduct(req, res) {
  try {
    const { id } = req.params;
    const { name, description, price, image, stock, categoryId } = req.body;

    const product = await prisma.product.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        description,
        price: price !== undefined ? Number(price) : undefined,
        image,
        stock: stock !== undefined ? Number(stock) : undefined,
        categoryId: categoryId !== undefined ? Number(categoryId) : undefined,
      },
      include: {
        category: true,
      },
    });

    return res.json({
      message: "Produto atualizado com sucesso.",
      product,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao atualizar produto.",
      error: error.message,
    });
  }
}

// Remover produto
async function deleteProduct(req, res) {
  try {
    const { id } = req.params;

    await prisma.product.delete({
      where: {
        id: Number(id),
      },
    });

    return res.json({
      message: "Produto removido com sucesso.",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao remover produto.",
      error: error.message,
    });
  }
}

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};