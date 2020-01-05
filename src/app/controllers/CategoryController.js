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
    const { category_id } = req.params;

    const category = await Category.findByPk(category_id);

    const { money } = req.body;

    await category.update({
      money,
    });

    return res.json({ money });
  }
}

export default new CategoryController();
