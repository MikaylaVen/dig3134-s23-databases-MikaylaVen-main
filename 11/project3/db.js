import { MongoClient } from 'mongodb'
import { DB_NAME } from "./index.js"

let dbConnection

export const connectToDb = (cb) => {
  MongoClient.connect(`mongodb://localhost:37017/${DB_NAME}`)
    .then((client) => {
      dbConnection = client.db();
      return cb;
    })
    .catch((err) => {
      console.log(err);
      return cb(err);
    });
};

export const getDb = () => dbConnection;
