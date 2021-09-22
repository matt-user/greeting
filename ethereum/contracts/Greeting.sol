// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

/**
 * @title Greeting
 * @dev Store & retrieve string in a variable
 * @author mattauer@umich.edu
 */
contract Greeting {

    string greeting;

    /**
     * @dev Store string in variable
     * @param _greeting value to store
     */
    function setGreeting(string memory _greeting) public {
        greeting = _greeting;
    }

    /**
     * @dev Return value 
     * @return value of 'greeting'
     */
    function getGreeting() public view returns (string memory){
        return greeting;
    }
}