import loginUserService from "../../services/users/loginUserService.service.js";
import generateErrorUtils from "../../utils/generateErrorUtils.js";

const loginUserController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email) throw generateErrorUtils("Se esperaba email", 400);
    if (!password) throw generateErrorUtils("Se esperaba password", 400);

    const { userId, token } = await loginUserService(email, password);

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
