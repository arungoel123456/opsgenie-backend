const {
  create,
  getAll,
  getAlertsWithStart,
  getWithId,
  addUsersInAlert,
  updateAlert,
  closeAlert,
  ackAlert,
  getAllClose,
  deleteAlert,
  getAllOpen,
  getAllAck,
  getAllUnAck,
} = require("./alert.service");

module.exports = {
  createAlert: (req, res) => {
    const body = req.body;
    body.priority_id = parseInt(body.priority_id);
    console.log("body :", body);

    create(body, (err, results) => {
      if (err) {
        console.log("error : ", err);
        return res.status(500).json({
          success: 0,
          message: "Database Connection error",
        });
      } else {
        console.log("RESULTS : ", results);
        if (body.responders.length == 0) {
          return res.status(200).json({
            success: 1,
            data: results,
          });
        }

        body.responders.forEach((user) => {
          addUsersInAlert(results.insertId, user, (error, result) => {
            if (error) {
              return res.status(500).json({
                success: 0,
                message: "Database Connection error",
              });
            } else {
            }
          });
        });

        return res.status(200).json({
          success: 1,
          data: results,
        });
      }
    });
  },

  getAllAlerts: (req, res) => {
    getAll((err, results) => {
      if (err) {
        console.log(err);
        return;
      } else {
        return res.json({
          success: 1,
          data: results,
        });
      }
    });
  },

  getAllClosedAlerts: (req, res) => {
    getAllClose((err, results) => {
      if (err) {
        console.log(err);
        return;
      } else {
        return res.json({
          success: 1,
          data: results,
        });
      }
    });
  },
  getAllOpenAlerts: (req, res) => {
    getAllOpen((err, results) => {
      if (err) {
        console.log(err);
        return;
      } else {
        return res.json({
          success: 1,
          data: results,
        });
      }
    });
  },
  getAllAckAlerts: (req, res) => {
    getAllAck((err, results) => {
      if (err) {
        console.log(err);
        return;
      } else {
        return res.json({
          success: 1,
          data: results,
        });
      }
    });
  },
  getAllUnAckAlerts: (req, res) => {
    getAllUnAck((err, results) => {
      if (err) {
        console.log(err);
        return;
      } else {
        return res.json({
          success: 1,
          data: results,
        });
      }
    });
  },

  getAlertWithStart: (req, res) => {
    console.log(req.params);
    let value = req.params.value + "%";
    getAlertsWithStart(value, (err, results) => {
      if (err) {
        console.log(err);
        return;
      } else {
        return res.json({
          success: 1,
          data: results,
        });
      }
    });
  },

  getAlertWithId: (req, res) => {
    let id = req.params.id;
    console.log(req.params);
    getWithId(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      } else {
        return res.json({
          success: 1,
          data: results,
        });
      }
    });
  },

  updateAlertController: (req, res) => {
    const body = req.body;
    updateAlert(body, (err, results) => {
      console.log("results: ", results);
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "failed to update alert",
        });
      } else {
        return res.status(200).json({
          success: 1,
          message: "updated succesfully",
        });
      }
    });
  },

  closeAlertController: (req, res) => {
    let id = req.params.id;
    console.log(req.params);
    closeAlert(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      } else {
        return res.json({
          success: 1,
          data: results,
        });
      }
    });
  },
  ackAlertController: (req, res) => {
    let id = req.params.id;
    const body = req.body;
    console.log(req.params);
    ackAlert(id, body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      } else {
        return res.json({
          success: 1,
          data: results,
        });
      }
    });
  },

  deleteAlertController: (req, res) => {
    const data = req.body;
    deleteAlert(data, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(results);
      return res.json({
        success: 1,
        message: "Alert deleted successfully",
      });
    });
  },
};
