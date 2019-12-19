import SubCategory from '../models/SubCategory';

class SubCategoriesController {
  async store(req, res) {
    const subcategory = await SubCategory.create(req.body);

    return res.json(subcategory);
  }
}

export default new SubCategoriesController();
