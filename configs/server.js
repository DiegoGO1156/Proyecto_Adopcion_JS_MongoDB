"use strict";

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { dbConection } from "./mongo.js";
import limiter from "../src/middlewares/validar-cant-peticiones.js"
import authRoutes from "../src/auth/auth.routes.js"
import userRoutes from "../src/users/user.routes.js";
import petRoutes from "../src/pet/petRoutes.js";


const middlewares = (app)=>{
    app.use(express.urlencoded({extended: false}))
    app.use(cors())
    app.use(express.json())
    app.use(helmet())
    app.use(morgan('dev'))
    app.use(limiter)
}

const routes = (app)=>{
    app.use("/proyecto_adopcion/v1/auth", authRoutes)
    app.use("/proyecto_adopcion/v1/user", userRoutes)
    app.use("/proyecto_adopcion/v1/pet", petRoutes)
}

const conectDB = async()=>{
    try {
        await dbConection();
        console.log("La conexión con la base de datos ha sido exitosa")
    } catch (err) {
        console.log("Error intentando conectar con la Base de Datos")
        process.exit(1)        
    }
}

export const initServer = async()=>{
    const app = express();
    const Port = process.env.PORT||3000;

    try {
        middlewares(app);
        conectDB()
        routes(app);
        app.listen(Port)
        console.log(`server init in port ${Port}`)     
    } catch (err) {
        console.log(`Server falied intit ${err}`)
    }
    /*
    await conectDB();
    configMiddlewares(app);
    configRoute(app);

    app.listen(Port, ()=>{
        console.log(`Server running on port ${Port}`)
    }*/
}