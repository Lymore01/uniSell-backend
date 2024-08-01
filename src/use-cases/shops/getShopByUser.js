class GetShopByUser{
    constructor(shopRepository) {
        this.shopRepository = shopRepository;
      }

      async execute(shopData){
        return await this.shopRepository.findShopByUser(shopData)
      }
}

export default GetShopByUser