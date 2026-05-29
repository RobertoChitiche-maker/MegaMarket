const prisma = require("../prismaClient");

// Criar categoria
async function createCategory(req, res) {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "O nome da categoria é obrigatório.",
      });
    }

    const categoryExists = await prisma.category.findUnique({
      where: { name },
    });

    if (categoryExists) {
      return res.status(400).json({
        message: "Esta categoria já existe.",
      });
    }

    const category = await prisma.category.create({
      data: {
        name,
        description,
      },
    });

    return res.status(201).json({
      message: "Categoria criada com sucesso.",
      category,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao criar categoria.",
      error: error.message,
    });
  }
}

// Listar categorias
async function getCategories(req, res) {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        id: "desc",
      },
      include: {
        products: true,
      },
    });

    return res.json(categories);
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao listar categorias.",
      error: error.message,
    });
  }
}

// Atualizar categoria
async function updateCategory(req, res) {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const category = await prisma.category.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        description,
      },
    });

    return res.json({
      message: "Categoria atualizada com sucesso.",
      category,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao atualizar categoria.",
      error: error.message,
    });
  }
}

// Remover categoria
async function deleteCategory(req, res) {
  try {
    const { id } = req.params;

    await prisma.category.delete({
      where: {
        id: Number(id),
      },
    });

    return res.json({
      message: "Categoria removida com sucesso.",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao remover categoria.",
      error: error.message,
    });
  }
}

module.exports = {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
};