class ShopController {
  constructor({
    createShop,
    deleteShop,
    getAllShops,
    getShopByCategory,
    getShopById,
    getShopByUser,
    updateShop,
  }) {
    this.createShop = createShop;
    this.deleteShop = deleteShop;
    this.getAllShops = getAllShops;
    this.getShopByCategory = getShopByCategory;
    this.getShopById = getShopById;
    this.getShopByUser = getShopByUser;
    this.updateShop = updateShop;
  }

  async create(req, res) {
    try {
      const shopData = {
        id: Date.now().toString(),
        userId: req.body.userId,
        shopName: req.body.shopName,
        shopCategory: req.body.shopCategory,
        products: req.body.products,
        paymentMethod: req.body.paymentMethod,
        shopDescription: req.body.shopDescription,
      };
      const shop = await this.createShop.execute(shopData);
      res.status(201).json({ message: "Shop Created", shop });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async deleteShopById(req, res) {
    const { id } = req.params;
    try {
      const shop = await this.deleteShop.execute(id);
      if (!shop) {
        res.status(400).json({ message: "Error deleting shop" });
      } else {
        res.status(200).json({ message: `${id} deleted`, shop });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getAll(req, res){
    try {
      const shops = await this.getAllShops.execute();
      res.status(200).json(shops);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getById(req, res){
    const { id } = req.params;
    try {
      if (!id) {
        res.status(400).json({ message: "invalid id!" });
      }
      const shop = await this.getShopById.execute(id);
      if (!shop) {
        res.status(400).json({ message: "Error fetching shop!" });
      } else {
        res.status(200).json({ message: `success`, shop });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getShopByUserID(req, res){
    const { id } = req.params;
    try {
      if (!id) {
        res.status(400).json({ message: "invalid id!" });
      }
      const shop = await this.getShopByUser.execute(id);
      if (!shop) {
        res.status(400).json({ message: "Error fetching shop!" });
      } else {
        res.status(200).json({ message: `success, shop by user ${id}`, shop });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default ShopController;
