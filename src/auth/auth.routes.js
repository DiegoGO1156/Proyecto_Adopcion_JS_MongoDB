import { Router } from "express";
import { check } from "express-validator";
import { login, register } from "./auth.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { correoExiste, rolValido } from "../helpers/db-validator.js";

const router = Router()

router.post(
    "/login",
    [
        check("correo", "Este es un correo no es valido").isEmail(),
        check("password", "La contraseña es Incorrecta").not().isEmpty(),
        validarCampos,
    ],
    login
);

router.post(
    "/register",
    [
        check("nombre", "El nombre es obligatorio").not().isEmpty(),
        check("password", "La contraseña debe ser mayor a 6 caracteres").isLength({min: 6}),
        check("correo", "Este correo no es valido").isEmail(),
        check("role").custom(rolValido),
        check("correo").custom(correoExiste),
        check("phone", "El telefono debe contener 8 digitos").isLength({min:8}),
        validarCampos,
    ],
    register
);

export default router;
