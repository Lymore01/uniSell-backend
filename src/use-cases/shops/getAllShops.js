class GetAllShops{
    constructor(shopRepository) {
        this.shopRepository = shopRepository;
      }

      async execute(){
        return await this.shopRepository.findAll()
      }
}

export default GetAllShops