const express = require("express");
const router = express.Router();

const GradeController = require("../controllers/grade-controller");

router.get("/grades", GradeController.getAllGrades);
router.get("/grades/:id", GradeController.getGradeById);
router.post("/grades", GradeController.createGrade);
router.put("/grades/:id", GradeController.updateGrade);
router.patch("/grades/:id", GradeController.updateGradePartial);
router.delete("/grades/:id", GradeController.deleteGrade);

module.exports = router;
