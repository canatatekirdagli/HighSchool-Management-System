const studentService = require("../services/student-service");
const { updateStudentSchema } = require("../services/student-service");

const getAllStudents = (req, res) => {
  const students = studentService.getAllStudents();
  const { limit = 10, offset = 0 } = req.query;
  const paginatedStudents = students.slice(offset, offset + limit);
  res.status(200).json(paginatedStudents);
};

const getStudentById = (req, res) => {
  const student = studentService.getStudentById(req.params.id);
  if (!student) {
    return res.status(404).json({ error: "Student not found" });
  }
  res.status(200).json(student);
};

const createStudent = (req, res) => {
  const { firstName, lastName, grades, classRoom } = req.body;
  const newStudent = studentService.createStudent({
    firstName,
    lastName,
    grades,
    classRoom,
  });
  res.status(201).json(newStudent);
};

const updateStudent = (req, res) => {
  const updates = req.body;
  const student = studentService.updateStudent(req.params.id, updates);
  if (!student) {
    return res.status(404).json({ error: "Student not found" });
  }
  res.status(200).json(student);
};

const deleteStudent = (req, res) => {
  studentService.deleteStudent(req.params.id);
  res.status(204).end();
};

const updateStudentPartial = (req, res) => {
  const studentId = req.params.id;
  const updates = req.body;

  const existingStudent = studentService.getStudentById(studentId);
  if (!existingStudent) {
    return res.status(404).json({ error: "Student not found" });
  }

  try {
    updateStudentSchema.validateSync(updates, { strict: false });
    const updatedStudent = {
      ...existingStudent,
      ...updates,
    };
    const result = studentService.updateStudent(studentId, updatedStudent);
    res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ error: `Invalid data: ${error.message}` });
  }
};

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  updateStudentPartial,
};
