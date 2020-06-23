import db from "../config/connection";
import { ratingModel } from "../models/RatingModel";
import { userModel } from "../models/UserModel";

export const problemModel = {
    all() {
        return new Promise((resolve, reject) => {
            db.query(
                `select P.*, PS.name as status, PS.icon as icon, PS.color as color from problem P inner join problem_status PS on P.problem_status_id = PS.id`,
                (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        console.log(result[0]);
                        resolve(result);
                    }
                }
            );
        });
    },

    get(id) {
        return new Promise((resolve, reject) => {
            db.query(
                `select P.*, PS.name as status, PS.color, PS.icon from problem P inner join problem_status PS on P.problem_status_id = PS.id WHERE P.id = ${id}`,
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

    new(name, description) {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO problem (name, description) VALUES("${name}", "${description}")`, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    },

    allByUser(userId) {
        return new Promise((resolve, reject) => {
            db.query(
                `SELECT P.*, PU.user_id, PS.name AS status, PS.color, PS.icon 
                FROM problem P
                INNER JOIN problem_user PU ON PU.problem_id = P.id
                INNER JOIN problem_status PS ON PS.id = P.problem_status_id
                WHERE PU.user_id = ${userId}`,
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

    newProblemSkill(skillId, problemId) {
        const data = skillId.map((skill) => [problemId, skill]);
        return new Promise((resolve, reject) => {
            const query = `INSERT INTO problem_skill (problem_id,skill_id) VALUES ?`;
            db.query(query, [data], (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    },

    problemStatus(id) {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM problem_status WHERE id = ${id}`, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    },

    problemUser(problemId, userId) {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO problem_user (problem_id, user_id) VALUES (${problemId}, ${userId})`, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    },

    addProblemHelper(problemId, userId) {
        const query = `INSERT INTO problem_user (problem_id, user_id, problem_user_type_id) VALUES (${problemId}, ${userId}, 2)`;

        return new Promise((resolve, reject) => {
            db.query(query, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    },

    removeProblemHelper(problemId) {
        const query = `DELETE FROM problem_user WHERE problem_id = ${problemId} AND problem_user_type_id = 2;`;

        return new Promise((resolve, reject) => {
            db.query(query, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    },

    getCreator(problemId) {
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

    getHelper(problemId) {
        return new Promise((resolve, reject) => {
            db.query(
                `SELECT U.*
                FROM user U 
                INNER JOIN problem_user PU ON PU.user_id = U.id 
                WHERE PU.problem_id = ${problemId} AND PU.problem_user_type_id = 2`,
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

    listProblemSkill(problemId) {
        return new Promise((resolve, reject) => {
            db.query(
                `SELECT S.* FROM problem_skill PS INNER JOIN skill S ON S.id = PS.skill_id WHERE problem_id = ${problemId}`,
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

    async updateProblemStatus(problemId, status) {
        const query = `UPDATE problem SET problem_status_id = ${status}, date_close = now() WHERE id = ${problemId}`;

        return new Promise((resolve, reject) => {
            db.query(query, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    },

    async updateRatingUserSkill(problemId, note) {
        const skills = await this.listProblemSkill(problemId);
        const helper = await this.getHelper(problemId);

        return new Promise((resolve, reject) => {
            for (const skill of skills) {
                userModel.updateUserSkillRating(helper.id, skill.id, note);
            }
            resolve(true);
        });
    },

    closeProblem(problemId, note, comment) {
        return new Promise((resolve, reject) => {
            db.getConnection(async (error, connection) => {
                if (error) reject(error);
                try {
                    db.query("START TRANSACTION");
                    await this.updateProblemStatus(problemId, 3);
                    await this.updateRatingUserSkill(problemId, note);
                    await ratingModel.new(problemId, note, comment);
                    db.query("COMMIT");
                    connection.release();
                    resolve(true);
                } catch (error) {
                    db.query("ROLLBACK");
                    connection.release();
                    reject(error);
                }
            });
        });
    },
};
