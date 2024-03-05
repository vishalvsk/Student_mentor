const Mentor = require("../models/mentor.model");
const Student = require("../models/student.model");

module.exports = {
    async createMentor(req, res) {
        try {
            const { name, students } = req.body;

            const mentor = await Mentor.create({ name, students });

            await Student.updateMany({ _id: { $in: students } }, { mentor: mentor.id });

            res.send(mentor);
        }
        catch (err) {
            console.log(err);
            res.status(500).send("error creating mentor");
        }
    },
    async getAllMentors(req, res) {
        try {

            const mentors = await Mentor.find().sort({ createdAt: -1 });

            res.send(mentors);

        }
        catch (err) {
            console.log(err);
            res.status(500).send("Cpuldnt get mentors");
        }
    },
    async getMentor(req, res) {
        try {

            const mentor = await Mentor.findById(req.params.id)
                .populate("students", "name");
            res.send(mentor);

        }
        catch (err) {
            console.log(err);
            res.status(500).send("error getting mentor");
        }
    },
    async deleteMentor(req, res) {
        try {

            await Mentor.deleteOne({ _id: req.params.id });

            await Student.updateMany({ mentor: req.params.id }, { $set: { mentor: "" } });

            res.send("deleted user");

        }
        catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    }
}