const {
  getAllTeachers,
  getTeacherById,
  createTeacher,
  updateTeacher,
  deleteTeacher,
} = require("../src/services/teacher-service");

const teacherData = {
  firstName: "Ahmet",
  lastName: "Yılmaz",
};

test("should create a new teacher using the createTeacher function", () => {
  const newTeacher = createTeacher(teacherData);
  expect(newTeacher).toBeDefined();
  expect(newTeacher.firstName).toBe("Ahmet");
  expect(newTeacher.lastName).toBe("Yılmaz");
});

test("should return an array of teachers using the getAllTeachers function", () => {
  const allTeachers = getAllTeachers();
  expect(Array.isArray(allTeachers)).toBe(true);
});

test("should find a teacher by ID using the getTeacherById function", () => {
  const newTeacher = createTeacher(teacherData);
  const teacherId = newTeacher.id;
  const foundTeacher = getTeacherById(teacherId);
  expect(foundTeacher).toBeDefined();
  expect(foundTeacher.id).toBe(teacherId);
});

test("should update teacher information using the updateTeacher function", () => {
  const newTeacher = createTeacher(teacherData);
  const teacherId = newTeacher.id;

  const updateData = {
    firstName: "Mehmet",
    lastName: "Demir",
  };

  const updatedTeacher = updateTeacher(teacherId, updateData);
  expect(updatedTeacher).toBeDefined();
  expect(updatedTeacher.firstName).toBe("Mehmet");
  expect(updatedTeacher.lastName).toBe("Demir");
});

test("should delete a teacher using the deleteTeacher function", () => {
  const newTeacher = createTeacher(teacherData);
  const teacherId = newTeacher.id;
  deleteTeacher(teacherId);
  const foundTeacher = getTeacherById(teacherId);
  expect(foundTeacher).toBeUndefined();
});

test("end-to-end test", () => {
  const newTeacher = createTeacher(teacherData);
  expect(newTeacher).toBeDefined();
  expect(newTeacher.firstName).toBe("Ahmet");
  expect(newTeacher.lastName).toBe("Yılmaz");
  const allTeachers = getAllTeachers();
  expect(Array.isArray(allTeachers)).toBe(true);
  expect(allTeachers).toContainEqual(newTeacher);
  const teacherId = newTeacher.id;
  const updateData = {
    firstName: "Mehmet",
    lastName: "Demir",
  };
  const updatedTeacher = updateTeacher(teacherId, updateData);
  expect(updatedTeacher).toBeDefined();
  expect(updatedTeacher.firstName).toBe("Mehmet");
  expect(updatedTeacher.lastName).toBe("Demir");
  const foundTeacher = getTeacherById(teacherId);
  expect(foundTeacher).toBeDefined();
  expect(foundTeacher.id).toBe(teacherId);
  expect(foundTeacher.firstName).toBe("Mehmet");
  expect(foundTeacher.lastName).toBe("Demir");
  deleteTeacher(teacherId);
  const deletedTeacher = getTeacherById(teacherId);
  expect(deletedTeacher).toBeUndefined();
  const remainingTeachers = getAllTeachers();
  expect(Array.isArray(remainingTeachers)).toBe(true);
  expect(remainingTeachers).not.toContainEqual(foundTeacher);
});
