import loginUserService from "../../services/users/loginUserService.service.js";
import generateErrorUtils from "../../utils/generateErrorUtils.js";
import jwt from "jsonwebtoken";

const loginUserController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email) throw generateErrorUtils("Se esperaba email", 400);
    if (!password) throw generateErrorUtils("Se esperaba password", 400);

    const { userId } = await loginUserService(email, password);

    const token = jwt.sign({ userId: email }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.send({
      status: "ok",
      message: "Usuario logueado correctamente.",
      userId,
      token,
    });
  } catch (error) {
    next(error);
  }
};

export default loginUserController;
