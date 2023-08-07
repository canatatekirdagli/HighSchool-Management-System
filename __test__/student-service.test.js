const {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
} = require("../src/services/student-service");

const studentData = {
  firstName: "John",
  lastName: "Doe",
  grades: [8, 9, 7, 6, 10],
  classRoom: {
    name: "Math Class",
    teacher: "Mr. Smith",
  },
};

test("should create a new student using the createStudent function", () => {
  const newStudent = createStudent(studentData);
  console.log("New student:", newStudent);
  expect(newStudent).toBeDefined();
  expect(newStudent.firstName).toBe("John");
  expect(newStudent.lastName).toBe("Doe");
  expect(newStudent.grades).toEqual([8, 9, 7, 6, 10]);
  expect(newStudent.classRoom).toEqual({
    name: "Math Class",
    teacher: "Mr. Smith",
  });
});

test("should return an array of students using the getAllStudents function", () => {
  const allStudents = getAllStudents();
  expect(Array.isArray(allStudents)).toBe(true);
});

test("should find a student by ID using the getStudentById function", () => {
  const newStudent = createStudent(studentData);
  const studentId = newStudent.id;
  const foundStudent = getStudentById(studentId);
  expect(foundStudent).toBeDefined();
  expect(foundStudent.id).toBe(studentId);
});

test("should update student information using the updateStudent function", () => {
  const newStudent = createStudent(studentData);
  const studentId = newStudent.id;

  const updateData = {
    firstName: "Jane",
    lastName: "Smith",
    grades: [9, 8, 6, 7, 8],
    classRoom: {
      name: "History Class",
      teacher: "Mrs. Johnson",
    },
  };

  const updatedStudent = updateStudent(studentId, updateData);
  expect(updatedStudent).toBeDefined();
  expect(updatedStudent.firstName).toBe("Jane");
  expect(updatedStudent.lastName).toBe("Smith");
  expect(updatedStudent.grades).toEqual([9, 8, 6, 7, 8]);
  expect(updatedStudent.classRoom).toEqual({
    name: "History Class",
    teacher: "Mrs. Johnson",
  });
});

test("should delete a student using the deleteStudent function", () => {
  const newStudent = createStudent(studentData);
  const studentId = newStudent.id;
  deleteStudent(studentId);
  const foundStudent = getStudentById(studentId);
  expect(foundStudent).toBeUndefined();
});

test("end-to-end test: create, update, and delete a student", () => {
  const newStudent = createStudent(studentData);
  expect(newStudent).toBeDefined();
  expect(newStudent.firstName).toBe("John");
  expect(newStudent.lastName).toBe("Doe");
  expect(newStudent.grades).toEqual([8, 9, 7, 6, 10]);
  expect(newStudent.classRoom).toEqual({
    name: "Math Class",
    teacher: "Mr. Smith",
  });
  const allStudents = getAllStudents();
  expect(Array.isArray(allStudents)).toBe(true);
  expect(allStudents).toContainEqual(newStudent);
  const studentId = newStudent.id;
  const updateData = {
    firstName: "Jane",
    lastName: "Smith",
    grades: [9, 8, 6, 7, 8],
    classRoom: {
      name: "History Class",
      teacher: "Mrs. Johnson",
    },
  };
  const updatedStudent = updateStudent(studentId, updateData);
  expect(updatedStudent).toBeDefined();
  expect(updatedStudent.firstName).toBe("Jane");
  expect(updatedStudent.lastName).toBe("Smith");
  expect(updatedStudent.grades).toEqual([9, 8, 6, 7, 8]);
  expect(updatedStudent.classRoom).toEqual({
    name: "History Class",
    teacher: "Mrs. Johnson",
  });
  const foundStudent = getStudentById(studentId);
  expect(foundStudent).toBeDefined();
  expect(foundStudent.id).toBe(studentId);
  expect(foundStudent.firstName).toBe("Jane");
  expect(foundStudent.lastName).toBe("Smith");
  expect(foundStudent.grades).toEqual([9, 8, 6, 7, 8]);
  expect(foundStudent.classRoom).toEqual({
    name: "History Class",
    teacher: "Mrs. Johnson",
  });
  deleteStudent(studentId);
  const deletedStudent = getStudentById(studentId);
  expect(deletedStudent).toBeUndefined();
  const remainingStudents = getAllStudents();
  expect(Array.isArray(remainingStudents)).toBe(true);
  expect(remainingStudents).not.toContainEqual(foundStudent);
});
