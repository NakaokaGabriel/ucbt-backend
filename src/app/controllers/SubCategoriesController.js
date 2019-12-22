import SubCategory from '../models/SubCategory';

class SubCategoriesController {
  async store(req, res) {
    const subcategory = await SubCategory.create({
      category_id: 3,
      user_id: 2,
      name: 'Coffe',
      price: 100.22,
      priority: 2,
    });

    return res.json(subcategory);
  }
}

export default new SubCategoriesController();
