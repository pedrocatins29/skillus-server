import db from "../config/database";

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
            db.query(
                `SELECT * FROM skill WHERE id = ${id}`,
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
