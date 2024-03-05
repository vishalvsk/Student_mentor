const route = require("express").Router();
const mentorsService = require("../services/mentors.service");

// create new mentor
route.post("/create", mentorsService.createMentor);

// get all mentors
route.get("/all", mentorsService.getAllMentors);

// delete mentor
route.delete("/delete/:id", mentorsService.deleteMentor);

// get mentor by id
route.get("/get/:id", mentorsService.getMentor);

module.exports = route;