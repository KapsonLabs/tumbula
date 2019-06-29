const Store = artifacts.require("./TumbulaStore.sol");
const assertRevert = require('./utils/assertRevert').assertRevert;

contract('CircuitBreakerPattern', function(accounts) {
    let store;
  
    beforeEach(async () => {
        store = await Store.new()
    })

    it("Should permit an admin to pause the contract incase of emergency", async () => {

        assert.ok(await store.toggleEmergency({from: accounts[0]}));
    
    });

    it("Shouldnot allow a non-admin to pause the contract at all", async () => {

        assertRevert(store.toggleEmergency({from: accounts[2]}));
    
    });

    it("Shouldnot allow the following methods to be called in emergency mode", async () => {

        await store.toggleEmergency({from: accounts[0]});

        //Create the store owner first.
        let tx = await store.addStoreOwner(accounts[1], "Allan",
                                    "Katongole","kapsonkatongole@gmail.com",
                                    {from: accounts[0]});

        const storeOwnerCreated = tx.logs[0];

        //Store creation shouldnt be called in emergency mode
        assertRevert(store.addStoreFront("KikuuboLimited", "Kikuubo", "General Merchandise", {from: storeOwnerCreated.args.storeowneraddress}), "Circuit breaker not working.");

        //Product Creation should be callable in emergency mode
        assertRevert(store.createProduct(10, 10000,"Matooke","Matooke fresh from Uganda",{from: storeOwnerCreated.args.storeowneraddress}), "Circuit breaker not working");

    
    });
});