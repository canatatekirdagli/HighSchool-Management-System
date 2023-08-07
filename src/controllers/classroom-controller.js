const classRoomService = require("../services/classroom-service");

const getAllClassRooms = (req, res) => {
  const classRooms = classRoomService.getAllClassRooms();

  const { limit = 10, offset = 0 } = req.query;
  const paginatedClassRooms = classRooms.slice(
    parseInt(offset),
    parseInt(offset) + parseInt(limit)
  );
  res.status(200).json(paginatedClassRooms);
};

const getClassRoomById = (req, res) => {
  const classRoomId = req.params.id;
  const classRoom = classRoomService.getClassRoomById(classRoomId);
  if (!classRoom) {
    return res.status(404).json({ error: "ClassRoom not found" });
  }
  res.status(200).json(classRoom);
};

const createClassRoom = (req, res) => {
  const { name } = req.body;
  const newClassRoom = classRoomService.createClassRoom({ name });
  res.status(201).json(newClassRoom);
};

const updateClassRoom = (req, res) => {
  const classRoomId = req.params.id;
  const updates = req.body;
  const classRoom = classRoomService.updateClassRoom(classRoomId, updates);
  if (!classRoom) {
    return res.status(404).json({ error: "ClassRoom not found" });
  }
  res.status(200).json(classRoom);
};

const deleteClassRoom = (req, res) => {
  const classRoomId = req.params.id;
  classRoomService.deleteClassRoom(classRoomId);
  res.status(204).end();
};

const updateClassRoomPartial = (req, res) => {
  const classRoomId = req.params.id;
  const updates = req.body;

  const existingClassRoom = classRoomService.getClassRoomById(classRoomId);
  if (!existingClassRoom) {
    return res.status(404).json({ error: "ClassRoom not found" });
  }

  try {
    const updatedClassRoom = classRoomService.updateClassRoomPartial(
      classRoomId,
      updates
    );
    res.status(200).json(updatedClassRoom);
  } catch (error) {
    return res.status(400).json({ error: `Invalid data: ${error.message}` });
  }
};

module.exports = {
  getAllClassRooms,
  getClassRoomById,
  createClassRoom,
  updateClassRoom,
  deleteClassRoom,
  updateClassRoomPartial,
};
