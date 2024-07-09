import mongoose from "mongoose";

const medicalRecordsSchema = new mongoose.Schema({

},{timestamps : true})



export const MedicalRecord = mongoose.model("MedicalRecord",medicalRecordsSchema)