# DESIGN PATTERN DECISIONS.

## Introduction.

Tumbula.sol is my main contract, a factory contract that creates instances of StoreProduct.sol per product. StoreProduct.sol inherits the ERC20 standard contract from OpenZeppelin and also uses its SafeMath library to securely perform arithmetic operations.

## Access Restricition Pattern.

In both the Tumbula and the StoreProduct contracts, there are certain functions that i want to restrict to only the admin or storeowner. The access restriction pattern helps me to achieve this with the following state variables and function modifiers:

```
## Tumbula.sol

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
```

Then the necessary functions are decorated with these modifiers to restrict access to certain functionality.

## Circuit Breaker Pattern.

Tumbula.sol implements the circuit breaker pattern to give the admin the ability to stop all state-changing functionalities during emergencies and discoveries of critical bugs. This is achieved using the boolean variable emergency, and two modifiers that check for its value:

```
    /*Boolean value to track emergency mode for circuit breaker pattern */
    bool private emergency;

    /*Circuit breaker pattern modifiers */
    modifier stopInEmergency { 
        require(!emergency, "Contract currently in emergency mode, Function can't be called"); 
        _; 
    }
    
    modifier onlyInEmergency { 
        require(emergency, "Function callable only in emergency mode"); 
        _;
    }
```

Then, all state-changing functions are decorated with ```stopInEmergency``` except admin functions. The admin can toggle the emergency state by calling toggleEmergency():

```
    /** @dev Lets admin toggle the state of emergency 
     * @return Boolean for testing in solidity
     */
    function toggleEmergency() public onlyAdmin returns (bool) {
        emergency = !emergency;
        return true;
    }
```

## Pull Over Push Payments Pattern

It is generally a good practice to let recepients pull payments from the smart contract instead of letting the smart contract push payments to them. This pattern protects against Reentrancy and Denial of Service attacks. In the Tumbula.sol contract, store owners can call the ```withdrawFund()``` method to pull payments for themselves or send a payment to another party.

```
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
```

## Fail Early and Loud Pattern(Fail Fast).

Here the require keyword is used to throw as early as possible whenever certain conditions are not met. This pattern makes it glaringly obvious and stops further execution. It is used almost everywhere in the code, especially inside modifiers, e.g.: A special shoutout to using ```transfer()``` instead of ```send()``` implement this design pattern as well because ```transfer()``` doesnt fail silently as opposed to ```send()```

#### Demonstrating use of require
```
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

```

#### Demostrating use of transfer
```
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
------> _recipient.transfer(_amount);
        return true;
    }
```

