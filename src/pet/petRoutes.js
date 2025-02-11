import { Router } from "express";
import { check } from "express-validator";
import { deletePet, getPets, savePet, searchPet, updatePet } from "./pet.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import {valueJWT} from "../middlewares/validar-jwt.js"
import { tieneRole } from "../middlewares/validar-roles.js";
import { existePetById } from "../helpers/db-validator.js";

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

router.get(
    "/",
    getPets
)

router.get(
    "/:id",
    [
        valueJWT,
        check("id", "No es un ID valido").isMongoId(),
        validarCampos
    ],
    searchPet
)

router.put(
    "/:id",
    [
        check("id", "No es un ID valido").isMongoId(),
        check("id").custom(existePetById),
        validarCampos
    ],
    updatePet
)

router.delete(
    "/:id",
    [
        valueJWT,
        tieneRole("ADMIN_ROLE"),
        check("id", "No es un ID valido").isMongoId(),
        validarCampos
    ],
    deletePet
)

export default router;