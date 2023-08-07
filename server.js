const express = require("express");
const app = express();

app.use(express.json());

app.use((req, res, next) => {
  const date = new Date().toISOString();
  const method = req.method;
  const url = req.originalUrl;
  console.log(`[${date}] ${method} ${url}`);
  next();
});

const studentRoutes = require("./src/routes/student-routes");
const gradeRoutes = require("./src/routes/grade-routes");
const courseRoutes = require("./src/routes/course-routes");
const classRoomRoutes = require("./src/routes/classroom-routes");
const teacherRoutes = require("./src/routes/teacher-routes");

app.use(studentRoutes);
app.use(gradeRoutes);
app.use(courseRoutes);
app.use(classRoomRoutes);
app.use(teacherRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

module.exports = app;
