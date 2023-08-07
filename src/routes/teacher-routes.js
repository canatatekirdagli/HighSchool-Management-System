const express = require("express");
const router = express.Router();

const TeacherController = require("../controllers/teacher-controller");

router.get("/teachers", TeacherController.getAllTeachers);
router.get("/teachers/:id", TeacherController.getTeacherById);
router.post("/teachers", TeacherController.createTeacher);
router.put("/teachers/:id", TeacherController.updateTeacher);
router.patch("/teachers/:id", TeacherController.updateTeacherPartial);
router.delete("/teachers/:id", TeacherController.deleteTeacher);

module.exports = router;
