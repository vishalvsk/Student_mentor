const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    batch: {
        type: String,
        required: true,
        trim: true
    },
    mentor: {
        type: String,
        default: ""
    }

}, { timestamps: true });
module.exports = mongoose.model("Student", studentSchema, "students");