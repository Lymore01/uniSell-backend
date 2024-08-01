class DeleteShop {
    constructor(shopRepository) {
        this.shopRepository = shopRepository;
      }

      async execute(shopId){
        return await this.shopRepository.delete(shopId)
      }
}
export default DeleteShop