import Shop from "../../frameworks/database/models/shop.js";

class ShopRepository {
  async createShop(shopData) {
    const shop = new Shop(shopData);
    return await shop.save();
  }

  async delete(shopId) {
    return await Shop.findOneAndDelete(shopId);
  }

  async findAll() {
    const shops = await Shop.find();
    return shops;
  }

  async findById(shopId) {
    if (!shopId) {
      throw new Error("invalid id!");
    }
    const shop = await Shop.findOne({ id: shopId });
    return shop
  }

  async findShopByUser(userId){
    if (!userId) {
      throw new Error("invalid id!");
    }
    const shop = await Shop.findOne({ userId: userId });
    return shop
  }
}

export default ShopRepository;
