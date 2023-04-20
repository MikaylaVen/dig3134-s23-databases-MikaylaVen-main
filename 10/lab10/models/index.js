import dbConfig from '../config/db-config.js';
import { Sequelize, DataTypes } from 'sequelize';

import post from './post.js';

const sequelize = new Sequelize(dbConfig.DATABASE, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.DIALECT
});

const db = {};
db.sequelize = sequelize;
db.models = {};
db.models.Post = post(sequelize, DataTypes);


export default db;