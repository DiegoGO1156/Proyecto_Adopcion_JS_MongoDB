import Role from "../role/role.model.js"
import User from "../users/user.model.js"
import Pet from "../pet/petmodel.js"

export const rolValido = async (role = '') =>{
    
    const rolExistente = await Role.findOne({role})
    
    if(!rolExistente){
        throw new Error (`El rol ${role}, no existe en la base de datos`)
    }
}

export const correoExiste = async (correo = '') =>{
    const correoExist = await User.findOne({correo})
    
    if(correoExist){
        throw new Error (`El correo ${correo} ya está en uso`)
    }
}

export const existeUsuarioById = async (id = "") => {
    const existeUsuarioById = await User.findById(id)
    if(!existeUsuarioById){ 
        throw new Error (`El ID ${id} No existe para los usuarios`)
    }
}

export const existePetById = async(id= '') => {
    const existePetById = await Pet.findById(id);
 
    if (!existePetById) {
        throw new Error(`El Id ${id} no existe`);
    }
}