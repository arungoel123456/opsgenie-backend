const {
  create,
  getAll,
  getIncidentsWithStart,
  getWithId,
  addUsersInIncident,
  updateIncident,
  closeIncident,
  ackIncident,
} = require("./incident.service");

module.exports = {
  createIncident: (req, res) => {
    const body = req.body;
    //   body.priority_id = parseInt(body.priority_id);
    // console.log("body :", body);

    // console.log("Responders : ", body.responders);
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
          addUsersInIncident(results.insertId, user, (error, result) => {
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

  getAllIncidents: (req, res) => {
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

  getIncidentWithStart: (req, res) => {
    // console.log(req.params);
    let value = req.params.value + "%";
    console.log(value);
    getIncidentsWithStart(value, (err, results) => {
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

  getIncidentWithId: (req, res) => {
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

  updateIncidentController: (req, res) => {
    const body = req.body;
    updateIncident(body, (err, results) => {
      console.log("results: ", results);
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "failed to update incident",
        });
      } else {
        return res.status(200).json({
          success: 1,
          message: "updated succesfully",
        });
      }
    });
  },

  closeIncidentController: (req, res) => {
    let id = req.params.id;
    console.log(req.params);
    closeIncident(id, (err, results) => {
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
  ackIncidentController: (req, res) => {
    let id = req.params.id;
    const body = req.body;
    console.log(req.params);
    ackIncident(id, body, (err, results) => {
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
};
