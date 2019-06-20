const TumbulaStore = artifacts.require("./TumbulaStore.sol");

contract('TumbulaStore', function(accounts) {

    let storeInstance;
  
    beforeEach(async () => {
        storeInstance = await TumbulaStore.new()
    })

    it("Should allow an admin to create a new store owner", async () => {

        let tx = await storeInstance.addStoreOwner("Allan",
                                    "Katongole","kapsonkatongole@gmail.com",
                                    {from: accounts[0]});
    
        assert.strictEqual(tx.receipt.logs.length, 1, "addStoreOwner() call did not log 1 event");
        assert.strictEqual(tx.logs.length, 1, "addStoreOwner() call did not log 1 event");
        const storeOwnerCreated = tx.logs[0];
        assert.strictEqual(storeOwnerCreated.event, "storeOwnerCreated", "addStoreOwner() call did not log event StoreOwnerCreated");
        assert.strictEqual(storeOwnerCreated.args.firstname,"Allan", "StoreOwnerCreated event logged did not have expected firstname");
        assert.strictEqual(storeOwnerCreated.args.lastname,"Katongole", "StoreOwnerCreated event logged did not have expected lastname");
        assert.strictEqual(storeOwnerCreated.args.email,"kapsonkatongole@gmail.com", "StoreOwnerCreated event logged did not have expected email");
        // assert.strictEqual(logBountyIssued.args.issuer, accounts[0], "BountyIssued event logged did not have expected issuer");
        // assert.strictEqual(logBountyIssued.args.amount.toNumber(),500000000000000000, "BountyIssued event logged did not have expected amount");
    
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
     
});