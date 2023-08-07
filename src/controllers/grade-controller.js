const gradeService = require("../services/grade-service");

const getAllGrades = (req, res) => {
  const grades = gradeService.getAllGrades();

  const { limit = 10, offset = 0 } = req.query;
  const paginatedGrades = grades.slice(
    parseInt(offset),
    parseInt(offset) + parseInt(limit)
  );
  res.status(200).json(paginatedGrades);
};

const getGradeById = (req, res) => {
  const grade = gradeService.getGradeById(req.params.id);
  if (!grade) {
    return res.status(404).json({ error: "Grade not found" });
  }
  res.status(200).json(grade);
};

const createGrade = (req, res) => {
  const { name, grades } = req.body;
  const newGrade = gradeService.createGrade({
    name,
    grades,
  });
  res.status(201).json(newGrade);
};

const updateGrade = (req, res) => {
  const updates = req.body;
  const grade = gradeService.updateGrade(req.params.id, updates);
  if (!grade) {
    return res.status(404).json({ error: "Grade not found" });
  }
  res.status(200).json(grade);
};

const deleteGrade = (req, res) => {
  gradeService.deleteGrade(req.params.id);
  res.status(204).end();
};

const updateGradePartial = (req, res) => {
  const gradeId = req.params.id;
  const updates = req.body;

  const existingGrade = gradeService.getGradeById(gradeId);
  if (!existingGrade) {
    return res.status(404).json({ error: "Grade not found" });
  }

  try {
    gradeService.updateGradePartial(gradeId, updates);
    res.status(200).json(existingGrade);
  } catch (error) {
    return res.status(400).json({ error: `Invalid data: ${error.message}` });
  }
};

module.exports = {
  getAllGrades,
  getGradeById,
  createGrade,
  updateGrade,
  deleteGrade,
  updateGradePartial,
};
