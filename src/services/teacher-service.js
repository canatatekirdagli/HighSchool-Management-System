const { v4: uuidv4 } = require("uuid");
const { object, string, number } = require("yup");
const Teacher = require("../models/Teacher");

let teachers = [];

const teacherSchema = object({
  firstName: string().required(),
  lastName: string().required(),
});
const updateTeacherSchema = object({
  firstName: string(),
  lastName: string(),
});

const getAllTeachers = (limit = 10, offset = 0) => {
  return teachers.slice(offset, offset + limit);
};

const getTeacherById = (id) => teachers.find((teacher) => teacher.id === id);

const createTeacher = (data) => {
  try {
    teacherSchema.validateSync(data);
    const newTeacher = new Teacher(uuidv4(), data.firstName, data.lastName);
    teachers.push(newTeacher);
    return newTeacher;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateTeacher = (id, updates) => {
  const teacherIndex = teachers.findIndex((teacher) => teacher.id === id);
  if (teacherIndex === -1) {
    return null;
  }

  try {
    teacherSchema.validateSync(updates);
    teachers[teacherIndex] = {
      ...teachers[teacherIndex],
      ...updates,
    };
    return teachers[teacherIndex];
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteTeacher = (id) => {
  teachers = teachers.filter((teacher) => teacher.id !== id);
};

const updateTeacherPartial = (id, partialUpdates) => {
  const teacherIndex = teachers.findIndex((teacher) => teacher.id === id);
  if (teacherIndex === -1) {
    return null;
  }

  try {
    updateTeacherSchema.validateSync(partialUpdates, { strict: false });

    teachers[teacherIndex] = {
      ...teachers[teacherIndex],
      ...partialUpdates,
    };

    return teachers[teacherIndex];
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getAllTeachers,
  getTeacherById,
  createTeacher,
  updateTeacher,
  deleteTeacher,
  updateTeacherSchema,
};
