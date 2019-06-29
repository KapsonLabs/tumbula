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

