import Sequelize from 'sequelize';

import databaseConfig from '../config/database';

import User from '../app/models/User';
import File from '../app/models/File';
import Category from '../app/models/Category';
import UserCategory from '../app/models/UserCategory';
import SubCategory from '../app/models/SubCategory';

const models = [User, File, Category, UserCategory, SubCategory];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection));
    models.map(
      model => model.associate && model.associate(this.connection.models)
    );
  }
}

export default new Database();
