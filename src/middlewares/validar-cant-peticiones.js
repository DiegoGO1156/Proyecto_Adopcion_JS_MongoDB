import rateLimit from "express-rate-limit"

const limiter = rateLimit({
    windowsMs: 15*60*1000, //15 minutos
    max: 100,
    message:{
        sucess: false,
        msg: "Demasiadas peticiones desde la misma IP, Intente denuevo en 15 minutos"
    }
})

export default limiter;