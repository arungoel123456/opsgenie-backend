const mysqlConnection = require("../../config/connection");

module.exports = {
  create: (data, callback) => {
    mysqlConnection.query(
      ` insert into alert(title , description , priority_id , admin_id) values(?,?,? , ?) `,
      [data.title, data.description, parseInt(data.priority_id), data.admin_id],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        console.log(results);
        return callback(null, results);
      }
    );
  },

  addUsersInAlert: (alertID, user, callback) => {
    // console.log("RESPONDERS: ", responders);
    // responders.forEach((user) => {
    console.log("Hello :", alertID, user);
    mysqlConnection.query(
      `insert into alert_registration(alert_id , registration_id) values(? , ?) `,
      [alertID, user.id],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, results);
        }
      }
    );
    // });
  },

  getAll: (callback) => {
    mysqlConnection.query(
      `select * from alert`,
      [],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },

  getAllClose: (callback) => {
    mysqlConnection.query(
      `select * from alert where close = ?`,
      [true],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },

  getAllOpen: (callback) => {
    mysqlConnection.query(
      `select * from alert where close = ?`,
      [false],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },

  getAllAck: (callback) => {
    mysqlConnection.query(
      `select * from alert where ack = ? and close = ?`,
      [true, false],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },

  getAllUnAck: (callback) => {
    mysqlConnection.query(
      `select * from alert where ack = ?`,
      [false],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },

  getAlertsWithStart: (value, callback) => {
    mysqlConnection.query(
      `select * from alert where title like ? `,
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
      `select * from alert where id = ? `,
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

  updateAlert: (data, callback) => {
    mysqlConnection.query(
      `update alert set title = ? , description = ? , priority_id = ? where id = ?  `,
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

  closeAlert: (id, callback) => {
    mysqlConnection.query(
      `update alert set  close = ? where id = ?  `,
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

  ackAlert: (id, data, callback) => {
    mysqlConnection.query(
      `update alert set  ack = ? where id = ?  `,
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
  deleteAlert: (data, callback) => {
    mysqlConnection.query(
      ` delete from alert where id = ? `,
      [data.id],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, results);
        }
      }
    );
  },
};
