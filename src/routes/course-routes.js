const express = require("express");
const router = express.Router();

const CourseController = require("../controllers/course-controller");

router.get("/courses", CourseController.getAllCourses);
router.get("/courses/:id", CourseController.getCourseById);
router.post("/courses", CourseController.createCourse);
router.put("/courses/:id", CourseController.updateCourse);
router.patch("/courses/:id", CourseController.updateCoursePartial);
router.delete("/courses/:id", CourseController.deleteCourse);

module.exports = router;
