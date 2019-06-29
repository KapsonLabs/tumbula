const StoreProduct = artifacts.require("./StoreProduct.sol");
const TumbulaStore = artifacts.require("./TumbulaStore.sol");

const assertRevert = require('./utils/assertRevert').assertRevert;

contract('StoreProduct', function(accounts) {

    let storeProduct;
  
    beforeEach(async () => {
        const tumbulaStore = await TumbulaStore.new()

        //Create the store owner first.
        let tx = await tumbulaStore.addStoreOwner(accounts[2], "Allan",
                                    "Katongole","kapsonkatongole@gmail.com",
                                    {from: accounts[0]});

        const storeOwnerCreated = tx.logs[0];

        //create the product with storeowner address
        await tumbulaStore.createProduct(10, 10000,
                                    "Matooke","Matooke fresh from Uganda",
                                    {from: storeOwnerCreated.args.storeowneraddress});

        //get the created product from the products array
        const product = await tumbulaStore.products(0);

        storeProduct = await StoreProduct.at(product);
    })

    it("should get product details", async () => {
        assert.equal(await storeProduct.productName(), "Matooke");

        assert.equal(await storeProduct.availableStock(), 10);
        assert.equal(await storeProduct.price(), 10000);
      });
    

    it("Should allow a product to be updated by a storeowner", async () => {
        
        //Create the store owner first.
        let updateProduct = await storeProduct.updateProduct(10, 10000, "Radio",
                                    "Good good radio my friend",
                                    {from: accounts[0]});
    
        assert.strictEqual(updateProduct.receipt.logs.length, 1, "updateProduct() call did not log 1 event");
        assert.strictEqual(updateProduct.logs.length, 1, "updateProduct() call did not log 1 event");
        const ProductUpdated = updateProduct.logs[0];
        assert.strictEqual(ProductUpdated.event, "ProductUpdated", "updateProduct() call did not log event storeFrontCreated");
        assert.strictEqual(ProductUpdated.args.availableStock.toNumber(), 10, "productCreated event logged did not have expected availableStock");
        assert.strictEqual(ProductUpdated.args.price.toNumber(), 10000, "productCreated event logged did not have expected product price");
        assert.strictEqual(ProductUpdated.args.productName, "Radio", "productCreated event logged did not have expected product name");
    });

    
    it("Should allow get product summary", async () => {
        
        //Create the store owner first.
        const productSummary = await storeProduct.getProductSummary();
        const storeOwner = await storeProduct.storeowner();
    
        assert.strictEqual(productSummary._storeowner, storeOwner, "Product returned wrong storeowner");
        assert.strictEqual(productSummary._availableStock.toNumber(), 10, "productCreated event logged did not have expected availableStock");
        assert.strictEqual(productSummary._price.toNumber(), 10000, "productCreated event logged did not have expected product price");
        assert.strictEqual(productSummary._productName, "Matooke", "productCreated event logged did not have expected product name");
    }); 

    it("should get product stats", async () => {
        const productStats = await storeProduct.getProductStats();
        
        assert.equal(productStats._sales, 0);
        assert.equal(productStats._fund, 0);
      });

});