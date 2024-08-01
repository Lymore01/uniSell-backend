class Category {
  constructor({ id, name, description, createdAt, updatedAt }) {
    (this.id = id),
      (this.name = name),
      (this.description = description),
      (this.createdAt = createdAt),
      (this.updatedAt = updatedAt);
  }
}

export default Category

// constructor create and initialize objects
