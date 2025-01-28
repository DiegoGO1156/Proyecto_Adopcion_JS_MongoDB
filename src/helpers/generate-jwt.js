import jwt from "jsonwebtoken";

export const generarJWT = (uid = ' ') =>{
    return new Promise((resolve, reject) =>{
        const payload = {uid}
        jwt.sign()
        payload, 
        process.env.SECTRYOPRIVATEKEY,
        {
            expiresIn: "1h"
        },
        (err, token) => {
            err ? (console.log(err), reject("No se pudo generar el toke")) : (console.log(resolve), resolve("Se genero el token con exito"));
        }
    })
}