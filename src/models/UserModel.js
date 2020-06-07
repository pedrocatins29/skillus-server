import db from "../config/connection";
import { hash } from "bcrypt";

export const userModel = {
  findUserByParam(param, email) {
    const query = `select * from user where ${param} = "${email}"`;
    return new Promise((resolve, reject) => {
      db.query(query, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result[0]);
        }
      });
    });
  },

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
            console.log(error);
            reject(error);
          } else {
            resolve(result[0]);
          }
        }
      );
    });
  },
  async register(
    name,
    email,
    password,
    telephone,
    date_creation,
    description,
    photo
  ) {
    const hashedPassword = await hash(password, 12);
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO user(name,email,password,telephone,date_creation,description,photo)VALUES("${name}","${email}","${hashedPassword}","${telephone}","${date_creation}","${description}","${photo}")`,
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

  newUserContact(userId, value) {
    const contactId = [1, 2];
    const data = contactId.map((contact, index) => [
      userId,
      contact,
      value[index],
    ]);
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO user_contact(user_id,contact_id,value)VALUES ?`;
      db.query(query, [data], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  },

  newUserSkill(userId, skillId) {
    const data = skillId.map((skill) => [userId, skill]);
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO user_skill(user_id,skill_id)VALUES ?`;
      db.query(query, [data], (error, result) => {
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
};
