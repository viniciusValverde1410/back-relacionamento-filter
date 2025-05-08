import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Verificar se o token existe
  if (!authHeader) {
    return res.status(401).json({ error: "Token não fornecido!" });
  }

  // Retirar o token do Bearer Token
  const parts = authHeader.split(" ");

  if (parts.length !== 2) {
    return res.status(401).json({ error: "Token mal formatado!" });
  }

  const [schema, token] = parts;

  // Verificar se o token é válido
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Token inválido!" });
    }

    req.userId = decoded.id;
    return next();
  });
};

export default authMiddleware;
