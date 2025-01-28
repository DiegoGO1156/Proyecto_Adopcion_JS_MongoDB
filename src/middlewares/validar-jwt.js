import jwt from "jsonwebtoken"

import User from "../users/user.model"

//req es una petición, un resp es una respuesta
export const valueJWT = async (req, resp, next)=>{
    const token = req.header("x-token");

    if(!token){
        return resp.status(401).json({
            msg: "No hay token para la petición"
        })
    }
    try {
        const {uid} = jwt.verify(token, process.env.SECRETOPRIVATEKEY)
        const usuario = await User.findById(uid)
        if(!usuario){
            return resp.status(401).json({
                msg:"usuario no existe en la base de datos"
            })
        }
        if(!usuario.state){
            return resp.status(401).json({
                msg:"Token no valido - usuario con estado: False"
            })
        }
        req.usuario = usuario;
        next();
    } catch (e) {
        console.log(e)
        resp.status(401).json({
            msg: "Token no valido"
        })
    }
}