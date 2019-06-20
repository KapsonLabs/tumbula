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
    using SafeMath for uint;
    using SafeMath for uint8;

    Roles.Role private admin;
    Roles.Role private store_owner;
    

    uint public storeOwnerNumber;
    uint public storeFrontNumber;

    /*Products array*/
    address[] public products;

    /*Boolean value to track emergency mode for circuit breaker pattern */
    bool private emergency;

    struct StoreOwner{
        uint    id;
        address storeowneraddress;
        string  firstname;
        string  lastname;
        string  password;
        string  email;
        string  role;
        bool    active;
    }

    struct StoreFront{
        uint    id;
        address storeowner;
        string  storename;
        string  storelocation;
        string  storemerchandise;
    }

    mapping(uint => StoreOwner) public storeowners;

    mapping(uint => StoreFront) public storefronts;

    event storeOwnerCreated(
        uint id,
        address storeowneraddress,
        string firstname,
        string lastname,
        string password,
        string email,
        string role,
        bool active
    );

    event roleAdded(
        address role_address,
        address added_by
    );

    event storeFrontCreated(
        uint   id,
        address storeowner,
        string storename,
        string storelocation,
        string storemerchandise
    );

    event ProductCreated(
        address product,
        uint availableStock,
        uint price,
        string productName, 
        string shortDescription
    );

    event ProductsBought(
        address product, 
        address buyer,
        uint price,
        uint quantity
    );

    /* Modifer that checks if the msg.sender has an admin role */
    modifier onlyAdmin {
        require(
            admin.has(msg.sender),
            "Only the admin can call this function"
            );
        _;
    }

    /* Modifer that checks if the msg.sender has a store owner role */
    modifier onlyStoreOwner {
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

    constructor() public {
        admin.add(msg.sender);
        emergency = false;

        storeOwnerNumber = 0;
        storeFrontNumber = 0;
    }
    
    /*
    --------------------------------------------------------
    Admin Functions
    --------------------------------------------------------
    */
    /** @dev Creates a new storeOwner 
     * @param _firstname Firstname of the store owner
     * @param _lastname last name of the store owner
     * @param _email Email address of the store owner 
     * @return Boolean for testing in solidity
     */
    function addStoreOwner(
        address _storeowneraddress,
        string memory _firstname, 
        string memory _lastname, 
        string memory _email
    ) 
            public 
            onlyAdmin
    {
        storeowners[storeOwnerNumber] = StoreOwner(
            storeOwnerNumber, 
            _storeowneraddress, 
            _firstname, 
            _lastname, 
            "default123", 
            _email, 
            "store_owner", 
            true);

        storeOwnerNumber = storeOwnerNumber + 1;

        //Add the store owner to store owner roles
        store_owner.add(_storeowneraddress);

        emit storeOwnerCreated(
            storeOwnerNumber, 
            _storeowneraddress,
            _firstname, 
            _lastname, 
            "default123", 
            _email, 
            "store_owner", 
            true
        );
    }

    /** @dev Lets admin add more admins 
     * @return Boolean for testing in solidity
     */
    function addAdmin(address _address) public onlyAdmin {
        admin.add(_address);
        emit roleAdded(
            _address,
            msg.sender
        );
    }

    /** @dev Lets admin toggle the state of emergency 
     * @return Boolean for testing in solidity
     */
    function toggleEmergency() public onlyAdmin returns (bool) {
        emergency = !emergency;
        return true;
    }


    /*
    ---------------------------------------------------------------
    Store Owner Functions
    ---------------------------------------------------------------
    */

    /** @dev Adds a new store front 
     * @param _storename Name of the storefront
     * @param _storelocation Location of the storefront
     * @param _storemerchandise Type of merchandise dealt in by storefront
     * @return Boolean for testing in solidity
     */
    function addStoreFront(
        string memory _storename, 
        string memory _storelocation, 
        string memory _storemerchandise
        ) 
            public 
            onlyStoreOwner
        {
        storefronts[storeFrontNumber] = StoreFront(storeFrontNumber, msg.sender, _storename, _storelocation, _storemerchandise);
        storeFrontNumber = storeFrontNumber + 1;
        emit storeFrontCreated(
            storeFrontNumber, 
            msg.sender, 
            _storename, 
            _storelocation, 
            _storemerchandise
        );
    }

    /** @dev Creates ERC20 token per product 
     * @param availableStock Quantity of products available for each individual product
     * @param price Price of each product
     * @param productName Name of the product 
     * @param shortDescription Short description of the product
     * @return Boolean for testing in solidity
     */
    function createProduct(
        uint availableStock,
        uint price,
        string memory productName,
        string memory shortDescription
    ) 
        public 
        stopInEmergency
        returns (bool)
    {
        require(price > 0, "Price should be greater than zero");
        require(bytes(productName).length > 0, "There should be a name");
        require(bytes(shortDescription).length > 0, "There should be a short description");

        Product product = new Product(msg.sender, availableStock, price, productName, shortDescription);
        products.push(address(product));
        
        emit ProductCreated(
            address(product),
            availableStock,
            price,
            productName,
            shortDescription   
        );
        return true;
    }
}