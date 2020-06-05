import db from "../config/connection";

export const skillModel = {
  all() {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM skill`, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  },

  get(id) {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM skill WHERE id = ${id}`, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result[0]);
        }
      });
    });
  },

  getCategory(categoryId) {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM skill_category WHERE id=${categoryId}`,
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result[0]);
          }
        }
      );
    });
  },
};
