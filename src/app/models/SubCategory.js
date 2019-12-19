import Sequelize, { Model } from 'sequelize';

class SubCategory extends Model {
  static init(sequelize) {
    super.init(
      {
        category_id: Sequelize.INTEGER,
        user_id: Sequelize.INTEGER,
        name: Sequelize.STRING,
        price: Sequelize.DECIMAL,
        priority: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Category, { foreignKey: 'id', as: 'categories' });
    this.belongsTo(models.User, { foreignKey: 'id', as: 'user' });
  }
}

export default SubCategory;
