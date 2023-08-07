const courseService = require("../services/course-service");

const getAllCourses = (req, res) => {
  const courses = courseService.getAllCourses();

  const { limit = 10, offset = 0 } = req.query;
  const paginatedCourses = courses.slice(
    parseInt(offset),
    parseInt(offset) + parseInt(limit)
  );
  res.status(200).json(paginatedCourses);
};

const getCourseById = (req, res) => {
  const courseId = req.params.id;
  const course = courseService.getCourseById(courseId);
  if (!course) {
    return res.status(404).json({ error: "Course not found" });
  }
  res.status(200).json(course);
};

const createCourse = (req, res) => {
  const { name, teacher } = req.body;
  const newCourse = courseService.createCourse({ name, teacher });
  res.status(201).json(newCourse);
};

const updateCourse = (req, res) => {
  const courseId = req.params.id;
  const updates = req.body;
  const course = courseService.updateCourse(courseId, updates);
  if (!course) {
    return res.status(404).json({ error: "Course not found" });
  }
  res.status(200).json(course);
};

const deleteCourse = (req, res) => {
  const courseId = req.params.id;
  courseService.deleteCourse(courseId);
  res.status(204).end();
};

const updateCoursePartial = (req, res) => {
  const courseId = req.params.id;
  const updates = req.body;

  const existingCourse = courseService.getCourseById(courseId);
  if (!existingCourse) {
    return res.status(404).json({ error: "Course not found" });
  }

  try {
    courseService.updateCoursePartial(courseId, updates);
    res.status(200).json({ ...existingCourse, ...updates });
  } catch (error) {
    return res.status(400).json({ error: `Invalid data: ${error.message}` });
  }
};

module.exports = {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  updateCoursePartial,
};
