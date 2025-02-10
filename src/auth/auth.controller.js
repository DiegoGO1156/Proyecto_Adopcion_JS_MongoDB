import { hash, verify } from 'argon2';
import User from '../users/user.model.js'
import { generarJWT } from '../helpers/generate-jwt.js'
 
export const login = async (req, res) =>{
    const {email, password, username} = req.body;
 
    try {
        const lowerEmail = email ? email.toLowerCase() : null;
        const lowerUsername = username ? username.toLowerCase() : null;

        const user = await User.findOne({
            $or: [{email: lowerEmail}, {username: lowerUsername}]
        })

 
        if (!user) {
            return res.status(400).json({
                msg: 'Credenciales incorrectas, Correo no existe en la base de datos'
            });
        }
        if (!user.state) {
            return res.status(400).json({
                msg: 'El user no existe en la base de datos'
            });
        }
        const validPassword = await verify(user.password, password);
        if (!validPassword) {
            return res.status(400).json({
                msg: "La contraseña es incorrecta"
            })
        }
        console.log("Hola")
        const token = await generarJWT(user.id);
 
        res.status(200).json({
            msg: "Inicio de sesión exitoso!!!",
            userDetails: {
                username: user.name,
                token: token,
                profilePicture: user.profilePicture    
            }
        })
 
    } catch (e) {
        console.log(e);
        res.status(500).json({
            msg: "Server error",
            error: e.message
        });
    }
}
 
export const register = async (req, res) => {
    try {
        const data = req.body
        let profilePicture = req.file ? req.file.filename : null;

        const passwordEncrypt = await hash (data.password)

        const user = await User.create({
            name: data.name,
            surname: data.surname,
            username: data.username,
            email: data.email,
            phone: data.phone,
            password: passwordEncrypt,
            role: data.role,
            profilePicture
        })

        return res.status(200).json({
            message: "Registro hecho con exito",
            userDetails: {
                user: user.email
            }
        })

    } catch (e) {
        console.log(e)
        return res.status(500).json({
            msg: "User registration falied",
            error: e.message
        })
    }
}