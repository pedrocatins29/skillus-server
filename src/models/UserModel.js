import db from "../config/database";
import { hash } from "bcrypt";

export const userModel = {
  all() {
    return new Promise((resolve, reject) => {
      const query = `SELECT U.*, US.name AS status
            FROM user U
            INNER JOIN user_status US ON US.id = U.user_status_id order by media DESC;`;
      db.query(query, (error, result) => {
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
        `SELECT U.*, US.name AS status
        FROM user U
        INNER JOIN user_status US ON US.id = U.user_status_id WHERE U.id = ${id}`,
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

  getUserSkills(userId) {
    return new Promise((resolve, reject) => {
      const query = `SELECT US.id, US.skill_id, S.name, US.rating FROM user_skill US
            INNER JOIN skill S on S.id = US.skill_id 
            WHERE US.user_id = ${userId} order by rating DESC`;
      db.query(query, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  },

  getUserRating(userId) {
    return new Promise((resolve, reject) => {
      const query = `CALL MEDIA(${userId})`;

      db.query(query, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result[0][0].media);
        }
      });
    });
  },

  getUserContacts(userId) {
    return new Promise((resolve, reject) => {
      const query = `SELECT UC.id, C.name, UC.value, C.icon, UC.user_id
            FROM user_contact UC
            INNER JOIN contact C ON C.id = UC.contact_id
            WHERE UC.user_id = ${userId}`;

      db.query(query, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  },

  //mutations

  async register(
    name,
    email,
    password,
    telephone,
    media,
    date_creation,
    user_status_id,
    description,
    photo
  ) {
    const hashedPassword = await hash(password, 12);
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO user(name,email,password,telephone,media,date_creation,user_status_id,description,photo)VALUES("${name}","${email}","${hashedPassword}","${telephone}",${media},"${date_creation}",${user_status_id},"${description}","${photo}")`,
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
