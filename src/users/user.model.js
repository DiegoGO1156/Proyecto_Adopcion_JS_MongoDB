import { Schema, model } from "mongoose";

const userSchema = Schema({
    name: {
        type: String,
        required: [true, "El nombre de usuario es requerido"],
        maxLength: [25, "No se pueden ingresar más de 25 caracteres"]
    },
    surname:{
        type: String,
        required: [true, "Name es requerido"],
        maxLength: [25, "No se pueden más de 25 caracteres"]
    },
    username: {
        type:String, 
        unique: true
    },
    email:{ 
        type: String,
        required: [true, "El correo es requerido"],
        unique: true
    },
    password:{
        type: String,
        required: [true, "La contraseña es requerida"],
        minLength: 8
    },
    profilePicture:{
        type: String
    },
    phone:{
        type: String,
        minLength: 8,
        maxLength: 8,
        required: [true, "El número telefonico es requerido"]
    },
    role:{
        type: String,
        required: true,
        enum: ["ADMIN_ROLE", "USER_ROLE"]
    },
    state: {
        type: Boolean,
        default: true
    }
},
    {
        timestamps:true,
        versionKey: false
    }
);

userSchema.methods.toJSON = function (){
    const {_v, password_, _id, ...usuario} = this.toObject();
    usuario.uid = _id;
    return usuario;
}

export default model ('User', userSchema);