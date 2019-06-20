pragma solidity >=0.4.21 <0.6.0;
import "./SafeMath.sol";
import "./StandardToken.sol";

/** @title A Store Product that inherits ERC20 */
contract StoreProduct is StandardToken{
    
    address public storeowner;
    address public storefront;

    uint public availableStock;
    uint public price;
    uint public sales;

    string public productName;
    string public shortDescription;

    event ProductUpdated(
        uint availableStock,
        uint price,
        string productName,
        string shortDescription
    );

    modifier onlyStoreFront {
        require(msg.sender == storefront, "Only store front can call this method");
        _;
    }
    
    modifier onlyStoreOwner {
        require(msg.sender == storeowner, "Only store owner can call this method");
        _;
    }
    
    modifier onlyBuyer {
        require(balanceOf(msg.sender) > 0, "Only buyer can call this method");
        _;
    }

    /** @dev Instantiates a ERC20 token per product 
     * @param _storeowner Address of filmmaker 
     * @param _availableStock Quantity of stock of the product available
     * @param _price Price of a single product
     * @param _productName Name of the product
     * @param _shortDescription Short description of the product
     */
    constructor(
        address _storeowner,
        uint _availableStock,
        uint _price,
        string _productName, 
        string _shortDescription
    ) 
        public 
    {
        storefront = msg.sender;
        storeowner = _storeowner;
        
        sales = 0;
        price = _price;
        
        totalSupply_ = _availableStock;
        productName = _productName;
        shortDescription = _shortDescription;
        
        balances[storeowner] = totalSupply_;
        allowed[storeowner][storefront] = totalSupply_;
    }

    /** @dev Updates movie and token details
     * @param _availableStock Stock of the product available in the storefront
     * @param _price Price of each of the product
     * @param _productName Name of the product
     * @param _shortDescription Short description of the product
     */

    function updateProduct(
        uint _availableStock,
        uint _price,
        string _productName,
        string _shortDescription
    ) 
        public 
        onlyStoreOwner
        returns (bool)
    {
        if (_availableStock <= totalSupply_) availableStock = _availableStock;
        if (_price > 0) price = _price;
        if (bytes(_productName).length > 0) productName = _productName;
        if (bytes(_shortDescription).length > 0) shortDescription = _shortDescription;
        
        emit ProductUpdated(
            availableStock,
            price,
            productName,
            shortDescription   
        );
        return true;
    } 

    /** @dev Purchases products
     * @param buyer Address of buyer
     * @param quantity Number of products to purchase
     * @return Boolean for testing in solidity 
     */
    function buyProducts(address buyer, uint quantity) external onlyStoreFront returns (bool) {
        require(balances[storeowner] >= quantity);
        balances[storeowner] = balances[storeowner].sub(quantity);
        balances[buyer] = balances[buyer].add(quantity);
        
        availableStock = availableStock.sub(quantity);
        sales = sales.add(quantity.mul(price));
        // fund = fund.add(quantity.mul(price));
        
        emit Transfer(storeowner, buyer, quantity);
        return true;
    }

    /** @dev Retrieves Product and token details 
     * @return _storeowner Address of storeowner 
     * @return _availableStock Available stock of the particular product
     * @return _price Price of each particular product
     * @return _productName Name of the product
     * @return _shortDescription Short description of the product
     */
    function getProductSummary() public view returns (
        address _storeowner,
        uint _availableStock,
        uint _price,
        string _productName,
        string _shortDescription
    ) {
        _storeowner = storeowner;
        _availableStock = availableStock;
        _price = price;
        _productName = productName;
        _shortDescription = shortDescription;
    }
    
    /** @dev Retrieves Product statistics 
     * @return Total product sales
     * @return Balance from product sales and withdrawals
     * @return Total supply of products  
     */
    function getProductStats() public view returns (uint, uint, uint, uint) {
        return (sales, balanceOf(storefront), balanceOf(storeowner), totalSupply_);
    }

}