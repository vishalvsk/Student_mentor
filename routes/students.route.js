const route = require("express").Router();
const studentsServices = require("../services/students.service");

// create student
route.post("/create", studentsServices.createStudent);

// update student
route.put("/update/:id", studentsServices.updateStudent);

//delete student
route.delete("/delete/:id", studentsServices.deleteStudent);

// get all students
route.get("/all", studentsServices.getAllStudents);

// get unassigned students
route.get("/unassigned", studentsServices.getUnAssignedStudents);

// get student by id
route.get("/get/:id", studentsServices.getStudent);

module.exports = route;