class DeleteCategory {
  constructor(categoryRepo) {
    this.categoryRepo = categoryRepo;
  }

  async execute(categoryId) {
    return this.categoryRepo.delete(categoryId);
  }
}

export default DeleteCategory
