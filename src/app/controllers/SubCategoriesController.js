import * as Yup from 'yup';
import { isBefore, parseISO } from 'date-fns';

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
      attributes: [
        'name',
        'price',
        'priority',
        'start_date',
        'end_date',
        'date_active',
      ],
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
      start_date: Yup.date().required(),
      end_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const {
      category,
      name: bodyName,
      price,
      priority,
      start_date,
      end_date,
    } = req.body;

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

    const goalsExist = await SubCategory.findAll({
      where: {
        user_id: req.userId,
        category_id: 4,
      },
    });

    if (goalsExist >= 3) {
      return res.status(400).json({ error: 'You can 2 goals this month' });
    }

    if (category === 4) {
      const startDateFormat = parseISO(start_date);
      const endDateFormat = parseISO(end_date);

      if (
        isBefore(endDateFormat, startDateFormat) ||
        isBefore(endDateFormat, new Date())
      ) {
        return res.status(400).json({
          error: 'End date must be greater than start date or current date',
        });
      }
    }

    const subcategory = await SubCategory.create({
      category_id: category,
      user_id: req.userId,
      name: bodyName,
      price,
      priority,
      start_date,
      end_date,
    });

    return res.json(subcategory);
  }
}

export default new SubCategoriesController();
