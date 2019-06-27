// const StoreProduct = artifacts.require("./StoreProduct.sol");
// const assertRevert = require('./utils/assertRevert').assertRevert;

// contract('StoreProduct', function(accounts) {

//     let storeProductInstance;
  
//     beforeEach(async () => {
//         storeProductInstance = await StoreProduct.new()
//     })

//     it("Should allow a product to be updated by a storeowner", async () => {
        
//         //Create the store owner first.
//         let tx = await storeProductInstance.updateProduct(10, 10000, "Radio",
//                                     "Good good radio my friend",
//                                     {from: accounts[0]});
    
//         assert.strictEqual(tx.receipt.logs.length, 1, "updateProduct() call did not log 1 event");
//         assert.strictEqual(tx.logs.length, 1, "updateProduct() call did not log 1 event");
//         const ProductUpdated = tx.logs[0];
//         assert.strictEqual(ProductUpdated.event, "ProductUpdated", "updateProduct() call did not log event storeFrontCreated");
//         assert.strictEqual(ProductUpdated.args.availableStock.toNumber(), 10, "productCreated event logged did not have expected availableStock");
//         assert.strictEqual(ProductUpdated.args.price.toNumber(), 10000, "productCreated event logged did not have expected product price");
//         assert.strictEqual(ProductUpdated.args.productName, "Radio", "productCreated event logged did not have expected product name");
//     }); 

// });