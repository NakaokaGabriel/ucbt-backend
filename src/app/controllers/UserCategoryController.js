import UserCategory from '../models/UserCategory';
import User from '../models/User';
import Category from '../models/Category';

class UserCategoryController {
  async store(req, res) {
    const { user_id, category_id } = req.params;
    const { money } = req.body;

    const checkUser = await User.findByPk(user_id);

    if (!checkUser) {
      return res.status(400).json({ error: 'This user is not a cadastrated' });
    }

    const checkCategory = await Category.findByPk(category_id);

    if (!checkCategory) {
      return res.status(400).json({ error: 'Category does not exist' });
    }

    const categoryExist = await UserCategory.findOne({
      where: {
        category_id,
        user_id,
      },
    });

    if (categoryExist) {
      return res.status(400).json({ error: 'This category already populate' });
    }

    const userCategory = await UserCategory.create({
      user_id,
      category_id,
      money,
    });

    return res.json(userCategory);
  }
}

export default new UserCategoryController();
