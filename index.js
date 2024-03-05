const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");

const homeRoute = require("./routes/home.route");
const studentsRoute = require("./routes/students.route");
const mentorsRoute = require("./routes/mentors.route");

const app = express();

dotenv.config();

// Connecting to mongoDb Atlas
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

console.log("connected to mongo");

// Middlewares
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/mentors", mentorsRoute);

app.use("/students", studentsRoute);

app.use("/", homeRoute);

app.listen(process.env.PORT || 3002, () => console.log("server running"));
