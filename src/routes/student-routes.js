const express = require("express");
const router = express.Router();
const studentController = require("../controllers/student-controller");

router.get("/students", studentController.getAllStudents);
router.get("/students/:id", studentController.getStudentById);
router.post("/students", studentController.createStudent);
router.put("/students/:id", studentController.updateStudent);
router.patch("/students/:id", studentController.updateStudentPartial);
router.delete("/students/:id", studentController.deleteStudent);

module.exports = router;
