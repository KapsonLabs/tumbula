pragma solidity >=0.4.21 <0.6.0;
import "./Roles.sol";
import "./SafeMath.sol";
import {StoreProduct as Product} from "./StoreProduct.sol";

contract TumbulaStore{

    /*
    Contract for the Tumbula online store.

    ------------------------------------
    ROLES.
    1. Admin.
    2. Store Owner.
    ------------------------------------
     */
    using Roles for Roles.Role;

    Roles.Role private admin;
    Roles.Role private store_owner;
    

    uint public storeOwnerNumber = 0;
    uint public storeFrontNumber = 0;

    /*Boolean value to track emergency mode for circuit breaker pattern */
    bool private emergency;

    struct StoreOwner{
        uint    id;
        string  first_name;
        string  last_name;
        string  password;
        string  email;
        string  role;
        bool    active;
    }

    struct StoreFront{
        uint    id;
        address store_owner;
        string  store_name;
        string  store_location;
        string  store_merchandise;
    }

    mapping(uint => StoreOwner) public storeowners;

    mapping(uint => StoreFront) public storefronts;

    event storeOwnerCreated(
        uint id,
        string first_name,
        string last_name,
        string password,
        string email,
        string role,
        bool active
    );

    event storeFrontCreated(
        uint   id,
        address store_owner,
        string store_name,
        string store_location,
        string store_merchandise
    );

    /* Modifer that checks if the msg.sender has an admin role */
    modifier onlyAdmin(){
        require(
            admin.has(msg.sender),
            "Only the admin can call this function"
            );
        _;
    }

    /* Modifer that checks if the msg.sender has a store owner role */
    modifier onlyStoreOwner(){
        require(
            store_owner.has(msg.sender),
            "Only the store owner can call this function"
            );
        _;
    }

    /*Circuit breaker pattern modifiers */
    modifier stopInEmergency { 
        require(!emergency, "Contract currently in emergency mode, Function can't be called"); 
        _; 
    }
    
    modifier onlyInEmergency { 
        require(emergency, "Function callable only in emergency mode"); 
        _;
    }

    // constructor() public {
    //     addStoreOwner("Katongole", "Allan");
    //     addStoreOwner("Assimirwe", "Abraham");
    // }

    /*Admin Functions*/
    function addStoreOwner(string memory _first_name, string memory _last_name, string memory _email) public {
        storeowners[storeOwnerNumber] = StoreOwner(storeOwnerNumber, _first_name, _last_name, "default123", _email, "store_owner", true);
        storeOwnerNumber = storeOwnerNumber + 1;
        emit storeOwnerCreated(storeOwnerNumber, _first_name, _last_name, "default123", _email, "store_owner", true);
    }

    /** @dev Lets admin toggle the state of emergency 
     * @return Boolean for testing in solidity
     */
    function toggleEmergency() public onlyAdmin returns (bool) {
        emergency = !emergency;
        return true;
    }

    /*Add admin */
    function addAdmin(address _address) public{
        admin.add(_address);
    }

    /*Store Owner Functions*/
    function addStoreFront(string memory _store_name, string memory _store_location, string memory _store_merchandise) public {
        storefronts[storeFrontNumber] = StoreFront(storeFrontNumber, msg.sender, _store_name, _store_location, _store_merchandise);
        storeFrontNumber = storeFrontNumber + 1;
        emit storeFrontCreated(storeFrontNumber, msg.sender, _store_name, _store_location, _store_merchandise);
    }
}