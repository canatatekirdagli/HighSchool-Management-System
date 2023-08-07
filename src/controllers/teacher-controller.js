const teacherService = require("../services/teacher-service");
const { updateTeacherSchema } = require("../services/teacher-service");

const getAllTeachers = (req, res) => {
  const teachers = teacherService.getAllTeachers();

  const { limit = 10, offset = 0 } = req.query;
  const paginatedTeachers = teachers.slice(offset, offset + limit);
  res.status(200).json(paginatedTeachers);
};

const getTeacherById = (req, res) => {
  const teacher = teacherService.getTeacherById(req.params.id);
  if (!teacher) {
    return res.status(404).json({ error: "Teacher not found" });
  }
  res.status(200).json(teacher);
};

const createTeacher = (req, res) => {
  const { firstName, lastName } = req.body;
  const newTeacher = teacherService.createTeacher({
    firstName,
    lastName,
  });
  res.status(201).json(newTeacher);
};

const updateTeacher = (req, res) => {
  const updates = req.body;
  const teacher = teacherService.updateTeacher(req.params.id, updates);
  if (!teacher) {
    return res.status(404).json({ error: "Teacher not found" });
  }
  res.status(200).json(teacher);
};

const deleteTeacher = (req, res) => {
  teacherService.deleteTeacher(req.params.id);
  res.status(204).end();
};

const updateTeacherPartial = (req, res) => {
  const teacherId = req.params.id;
  const updates = req.body;

  const existingTeacher = teacherService.getTeacherById(teacherId);
  if (!existingTeacher) {
    return res.status(404).json({ error: "Teacher not found" });
  }

  try {
    updateTeacherSchema.validateSync(updates, { strict: false });
    const updatedTeacher = {
      ...existingTeacher,
      ...updates,
    };

    const result = teacherService.updateTeacher(teacherId, updatedTeacher);
    res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ error: `Invalid data: ${error.message}` });
  }
};
module.exports = {
  getAllTeachers,
  getTeacherById,
  createTeacher,
  updateTeacher,
  deleteTeacher,
  updateTeacherPartial,
};
