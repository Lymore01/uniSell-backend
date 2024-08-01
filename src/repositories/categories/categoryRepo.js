import Category from "../../frameworks/database/models/category.js";

class CategoryRepository {
  async create(categoryData) {
    const category = new Category(categoryData);
    return await category.save();
  }

  async delete(categoryId) {
    if (!categoryId) {
      throw new Error("Invalid id!");
    } else {
      return await Category.findOneAndDelete({ id: categoryId });
    }
  }

  async getAll() {
    const categories = await Category.find();
    return categories;
  }

  async getById(categoryId) {
    if (!categoryId) {
      throw new Error("Invalid id!");
    }
    const category = await Category.findOne({ id: categoryId });
    return category;
  }
}

export default CategoryRepository;
