import db from "../config/connection";

export const problemModel = {
  all() {
    return new Promise((resolve, reject) => {
      db.query(
        `select P.*, PS.name as status from problem P inner join problem_status PS on P.problem_status_id = PS.id`,
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
    });
  },

  get(id) {
    return new Promise((resolve, reject) => {
      db.query(
        `select P.*, PS.name as status from problem P inner join problem_status PS on P.problem_status_id = PS.id WHERE P.id = ${id}`,
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

  problemStatus(id) {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM problem_status WHERE id = ${id}`,
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

  createdBy(problemId) {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT U.*, PST.name as type 
        FROM problem_user PS 
        inner join user U on PS.user_id = U.id 
        inner join problem_user_type PST on PS.problem_user_type_id = PST.id 
        where PS.problem_id = ${problemId}`,
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

  problemSkill(problemId) {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT S.*
        FROM problem_skill PS
        INNER JOIN skill S ON S.id = PS.skill_id
        WHERE problem_id = ${problemId}`,
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
    });
  },
};