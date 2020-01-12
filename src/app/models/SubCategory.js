import { isBefore, isAfter } from 'date-fns';
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
        start_date: Sequelize.DATE,
        end_date: Sequelize.DATE,
        date_active: {
          type: Sequelize.VIRTUAL(Sequelize.BOOLEAN),
          get() {
            return (
              isBefore(this.start_date, new Date()) &&
              isAfter(this.end_date, new Date())
            );
          },
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Category, {
      foreignKey: 'category_id',
      as: 'category',
    });
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  }
}

export default SubCategory;
