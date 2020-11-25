const {
  createIncident,
  getAllIncidents,
  getIncidentWithStart,
  getIncidentWithId,
  updateIncidentController,
  closeIncidentController,
  ackIncidentController,
} = require("./incident.controller");

const router = require("express").Router();

router.post("/", createIncident);
router.get("/", getAllIncidents);
router.get("/:value", getIncidentWithStart);
router.get("/detail/:id", getIncidentWithId);
router.patch("/", updateIncidentController);
router.patch("/close/:id", closeIncidentController);
router.patch("/acknowledge/:id", ackIncidentController);

module.exports = router;
