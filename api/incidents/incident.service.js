const mysqlConnection = require("../../config/connection");

module.exports = {
  create: (data, callback) => {
    var incidentID = 0;
    let result;
    mysqlConnection.query(
      ` insert into incident(title , description , priority_id  , admin_id) values(?,?,? , ?) `,
      [data.title, data.description, data.priority_id, data.admin_id],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },

  addUsersInIncident: (incidentID, user, callback) => {
    console.log("Hello :", incidentID, user);
    mysqlConnection.query(
      `insert into incident_registration(incident_id , registration_id) values(? , ?) `,
      [incidentID, user.id],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, results);
        }
      }
    );
  },

  getAll: (callback) => {
    mysqlConnection.query(
      `select * from incident`,
      [],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },

  getIncidentsWithStart: (value, callback) => {
    mysqlConnection.query(
      `select * from incident where title like ? `,
      [value],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, results);
        }
      }
    );
  },

  getWithId: (id, callback) => {
    mysqlConnection.query(
      `select * from incident where id = ? `,
      [id],
      (error, results, query) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, results);
        }
      }
    );
  },

  updateIncident: (data, callback) => {
    mysqlConnection.query(
      `update incident set title = ? , description = ? , priority_id = ? where id = ?  `,
      [data.title, data.description, data.priority_id, data.id],

      (error, results, fields) => {
        if (error) {
          callback(error);
        } else {
          callback(null, results);
        }
      }
    );
  },

  closeIncident: (id, callback) => {
    mysqlConnection.query(
      `update incident set  close = ? where id = ?  `,
      [true, id],

      (error, results, fields) => {
        if (error) {
          callback(error);
        } else {
          callback(null, results);
        }
      }
    );
  },

  ackIncident: (id, data, callback) => {
    mysqlConnection.query(
      `update incident set  ack = ? where id = ?  `,
      [data.ack, id],

      (error, results, fields) => {
        if (error) {
          callback(error);
        } else {
          callback(null, results);
        }
      }
    );
  },
};
