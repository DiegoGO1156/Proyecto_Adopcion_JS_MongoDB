import User from "../users/user.model.js"
import Pet from "./petmodel.js"

export const savePet = async (req, res) =>{
    try {
        
        const data = req.body
        const user = await User.findOne({email: data.email})

        if(!user){
            res.status(404).json({
                success: false,
                msg: "Propietario no Encontrado"
            })
        }

        const pet = new Pet({
            ...data, 
            keeper: user._id
        })

        await pet.save()

        res.status(200).json({
            success: true, 
            pet
        })
        
    } catch (e) {
        res.status(500).json({
            success: false,
            msg: "Error al guardar datos de la mascota",
            e
        })
    }
}