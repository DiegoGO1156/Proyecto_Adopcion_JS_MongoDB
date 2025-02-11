import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";
import { saveCita } from "./appointment.controller.js";
import { valueJWT } from "../middlewares/validar-jwt.js";

const router = Router()

router.post(
    "/",
    [
        valueJWT,
        check("pet", "No existe una mascota con este nombre").not().isEmpty(),
        validarCampos
    ],
    saveCita
)

export default router;