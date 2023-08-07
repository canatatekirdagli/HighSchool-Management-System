const {
  createClassRoom,
  getAllClassRooms,
  getClassRoomById,
  updateClassRoom,
  deleteClassRoom,
} = require("../src/services/classroom-service");

const classRoomData = {
  name: "Class1",
};
test("should create a new class using the createClassRoom function", () => {
  const newClass = createClassRoom(classRoomData);
  expect(newClass).toBeDefined();
  expect(newClass.name).toBe("Class1");
});
test("should return all classes using the getAllClassRooms function", () => {
  const allClasses = getAllClassRooms();
  expect(Array.isArray(allClasses)).toBe(true);
});
test("should find a class by id using the getClassRoomById function", () => {
  const newClass = createClassRoom(classRoomData);
  const classId = newClass.id;
  const foundClass = getClassRoomById(classId);
  expect(foundClass).toBeDefined();
  expect(foundClass.id).toBe(classId);
});
test("should update class information using the updateClassRoom function", () => {
  const newClass = createClassRoom(classRoomData);
  const classId = newClass.id;
  const updateData = {
    name: "Class2",
  };
  const updatedClass = updateClassRoom(classId, updateData);
  expect(updatedClass).toBeDefined();
  expect(updatedClass.name).toBe("Class2");
});

test("should delete a class from the list using the deleteClassRoom function", () => {
  const newClass = createClassRoom(classRoomData);
  const classId = newClass.id;
  deleteClassRoom(classId);
  const foundClass = getClassRoomById(classId);
  expect(foundClass).toBeUndefined();
});

test("end-to-end test", () => {
  const newClass = createClassRoom(classRoomData);
  expect(newClass).toBeDefined();
  expect(newClass.name).toBe("Class1");
  const allClasses = getAllClassRooms();
  expect(Array.isArray(allClasses)).toBe(true);
  expect(allClasses).toContainEqual(newClass);
  const classId = newClass.id;
  const updateData = {
    name: "Class2",
  };
  const updatedClass = updateClassRoom(classId, updateData);
  expect(updatedClass).toBeDefined();
  expect(updatedClass.name).toBe("Class2");
  const foundClass = getClassRoomById(classId);
  expect(foundClass).toBeDefined();
  expect(foundClass.id).toBe(classId);
  expect(foundClass.name).toBe("Class2");
  deleteClassRoom(classId);
  const deletedClass = getClassRoomById(classId);
  expect(deletedClass).toBeUndefined();
  const remainingClasses = getAllClassRooms();
  expect(Array.isArray(remainingClasses)).toBe(true);
  expect(remainingClasses).not.toContainEqual(foundClass);
});
