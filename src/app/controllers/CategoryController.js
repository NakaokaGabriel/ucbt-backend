import Category from '../models/Category';

class CategoryController {
  async index(req, res) {
    const category = await Category.findAll();

    return res.json(category);
  }

  async store(req, res) {
    const { name, color } = req.body;

    const category = await Category.create({
      name,
      color,
    });

    return res.json(category);
  }

  async update(req, res) {
    const { money } = req.body;

    const category = await Category.update({
      money,
    });

    return res.json(category);
  }
}

export default new CategoryController();
