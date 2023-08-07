const { v4: uuidv4 } = require("uuid");
const { object, string, number, array } = require("yup");

let students = [];

const studentSchema = object({
  firstName: string().required(),
  lastName: string().required(),
  grades: array().of(number().integer().min(1).max(10)).required(),
  classRoom: object().required(),
});

const updateStudentSchema = object({
  firstName: string(),
  lastName: string(),
  grades: array().of(number().integer().min(1).max(10)),
  classRoom: object(),
});

const getAllStudents = (limit = 10, offset = 0) => {
  return students.slice(offset, offset + limit);
};

const getStudentById = (id) => students.find((student) => student.id === id);

const createStudent = (data) => {
  try {
    studentSchema.validateSync(data);
    const newStudent = {
      id: uuidv4(),
      firstName: data.firstName,
      lastName: data.lastName,
      grades: data.grades,
      classRoom: data.classRoom,
    };
    students.push(newStudent);
    return newStudent;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateStudent = (id, updates) => {
  const studentIndex = students.findIndex((student) => student.id === id);
  if (studentIndex === -1) {
    return null;
  }

  try {
    studentSchema.validateSync(updates);
    students[studentIndex] = {
      ...students[studentIndex],
      ...updates,
    };
    return students[studentIndex];
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateStudentPartial = (id, partialUpdates) => {
  const studentIndex = students.findIndex((student) => student.id === id);
  if (studentIndex === -1) {
    return null;
  }

  try {
    updateStudentSchema.validateSync(partialUpdates, { strict: false });

    students[studentIndex] = {
      ...students[studentIndex],
      ...partialUpdates,
    };

    return students[studentIndex];
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteStudent = (id) => {
  students = students.filter((student) => student.id !== id);
};

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  updateStudentPartial,
  deleteStudent,
  updateStudentSchema,
};
