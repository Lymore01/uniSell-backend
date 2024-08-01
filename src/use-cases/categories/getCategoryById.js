class GetCategoryById{
    constructor(categoryRepo){
        this.categoryRepo = categoryRepo
    }

    async execute(categoryId){
        return this.categoryRepo.getById(categoryId)
    }
}

export default GetCategoryById