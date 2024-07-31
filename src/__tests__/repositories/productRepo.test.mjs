import ProductRepo from '../../repositories/products/productRepo.js';
import ProductModel from '../../frameworks/database/models/product.js'; 

jest.mock('../../frameworks/database/models/product.js');

describe('ProductRepo', () => {
  let productRepo;
  
  beforeEach(() => {
    productRepo = new ProductRepo();
  });

  afterEach(() => {
    jest.clearAllMocks(); 
  });

  test('should save a product', async () => {
    const productData = {
      id: '123',
      prodName: 'Test Product',
      description: 'A product for testing',
      price: 100,
      quantity: 10,
      color: 'red',
      size: 'M',
      categoryId: 'cat123',
      image: 'image_url',
    };

    ProductModel.mockImplementation(() => ({
      save: jest.fn().mockResolvedValue(productData),
    }));

    const savedProduct = await ProductModel.save(productData);
    expect(savedProduct).toEqual(productData);
    // expect(ProductModel).toHaveBeenCalledWith(productData);
    // expect(ProductModel.prototype.save).toHaveBeenCalled();
  });
});


