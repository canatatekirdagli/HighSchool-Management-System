const { v4: uuidv4 } = require("uuid");
const { object, string, number, array } = require("yup");

let grades = [];

const gradeSchema = object({
  name: string().required(),
  grades: array().of(number().integer().min(1).max(10)).required(),
});

const updateGradeSchema = object({
  name: string(),
  grades: array().of(number().integer().min(1).max(10)),
});

const getAllGrades = (limit = 10, offset = 0) => {
  return grades.slice(offset, offset + limit);
};

const getGradeById = (id) => grades.find((grade) => grade.id === id);

const createGrade = (data) => {
  try {
    gradeSchema.validateSync(data);
    const newGrade = {
      id: uuidv4(),
      name: data.name,
      grades: data.grades,
    };
    grades.push(newGrade);
    return newGrade;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateGrade = (id, updates) => {
  const gradeIndex = grades.findIndex((grade) => grade.id === id);
  if (gradeIndex === -1) {
    return null;
  }

  try {
    gradeSchema.validateSync(updates);
    grades[gradeIndex] = {
      ...grades[gradeIndex],
      ...updates,
    };
    return grades[gradeIndex];
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateGradePartial = (id, partialUpdates) => {
  const gradeIndex = grades.findIndex((grade) => grade.id === id);
  if (gradeIndex === -1) {
    return null;
  }

  try {
    updateGradeSchema.validateSync(partialUpdates, { strict: false });

    grades[gradeIndex] = {
      ...grades[gradeIndex],
      ...partialUpdates,
    };

    return grades[gradeIndex];
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteGrade = (id) => {
  grades = grades.filter((grade) => grade.id !== id);
};

module.exports = {
  getAllGrades,
  getGradeById,
  createGrade,
  updateGrade,
  updateGradePartial,
  deleteGrade,
};
