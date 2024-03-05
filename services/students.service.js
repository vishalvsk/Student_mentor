const Student = require("../models/student.model");
const Mentor = require("../models/mentor.model");

module.exports = {
    async createStudent(req, res) {
        try {
            const { name, batch, mentor } = req.body;

            const student = await Student.create({ name, batch, mentor });
            if (mentor.length) {
                await Mentor.findOneAndUpdate({ _id: mentor },
                    { $push: { students: student._id } })
            }

            res.send(student);
        }
        catch (err) {
            console.log(err);
            res.status(500).send("error creating student");
        }
    },
    async updateStudent(req, res) {
        try {
            const { name, batch, mentor } = req.body;



            const student = await Student.findOneAndUpdate({ _id: req.params.id }, {
                $set: { name, batch, mentor }
            });

            if (student.mentor?.length) {
                await Mentor.findOneAndUpdate({ _id: student.mentor }, {
                    $pull: { students: student._id }
                });
            }
            if (mentor.length) {
                await Mentor.findOneAndUpdate({ _id: mentor }, {
                    $push: { students: student._id }
                });
            }


            res.send(student);
        }
        catch (err) {
            console.log(err);
            res.status(500).send("error updating student");
        }
    },
    async getAllStudents(req, res) {
        try {

            const students = await Student.find()
                .sort({ createdAt: -1 });

            res.send(students);

        }
        catch (err) {
            console.log(err);
            res.status(500).send("error getting students");
        }
    },
    async getUnAssignedStudents(req, res) {
        try {

            const students = await Student.find({ mentor: "" })
                .sort({ createdAt: -1 });

            res.send(students);

        }
        catch (err) {
            console.log(err);
            res.status(500).send("error getting students");
        }
    },
    async getStudent(req, res) {
        try {

            const student = await Student.findById(req.params.id)
                .populate("mentor", "name");

            res.send(student);

        }
        catch (err) {
            console.log(err);
            res.status(500).send("error getting student");
        }
    },
    async deleteStudent(req, res) {
        try {

            const student = await Student.findOneAndDelete({ _id: req.params.id });
            console.log("student", student);

            if (student.mentor?.length) {
                await Mentor.findOneAndUpdate({ _id: student.mentor }, {
                    $pull: { students: student._id }
                });
            }

            res.send("deleted");

        }
        catch (err) {
            console.log(err);
            res.status(500).send("error deleting student");
        }
    }
}