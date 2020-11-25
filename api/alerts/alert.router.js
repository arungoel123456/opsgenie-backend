const {
  createAlert,
  getAllAlerts,
  getAlertWithStart,
  getAlertWithId,
  updateAlertController,
  closeAlertController,
  ackAlertController,
  getAllClosedAlerts,
  deleteAlertController,
  getAllOpenAlerts,
  getAllAckAlerts,
  getAllUnAckAlerts,
} = require("./alert.controller");

const router = require("express").Router();

router.post("/", createAlert);
router.get("/", getAllAlerts);
router.get("/close", getAllClosedAlerts);
router.get("/open", getAllOpenAlerts);
router.get("/ack", getAllAckAlerts);
router.get("/unack", getAllUnAckAlerts);
router.get("/:value", getAlertWithStart);
router.get("/detail/:id", getAlertWithId);

router.patch("/", updateAlertController);
router.patch("/close/:id", closeAlertController);
router.patch("/acknowledge/:id", ackAlertController);

router.delete("/:id", deleteAlertController);

module.exports = router;
