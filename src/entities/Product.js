// product entity

class Product {
    constructor({ id, prodName, description, price, quantity, color, size, categoryId, image,imageId, createdAt, updatedAt }){
        this.id = id,
        this.prodName = prodName,
        this.description = description,
        this.price = price,
        this.quantity = quantity,
        this.color = color,
        this.size = size,
        this.categoryId = categoryId,
        this.image = image,
        this.imageId = imageId,
        this.createdAt = createdAt,
        this.updatedAt = updatedAt
    }
}

export default Product