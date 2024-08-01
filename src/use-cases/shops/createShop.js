class CreateShop{
    constructor(shopRepository) {
        this.shopRepository = shopRepository;
      }

      async execute(shopData){
        return await this.shopRepository.createShop(shopData)
      }
}

export default CreateShop