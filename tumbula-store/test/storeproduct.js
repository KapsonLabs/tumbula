const TumbulaStore = artifacts.require("./TumbulaStore.sol");
const assertRevert = require('./utils/assertRevert').assertRevert;

contract('StoreProduct', function(accounts) {

    let storeInstance;
  
    beforeEach(async () => {
        storeInstance = await TumbulaStore.new()
    })

    it("Should allow a product to be added to a storefront", async () => {
        
        //Create the store owner first.
        let tx = await storeInstance.createProduct(10, 10000,
                                    "Matooke","Matooke fresh from Uganda",
                                    {from: accounts[3]});
    
        assert.strictEqual(tx.receipt.logs.length, 1, "createProduct() call did not log 1 event");
        assert.strictEqual(tx.logs.length, 1, "createProduct() call did not log 1 event");
        const productCreated = tx.logs[0];
        assert.strictEqual(productCreated.event, "productCreated", "createProduct() call did not log event storeFrontCreated");
        assert.strictEqual(productCreated.args.availableStock.toNumber(), 10, "productCreated event logged did not have expected availableStock");
        assert.strictEqual(productCreated.args.price.toNumber(), 10000, "productCreated event logged did not have expected product price");
        assert.strictEqual(productCreated.args.productName, "Matooke", "productCreated event logged did not have expected product name");
    }); 

});