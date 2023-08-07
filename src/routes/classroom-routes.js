const express = require("express");
const router = express.Router();

const ClassRoomController = require("../controllers/classroom-controller");

router.get("/classrooms", ClassRoomController.getAllClassRooms);
router.get("/classrooms/:id", ClassRoomController.getClassRoomById);
router.post("/classrooms", ClassRoomController.createClassRoom);
router.put("/classrooms/:id", ClassRoomController.updateClassRoom);
router.patch("/classrooms/:id", ClassRoomController.updateClassRoomPartial);
router.delete("/classrooms/:id", ClassRoomController.deleteClassRoom);

module.exports = router;
