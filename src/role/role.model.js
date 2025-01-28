import mongoose from "mongoose";

const roleSchema = mongoose.Schema({
    role:{
        type: String,
        require: [true, "El rol es obligatorio"]
    }
})

export default mongoose.model("Role", roleSchema)