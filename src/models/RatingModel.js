import db from "../config/connection";

export const ratingModel = {
    all() {
        const query = `SELECT * FROM rating`;

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

    listByUser(userId) {
        const query = `SELECT R.id,P.id AS problem_id, R.note, R.comment, PU.user_id
        FROM rating R
        INNER JOIN problem P ON P.id = R.problem_id
        INNER JOIN problem_user PU ON PU.problem_id = P.id
        WHERE PU.problem_user_type_id = 2 AND PU.user_id = ${userId}`;

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

    new(problemId, note, comment) {
        const query = `INSERT INTO rating (problem_id, note, comment) VALUES (?, ?, ?)`;
        const data = [problemId, note, comment];
        return new Promise((resolve, reject) => {
            db.query(query, data, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    },
};
