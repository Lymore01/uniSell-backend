class CreateNewCategory{
    constructor(categoryRepo){
        this.categoryRepo = categoryRepo
    }

    async execute(categoryData){
        return this.categoryRepo.create(categoryData)
    }
}

export default CreateNewCategory