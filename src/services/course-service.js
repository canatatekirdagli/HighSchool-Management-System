const { v4: uuidv4 } = require("uuid");
const { object, string } = require("yup");

let courses = [];

const courseSchema = object({
  name: string().required(),
  teacher: object({
    id: string().trim().required("Öğretmen ID zorunludur."),
    firstName: string().trim().required("Öğretmen adı zorunludur."),
    lastName: string().trim().required("Öğretmen soyadı zorunludur."),
  }).required(),
});

const updateCourseSchema = object({
  name: string(),
  teacher: object({
    id: string().trim(),
    firstName: string().trim(),
    lastName: string().trim(),
  }),
});

const getAllCourses = (limit = 10, offset = 0) => {
  return courses.slice(offset, offset + limit);
};

const getCourseById = (id) => courses.find((course) => course.id === id);

const createCourse = (data) => {
  try {
    courseSchema.validateSync(data);
    const newCourse = {
      id: uuidv4(),
      name: data.name,
      teacher: data.teacher,
    };
    courses.push(newCourse);
    return newCourse;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateCourse = (id, updates) => {
  const courseIndex = courses.findIndex((course) => course.id === id);
  if (courseIndex === -1) {
    return null;
  }

  try {
    courseSchema.validateSync(updates);
    courses[courseIndex] = {
      ...courses[courseIndex],
      ...updates,
    };
    return courses[courseIndex];
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateCoursePartial = (id, partialUpdates) => {
  const courseIndex = courses.findIndex((course) => course.id === id);
  if (courseIndex === -1) {
    return null;
  }

  try {
    updateCourseSchema.validateSync(partialUpdates, { strict: false });

    courses[courseIndex] = {
      ...courses[courseIndex],
      ...partialUpdates,
    };

    return courses[courseIndex];
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteCourse = (id) => {
  courses = courses.filter((course) => course.id !== id);
};

module.exports = {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  updateCoursePartial,
  deleteCourse,
};
