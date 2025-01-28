import Role from "../role/role.model.js"
import User from "../users/user.model.js"

export const rolValido = async (role = '') =>{
    
    const rolExistente = await Role.findOne({role})
    
    if(!rolExistente){
        throw new Error (`El rol ${role}, no existe en la base de datos`)
    }
}

export const correoExiste = async (correo = '') =>{
    const correoExist = await User.findOne({correo})
    
    if(!correoExist){
        throw new Error (`El correo ${correo} ya está en uso`)
    }
}