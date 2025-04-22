import jwt from "jsonwebtoken";
import generateErrorUtils from "../utils/generateErrorUtils.js";

const authUser = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      throw generateErrorUtils("Se esperaba token por header", 401);
    }

    let tokenInfo;
    try {
      const token = authorization.split(" ")[1];
      tokenInfo = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      throw generateErrorUtils("Credenciales inválidas", 401);
    }
    console.log(
      "Middleware ejecutado, usuario autenticado con ID:",
      tokenInfo.userId
    );
    req.userId = tokenInfo.userId;

    next();
  } catch (error) {
    next(error);
  }
};

export default authUser;
