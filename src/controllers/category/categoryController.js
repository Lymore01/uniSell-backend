class CategoryController {
  constructor({
    createCategory,
    deleteCategory,
    getAllCategories,
    getCategoryById,
  }) {
    (this.createCategory = createCategory),
      (this.deleteCategory = deleteCategory),
      (this.getAllCategories = getAllCategories),
      (this.getCategoryById = getCategoryById);
  }

  async createCategories(req, res) {
    try {
      const categoryData = {
        id: Date.now().toString(),
        name: req.body.name,
        description: req.body.description,
      };

      const category = await this.createCategory.execute(categoryData);
      res.status(201).json({ message: "Category Created", category });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  async deleteCategoryById(req, res) {
    const { id } = req.params;
    try {
      if (!id) {
        res.status(400).json({ message: "invalid id!" });
      }
      const category = await this.deleteCategory.execute(id);
      if (!category) {
        res.status(400).json({ message: "Error deleting category!" });
      } else {
        res.status(200).json({ message: `Category ${id} deleted`, category });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async findAll(req, res) {
    try {
      const orders = await this.getAllCategories.execute();
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async findById(req, res) {
    const { id } = req.params;
    try {
      if (!id) {
        res.status(400).json({ message: "invalid id!" });
      }
      const category = await this.getCategoryById.execute(id);
      if (!category) {
        res.status(400).json({ message: "Error fetching category!" });
      } else {
        res.status(200).json({ message: `success`, category });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default CategoryController;
