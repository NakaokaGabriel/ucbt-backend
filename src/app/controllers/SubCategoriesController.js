import * as Yup from 'yup';

import SubCategory from '../models/SubCategory';
import User from '../models/User';
import Category from '../models/Category';

class SubCategoriesController {
  async index(req, res) {
    const { category } = req.body;

    const subcategory = await SubCategory.findAll({
      where: {
        user_id: req.userId,
        category_id: category,
      },
      attributes: ['name', 'price', 'priority'],
      order: [['priority', 'DESC']],
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['name', 'email'],
        },
        {
          model: Category,
          as: 'category',
          attributes: ['id', 'name'],
        },
      ],
    });

    if (subcategory <= 0) {
      return res.status(400).json({ error: 'Not found categories' });
    }

    return res.json(subcategory);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      category: Yup.number()
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

    const { category, name: bodyName, price, priority } = req.body;

    const checkUser = await SubCategory.findOne({
      where: {
        user_id: req.userId,
      },
    });

    if (checkUser) {
      if (checkUser.name === bodyName) {
        return res.status(400).json({ error: `${bodyName} already exist` });
      }
    }

    const userExist = await User.findByPk(req.userId);

    if (!userExist) {
      return res.status(400).json({ error: 'Users does not exist' });
    }

    const categoryExist = await Category.findByPk(category);

    if (!categoryExist) {
      return res.status(400).json({ error: 'Category does not exist' });
    }

    const subcategory = await SubCategory.create({
      category_id: category,
      user_id: req.userId,
      name: bodyName,
      price,
      priority,
    });

    return res.json(subcategory);
  }
}

export default new SubCategoriesController();
