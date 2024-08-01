class GetShopById {
  constructor(shopRepository) {
    this.shopRepository = shopRepository;
  }

  async execute(shopId) {
    return await this.shopRepository.findById(shopId);
  }
}

export default GetShopById
