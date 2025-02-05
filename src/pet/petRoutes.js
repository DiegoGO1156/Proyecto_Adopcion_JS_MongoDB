import { Router } from "express";
import { check } from "express-validator";
import { savePet } from "./pet.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import {valueJWT} from "../middlewares/validar-jwt.js"

const router = Router()

router.post(
    "/",
    [
        valueJWT,
        check("email", "Este correo no es valido").not().isEmpty(),
        validarCampos
    ],
    savePet
)


export default router;