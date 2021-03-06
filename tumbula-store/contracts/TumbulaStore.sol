pragma solidity >=0.4.21 <0.6.0;
import "openzeppelin-solidity/contracts/access/Roles.sol";
import "openzeppelin-solidity/contracts/math/SafeMath.sol";
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

    /*  */

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

    /*Mapping of storefronts to storeowner address */
    mapping(address => uint[]) public storefrontIds;

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

    event productCreated(
        address product,
        uint availableStock,
        uint price,
        string productName, 
        string shortDescription
    );

    event productsBought(
        address product, 
        address buyer,
        uint price,
        uint quantity
    );

    event FundWithdrawn(
        uint indexed date,
        address indexed product, 
        address recipient, 
        uint amount
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

    /*Modifier that checks if msg.sender is the productowner of the product */
    modifier onlyProductOwner(address product) {
        require(
            msg.sender == Product(product).storeowner(),
            "Only the product owner can call this method");
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
        storefrontIds[msg.sender].push(storeFrontNumber);
        emit storeFrontCreated(
            storeFrontNumber, 
            msg.sender, 
            _storename, 
            _storelocation, 
            _storemerchandise
        );
    }

    /** @dev Gets storefonts owned by particular storeowner 
     * @param _userAddress Address of the owner
     * @return Array of store fronts owned
     */

    function getStoreFronts(address _userAddress) public view onlyStoreOwner returns (uint[] memory storefrontsarray){
        return storefrontIds[_userAddress];
    }

    function getStoreFrontNumber() public view returns (uint) {
        return storeFrontNumber;
    }

    /** @dev Creates ERC20 token per product 
     * @param availableStock Quantity of products available for each individual product
     * @param price Price of each product
     * @param productName Name of the product 
     * @param shortDescription Short description of the product
     * @return Boolean for testing in solidity
     */
    function createProduct(uint availableStock, uint price, string memory productName, string memory shortDescription) 
        public 
        onlyStoreOwner
        stopInEmergency
        returns (bool)
    {
        require(price > 0, "Price should be greater than zero");
        require(bytes(productName).length > 0, "There should be a name");
        require(bytes(shortDescription).length > 0, "There should be a short description");

        Product product = new Product(msg.sender, availableStock, price, productName, shortDescription);
        products.push(address(product));
        
        emit productCreated(
            address(product),
            availableStock,
            price,
            productName,
            shortDescription   
        );
        return true;
    }

    /** @dev Purchases movie tickets
     * @param _product Address of product token
     * @param _quantity quantity to be purchased
     */
    function buyProducts(address _product, uint _quantity)
        public 
        payable
        stopInEmergency
    {
        require(_quantity > 0, "Ensure quantity is greater than zero");
        Product product = Product(_product);
        uint price = product.price();
        uint availableStock = product.availableStock();

        // check available quantity
        require(availableStock >= _quantity, "Ensure quantity is less than available Stock");
        
        // check payment amount
        require(msg.value >= _quantity.mul(price), "Ensure price paid is enough to cover costs");
        
        // // check excess payment
        // uint excess = msg.value.sub(quantity.mul(price));
        // if (excess > 0) emit ExcessPaid(now, movie, msg.sender, excess);
        
        product.buyProducts(msg.sender, _quantity);
        emit productsBought(address(product), msg.sender, price, _quantity);
    }

    /** @dev Withdraws from fund 
     * @param _product Address of product token
     * @param _recipient Address of recipient to be paid
     * @param _amount Amount in wei to pay
     * @return Boolean for testing in solidity
     */
    function withdrawFund(address _product, address payable _recipient, uint _amount) 
        public 
        stopInEmergency
        // onlyProductOwner(_product)
        returns (bool)
    {
        require(_recipient != address(0), "Admins should not be reciepients");
        require(_amount > 0, "Amount should be greater than zero");
        
        Product(_product).withdrawFund(_amount);
        
        emit FundWithdrawn(now, _product, _recipient, _amount);
        _recipient.transfer(_amount);
        return true;
    }


    /** @dev Checks for the role of a specific address
     * @param _theAddress Address for which role is to be checked
     * @return uint indicating specific role
     */

    function checkAdressRole(address _theAddress) public view returns (uint){

        if (admin.has(_theAddress)) {
            return 0;
        }

        if (store_owner.has(_theAddress)) {
            return 1;
        }

        if (!store_owner.has(_theAddress) && !admin.has(_theAddress)) {
            return 2;
        }
    }

    /** @dev Returns array of product token addresses
     * @return Product token addresses
     */
    function getProducts() public view returns (address[] memory) {
        return products;
    }

}