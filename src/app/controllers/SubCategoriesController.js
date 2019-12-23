import * as Yup from 'yup';
import SubCategory from '../models/SubCategory';
import User from '../models/User';
import Category from '../models/Category';

class SubCategoriesController {
  async store(req, res) {
    const schema = Yup.object().shape({
      category: Yup.number()
        .integer()
        .required(),
      user: Yup.number()
        .integer()
        .required(),
      name: Yup.string().required(),
      price: Yup.number().required(),
      priority: Yup.number()
        .integer()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { category, user, name: bodyName, price, priority } = req.body;

    const checkUser = await SubCategory.findOne({
      where: {
        user_id: user,
      },
    });

    if (checkUser) {
      if (checkUser.name === bodyName) {
        return res.status(400).json({ error: `${bodyName} already exist` });
      }
    }

    const userExist = await User.findByPk(user);

    if (!userExist) {
      return res.status(400).json({ error: 'Users does not exist' });
    }

    const categoryExist = await Category.findByPk(category);

    if (!categoryExist) {
      return res.status(400).json({ error: 'Category does not exist' });
    }

    const subcategory = await SubCategory.create({
      category_id: category,
      user_id: user,
      name: bodyName,
      price,
      priority,
    });

    return res.json(subcategory);
  }
}

export default new SubCategoriesController();
