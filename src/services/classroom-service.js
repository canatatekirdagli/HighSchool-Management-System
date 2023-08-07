const { v4: uuidv4 } = require("uuid");
const { object, string } = require("yup");

let classRooms = [];

const classRoomSchema = object({
  name: string().required(),
});

const updateClassRoomSchema = object({
  name: string(),
});

const getAllClassRooms = (limit = 10, offset = 0) => {
  return classRooms.slice(offset, offset + limit);
};

const getClassRoomById = (id) =>
  classRooms.find((classRoom) => classRoom.id === id);

const createClassRoom = (data) => {
  try {
    classRoomSchema.validateSync(data);
    const newClassRoom = {
      id: uuidv4(),
      name: data.name,
    };
    classRooms.push(newClassRoom);
    return newClassRoom;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateClassRoom = (id, updates) => {
  const classRoomIndex = classRooms.findIndex(
    (classRoom) => classRoom.id === id
  );
  if (classRoomIndex === -1) {
    return null;
  }

  try {
    classRoomSchema.validateSync(updates);
    classRooms[classRoomIndex] = {
      ...classRooms[classRoomIndex],
      ...updates,
    };
    return classRooms[classRoomIndex];
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateClassRoomPartial = (id, partialUpdates) => {
  const classRoomIndex = classRooms.findIndex(
    (classRoom) => classRoom.id === id
  );
  if (classRoomIndex === -1) {
    return null;
  }

  try {
    updateClassRoomSchema.validateSync(partialUpdates, { strict: false });

    classRooms[classRoomIndex] = {
      ...classRooms[classRoomIndex],
      ...partialUpdates,
    };

    return classRooms[classRoomIndex];
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteClassRoom = (id) => {
  classRooms = classRooms.filter((classRoom) => classRoom.id !== id);
};

module.exports = {
  getAllClassRooms,
  getClassRoomById,
  createClassRoom,
  updateClassRoom,
  updateClassRoomPartial,
  deleteClassRoom,
};
