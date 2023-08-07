const {
  createGrade,
  getAllGrades,
  getGradeById,
  updateGrade,
  deleteGrade,
} = require("../src/services/grade-service");

const gradeData = {
  name: "Math",
  grades: [10],
};

test("should create a new grade using the createGrade function", () => {
  const newGrade = createGrade(gradeData);
  expect(newGrade).toBeDefined();
  expect(newGrade.name).toBe("Math");
  expect(newGrade.grades).toEqual([10]);
});

test("should return all grades using the getAllGrades function", () => {
  const allGrades = getAllGrades();
  expect(Array.isArray(allGrades)).toBe(true);
});

test("should find a grade by id using the getGradeById function", () => {
  const newGrade = createGrade(gradeData);
  const gradeId = newGrade.id;
  const foundGrade = getGradeById(gradeId);
  expect(foundGrade).toBeDefined();
  expect(foundGrade.id).toBe(gradeId);
});

test("should update grade information using the updateGrade function", () => {
  const newGrade = createGrade(gradeData);
  const gradeId = newGrade.id;

  const updateData = {
    name: "Physics",
    grades: [9],
  };

  const updatedGrade = updateGrade(gradeId, updateData);
  expect(updatedGrade).toBeDefined();
  expect(updatedGrade.name).toBe("Physics");
  expect(updatedGrade.grades).toEqual([9]);
});

test("should delete a grade from the list using the deleteGrade function", () => {
  const newGrade = createGrade(gradeData);
  const gradeId = newGrade.id;
  deleteGrade(gradeId);
  const foundGrade = getGradeById(gradeId);
  expect(foundGrade).toBeUndefined();
});

test("end-to-end test", () => {
  const newGrade = createGrade(gradeData);
  expect(newGrade).toBeDefined();
  expect(newGrade.name).toBe("Math");
  expect(newGrade.grades).toEqual([10]);
  const allGrades = getAllGrades();
  expect(Array.isArray(allGrades)).toBe(true);
  expect(allGrades).toContainEqual(newGrade);
  const gradeId = newGrade.id;
  const updateData = {
    name: "Physics",
    grades: [9],
  };
  const updatedGrade = updateGrade(gradeId, updateData);
  expect(updatedGrade).toBeDefined();
  expect(updatedGrade.name).toBe("Physics");
  expect(updatedGrade.grades).toEqual([9]);
  const foundGrade = getGradeById(gradeId);
  expect(foundGrade).toBeDefined();
  expect(foundGrade.id).toBe(gradeId);
  expect(foundGrade.name).toBe("Physics");
  expect(foundGrade.grades).toEqual([9]);
  deleteGrade(gradeId);
  const deletedGrade = getGradeById(gradeId);
  expect(deletedGrade).toBeUndefined();
  const remainingGrades = getAllGrades();
  expect(Array.isArray(remainingGrades)).toBe(true);
  expect(remainingGrades).not.toContainEqual(foundGrade);
});
