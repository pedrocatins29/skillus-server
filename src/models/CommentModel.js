import db from "../config/connection";

export const commentModel = {
    list(problemId) {
        const query = `SELECT * FROM problem_comment WHERE problem_id = ${problemId}`;
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

    new(text, problemId, senderId) {
        const query = `INSERT INTO problem_comment (text, date_creation, problem_id, user_id_sender) VALUES ('${text}', now(), ${problemId}, ${senderId})`;
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
};
