const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "Token não fornecido.",
      });
    }

    const parts = authHeader.split(" ");

    if (parts.length !== 2) {
      return res.status(401).json({
        message: "Token inválido.",
      });
    }

    const [scheme, token] = parts;

    if (scheme !== "Bearer") {
      return res.status(401).json({
        message: "Formato do token inválido.",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    return next();
  } catch (error) {
    return res.status(401).json({
      message: "Token inválido ou expirado.",
    });
  }
}

function adminMiddleware(req, res, next) {
  if (req.user.role !== "ADMIN") {
    return res.status(403).json({
      message: "Acesso permitido apenas para administrador.",
    });
  }

  return next();
}

module.exports = {
  authMiddleware,
  adminMiddleware,
};