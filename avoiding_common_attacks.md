# AVOIDING COMMON ATTACKS.

## Introduction.

Tumbula.sol is my main contract, a factory contract that creates instances of StoreProduct.sol per product. StoreProduct.sol inherits the ERC20 standard contract from OpenZeppelin and also uses its SafeMath library to securely perform arithmetic operations. Tumbula.sol also inherits the Roles contract from OpenZeppelin to manage user roles within the contract.

## Integer Overflow and Underflow

Attackers can take advantage of the fact that integers can overflow and underflow in the EVM. To protect against this, The SafeMath library from OpenZeppelin was used for arithmetic calculations, e.g

```
    function buyProducts(
        address buyer, 
        uint quantity
    ) 
        external  
        returns (bool) 
    {
        require(balances[storeowner] >= quantity, "Quantity should be less that or equal to totalSupply");
------> balances[storeowner] = balances[storeowner].sub(quantity);
------> balances[buyer] = balances[buyer].add(quantity);
        
------> availableStock = availableStock.sub(quantity);
------> sales = sales.add(quantity.mul(price));
------> fund = fund.add(quantity.mul(price));
        
        emit Transfer(storeowner, buyer, quantity);
        return true;
    }
```

## Reentrancy.

Whenever ```<address>.transfer()``` is invoked, it provides an opportunity for control to flow to a corrupt contract, because address needs not always be an externally owned account. When called, the called contract’s fallback function can contain code to call back (reenter) the calling contract’s function in a recursive manner that can be detrimental. For our withdrawFund() function to work, we cannot avoid making an external call to the recipient’s address. Therefore, we utilize the withdrawal design pattern to separate the accounting logic from the transfer logic, making sure to finish all internal state changes first before invoking the external call. Usually, this means transfer() is the last step. Moreover, potential cross-function race conditions such as calling internal functions that call external functions are also designed away.

```
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

## Denial Of Service Attack with Block Gas limit

Finishing all internal work before making external calls also protects against denial of service attacks. The called contract’s fallback can always revert, which also halts the execution of the calling contract. If there are necessary operations further along, they will never get executed.

By utilizing the withdrawal design pattern to favor pull payments over push payments, denial of service attacks that target the block gas limit are also avoided. I could have looped through an array of addresses, pushing payments to the recipients automatically for their convenience. However, attackers could take advantage of the fact that i am looping through an array of unknown size, creating many corrupt recipient accounts to cause the function to hit the block gas limit whenever it executes. The effect, the contract becomes unusable.
