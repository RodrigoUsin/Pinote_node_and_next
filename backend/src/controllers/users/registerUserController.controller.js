import generateErrorUtils from "../../utils/generateErrorUtils.js";
import registerUserService from "../../services/users/registerUserService.service.js";

const registerUserController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email) throw generateErrorUtils("Se esperaba email", 400);

    if (!password) throw generateErrorUtils("Se esperaba password", 400);

    await registerUserService(email, password);
    res.send({
      status: "ok",
      message: "Usuario creado correctamente.",
    });
  } catch (error) {
    next(error);
  }
};

export default registerUserController;
