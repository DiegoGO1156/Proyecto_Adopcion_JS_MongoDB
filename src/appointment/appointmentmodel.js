import { Schema, model } from "mongoose";

const appointmentSchema = Schema ({
    pet:{
        type: Schema.Types.ObjectId,
        ref: "pet",
        required:true
    },
    date:{
        type: String,
        required: true
    },
    problem: {
        type:String,
        required: true
    },
    vet:{
        type: String,
        required: true
    },
    status:{
        type: Boolean,
        default: true
    }
},
{
        timestamps: true,
        versionKey: false
});

export default model("Cita", appointmentSchema)