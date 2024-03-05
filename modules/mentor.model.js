const mongoose = require("mongoose");

const mentorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    students: {
        type: [{ type: String }],
        ref: "Student",
        default: []
    }

}, { timestamps: true });

module.exports = mongoose.model("Mentor", mentorSchema, "mentors");