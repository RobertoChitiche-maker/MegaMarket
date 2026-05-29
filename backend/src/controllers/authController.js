const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = require("../prismaClient");

// Cadastro de cliente
async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Preencha todos os campos.",
      });
    }

    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      return res.status(400).json({
        message: "Este email já está cadastrado.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "CLIENTE",
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    return res.status(201).json({
      message: "Cliente cadastrado com sucesso.",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao cadastrar cliente.",
      error: error.message,
    });
  }
}

// Login
async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Informe email e senha.",
      });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({
        message: "Email ou senha inválidos.",
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Email ou senha inválidos.",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    return res.json({
      message: "Login efectuado com sucesso.",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao fazer login.",
      error: error.message,
    });
  }
}

// Criar administrador uma única vez
async function createAdmin(req, res) {
  try {
    const { name, email, password, secretKey } = req.body;

    if (secretKey !== "MEGAMARKET_ADMIN_2026") {
      return res.status(403).json({
        message: "Chave secreta inválida.",
      });
    }

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Preencha todos os campos.",
      });
    }

    const adminExists = await prisma.user.findFirst({
      where: { role: "ADMIN" },
    });

    if (adminExists) {
      return res.status(400).json({
        message: "Já existe um administrador cadastrado.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "ADMIN",
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    return res.status(201).json({
      message: "Administrador criado com sucesso.",
      admin,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao criar administrador.",
      error: error.message,
    });
  }
}

module.exports = {
  register,
  login,
  createAdmin,
};