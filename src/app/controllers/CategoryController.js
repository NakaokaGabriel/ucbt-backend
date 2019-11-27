import Category from '../models/Category';

class CategoryController {
  async index(req, res) {
    const category = await Category.findAll();

    return res.json(category);
  }
}

export default new CategoryController();
