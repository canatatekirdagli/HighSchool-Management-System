const {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} = require("../src/services/course-service");

const courseData = {
  name: "Math",
  teacher: {
    id: "teacher-1",
    firstName: "Ahmet",
    lastName: "Bey",
  },
};

test("should create a new course using the createCourse function", () => {
  const newCourse = createCourse(courseData);
  expect(newCourse).toBeDefined();
  expect(newCourse.name).toBe("Math");
  expect(newCourse.teacher).toEqual({
    id: "teacher-1",
    firstName: "Ahmet",
    lastName: "Bey",
  });
});

test("should return all courses using the getAllCourses function", () => {
  const allCourses = getAllCourses();
  expect(Array.isArray(allCourses)).toBe(true);
});

test("should find a course by id using the getCourseById function", () => {
  const newCourse = createCourse(courseData);
  const courseId = newCourse.id;
  const foundCourse = getCourseById(courseId);
  expect(foundCourse).toBeDefined();
  expect(foundCourse.id).toBe(courseId);
});

test("should update course information using the updateCourse function", () => {
  const newCourse = createCourse(courseData);
  const courseId = newCourse.id;

  const updateData = {
    name: "Physics",
    teacher: {
      id: "teacher-2",
      firstName: "Mehmet",
      lastName: "Demir",
    },
  };

  const updatedCourse = updateCourse(courseId, updateData);
  expect(updatedCourse).toBeDefined();
  expect(updatedCourse.name).toBe("Physics");
  expect(updatedCourse.teacher).toEqual({
    id: "teacher-2",
    firstName: "Mehmet",
    lastName: "Demir",
  });
});

test("should delete a course from the list using the deleteCourse function", () => {
  const newCourse = createCourse(courseData);
  const courseId = newCourse.id;
  deleteCourse(courseId);
  const foundCourse = getCourseById(courseId);
  expect(foundCourse).toBeUndefined();
});

test("end-to-end test", () => {
  const newCourse = createCourse(courseData);
  expect(newCourse).toBeDefined();
  expect(newCourse.name).toBe("Math");
  expect(newCourse.teacher).toEqual({
    id: "teacher-1",
    firstName: "Ahmet",
    lastName: "Bey",
  });
  const allCourses = getAllCourses();
  expect(Array.isArray(allCourses)).toBe(true);
  expect(allCourses).toContainEqual(newCourse);
  const courseId = newCourse.id;
  const updateData = {
    name: "Physics",
    teacher: {
      id: "teacher-2",
      firstName: "Mehmet",
      lastName: "Demir",
    },
  };
  const updatedCourse = updateCourse(courseId, updateData);
  expect(updatedCourse).toBeDefined();
  expect(updatedCourse.name).toBe("Physics");
  expect(updatedCourse.teacher).toEqual({
    id: "teacher-2",
    firstName: "Mehmet",
    lastName: "Demir",
  });
  const foundCourse = getCourseById(courseId);
  expect(foundCourse).toBeDefined();
  expect(foundCourse.id).toBe(courseId);
  expect(foundCourse.name).toBe("Physics");
  expect(foundCourse.teacher).toEqual({
    id: "teacher-2",
    firstName: "Mehmet",
    lastName: "Demir",
  });
  deleteCourse(courseId);
  const deletedCourse = getCourseById(courseId);
  expect(deletedCourse).toBeUndefined();
  const remainingCourses = getAllCourses();
  expect(Array.isArray(remainingCourses)).toBe(true);
  expect(remainingCourses).not.toContainEqual(foundCourse);
});
