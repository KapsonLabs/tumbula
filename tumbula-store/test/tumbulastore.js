const TumbulaStore = artifacts.require("./TumbulaStore.sol");
const assertRevert = require('./utils/assertRevert').assertRevert;

contract('TumbulaStore', function(accounts) {

    let storeInstance;
  
    beforeEach(async () => {
        storeInstance = await TumbulaStore.new()
    })

    it('deploys successfully', async () => {
        const address = await storeInstance.address;
        assert.notEqual(address, 0x0);
        assert.notEqual(address, '');
        assert.notEqual(address, null);
        assert.notEqual(address, undefined)
    })

    it("Should allow an admin to create a new store owner", async () => {

        let tx = await storeInstance.addStoreOwner(accounts[1], "Allan",
                                    "Katongole","kapsonkatongole@gmail.com",
                                    {from: accounts[0]});
    
        assert.strictEqual(tx.receipt.logs.length, 1, "addStoreOwner() call did not log 1 event");
        assert.strictEqual(tx.logs.length, 1, "addStoreOwner() call did not log 1 event");
        const storeOwnerCreated = tx.logs[0];
        assert.strictEqual(storeOwnerCreated.event, "storeOwnerCreated", "addStoreOwner() call did not log event StoreOwnerCreated");
        assert.strictEqual(storeOwnerCreated.args.storeowneraddress,accounts[1], "StoreOwnerCreated event logged did not have expected store owner address");
        assert.strictEqual(storeOwnerCreated.args.firstname,"Allan", "StoreOwnerCreated event logged did not have expected firstname");
        assert.strictEqual(storeOwnerCreated.args.lastname,"Katongole", "StoreOwnerCreated event logged did not have expected lastname");
        assert.strictEqual(storeOwnerCreated.args.email,"kapsonkatongole@gmail.com", "StoreOwnerCreated event logged did not have expected email");
    
    });

    it("Should allow an admin to add another admin", async () => {

        let tx = await storeInstance.addAdmin(accounts[1],
                                    {from: accounts[0]});
    
        assert.strictEqual(tx.receipt.logs.length, 1, "addAdmin() call did not log 1 event");
        assert.strictEqual(tx.logs.length, 1, "addAdmin() call did not log 1 event");
        const roleAdded = tx.logs[0];
        assert.strictEqual(roleAdded.event, "roleAdded", "addAdmin() call did not log event roleAdded");
        assert.strictEqual(roleAdded.args.role_address,accounts[1], "roleAdded event logged did not have expected role_address");
        assert.strictEqual(roleAdded.args.added_by,accounts[0], "roleAdded event logged did not have expected added_by");
    
    });


    it("Should allow an admin to pause the contract incase of emergency", async () => {

        assert.ok(await storeInstance.toggleEmergency({from: accounts[0]}));
    
    });


    it("Should allow a storeowner add a storefront", async () => {
        
        //Create the store owner first.
        let tx = await storeInstance.addStoreOwner(accounts[1], "Allan",
                                    "Katongole","kapsonkatongole@gmail.com",
                                    {from: accounts[0]});

        const storeOwnerCreated = tx.logs[0];

        //Use store owner address to create the store
        let tx1 = await storeInstance.addStoreFront("KikuuboLimited", "Kikuubo", "General Merchandise",
                                    {from: storeOwnerCreated.args.storeowneraddress});
    
        assert.strictEqual(tx1.receipt.logs.length, 1, "addStoreFront() call did not log 1 event");
        assert.strictEqual(tx1.logs.length, 1, "addStoreFront() call did not log 1 event");
        const storeFrontCreated = tx1.logs[0];
        assert.strictEqual(storeFrontCreated.event, "storeFrontCreated", "addStoreFront() call did not log event storeFrontCreated");
        assert.strictEqual(storeFrontCreated.args.storename, "KikuuboLimited", "storeFrontCreated event logged did not have expected store_name");
        assert.strictEqual(storeFrontCreated.args.storelocation, "Kikuubo", "storeFrontCreated event logged did not have expected store_location");
    
    });

    it("Should not allow non-store-owners create storefronts", async () => {

        assertRevert(storeInstance.addStoreFront("KampalaShop","Kampala","Shoes",
                              {from: accounts[1]}), "Non store Owner should not be able to create a store front");
    
    });

    // it("Should allow a storeowner fetch only their storefronts", async () => {
        
    //     //Create the store owner first.
    //     let tx = await storeInstance.addStoreOwner(accounts[1], "Allan",
    //                                 "Katongole","kapsonkatongole@gmail.com",
    //                                 {from: accounts[0]});

    //     const storeOwnerCreated = tx.logs[0];

    //     //Use store owner address to create the store
    //     let tx1 = await storeInstance.addStoreFront("KikuuboLimited", "Kikuubo", "General Merchandise",
    //                                 {from: storeOwnerCreated.args.storeowneraddress});

    //     const storeFrontCreated = tx1.logs[0];
    
    //     const storeFrontsLength = await storeInstance.getStoreFrontNumber();
    //     console.log(storeFrontsLength);

    //     const storeFrontsFetched = await storeInstance.getStoreFronts(accounts[1],
    //         {from: storeOwnerCreated.args.storeowneraddress});
    //     console.log(storeFrontsFetched);

    //     assert.strictEqual(storeFrontCreated.args.id, storeFrontsFetched);
        
    // });

    it("Should allow a product to be added to a storefront", async () => {
        
        //Create the store owner first.
        let tx = await storeInstance.addStoreOwner(accounts[2], "Allan",
                                    "Katongole","kapsonkatongole@gmail.com",
                                    {from: accounts[0]});

        const storeOwnerCreated = tx.logs[0];

        //create the product with storeowner address
        let tx1 = await storeInstance.createProduct(10, 10000,
                                    "Matooke","Matooke fresh from Uganda",
                                    {from: storeOwnerCreated.args.storeowneraddress});
    
        assert.strictEqual(tx1.receipt.logs.length, 1, "createProduct() call did not log 1 event");
        assert.strictEqual(tx1.logs.length, 1, "createProduct() call did not log 1 event");
        const productCreated = tx1.logs[0];
        assert.strictEqual(productCreated.event, "productCreated", "createProduct() call did not log event productCreated");
        assert.strictEqual(productCreated.args.availableStock.toNumber(), 10, "productCreated event logged did not have expected availableStock");
        assert.strictEqual(productCreated.args.price.toNumber(), 10000, "productCreated event logged did not have expected product price");
        assert.strictEqual(productCreated.args.productName, "Matooke", "productCreated event logged did not have expected product name");
    }); 

    it("Should allow a product to be bought by a buyer", async () => {
        
        //Create the store owner first.
        let tx = await storeInstance.addStoreOwner(accounts[2], "Allan",
                                    "Katongole","kapsonkatongole@gmail.com",
                                    {from: accounts[0]});

        const storeOwnerCreated = tx.logs[0];

        //create the product with storeowner address
        let tx1 = await storeInstance.createProduct(10, 10000,
                                    "Matooke","Matooke fresh from Uganda",
                                    {from: storeOwnerCreated.args.storeowneraddress});

        const productCreated = tx1.logs[0];

        //Buy the product from the storefront
        let tx2 = await storeInstance.buyProducts(productCreated.product, 6,
            "Matooke","Matooke fresh from Uganda",
            {from: accounts[3]});
    
        assert.strictEqual(tx1.receipt.logs.length, 1, "buyProducts() call did not log 1 event");
        assert.strictEqual(tx1.logs.length, 1, "buyProducts() call did not log 1 event");
        const productsBought = tx1.logs[0];
        assert.strictEqual(productsBought.event, "productsBought", "buyProducts() call did not log event productsBought");
        // assert.strictEqual(productsBought.args.availableStock.toNumber(), 10, "productCreated event logged did not have expected availableStock");
        // assert.strictEqual(productCreated.args.price.toNumber(), 10000, "productCreated event logged did not have expected product price");
        // assert.strictEqual(productCreated.args.productName, "Matooke", "productCreated event logged did not have expected product name");
    });
     
});