class GetAllCategories{
    constructor(categoryRepo){
        this.categoryRepo = categoryRepo
    }

    async execute(){
        return this.categoryRepo.getAll()
    }
}

export default GetAllCategories