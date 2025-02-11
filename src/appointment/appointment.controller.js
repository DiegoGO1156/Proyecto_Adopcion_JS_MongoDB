import Cita from "./appointmentmodel.js"
import Pet from "../pet/petmodel.js"

export const saveCita = async(req, res)=>{
    try {
        const data = req.body
        const pet = await Pet.findOne({name: data.pet})
        console.log(pet)
        if(!pet){
            return res.status(404).json({
                success: false,
                msg: "La mascota no fue encontrada"
            })
        }
        const cita = new Cita({
            ...data,
            pet: pet._id,
        })

        await cita.save()
        
        res.status(200).json({
            succes: true,
            msg: "La cita fue agendada con exito"
        })

    } catch (e) {
        res.status(500).json({
            success: false,
            msg: "No se pudo agendar la cita",
            e
        })
    }
}