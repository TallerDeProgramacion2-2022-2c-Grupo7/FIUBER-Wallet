// SPDX-License-Identifier: MIT
pragma solidity ^0.7.4;

import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/math/Math.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

/**
    @title BasicPayments Contract
    @author Taller de programacion 2 - FIUBA - Ayudantes
    @notice This contract allows you to track payments made to it 
    @dev This is an academic contract made for didactic purposes. DO NOT USE THIS IN PRODUCTION
 */
contract BasicPayments is Ownable {
    using SafeMath for uint256;

    event PaymentMade(address indexed receiver, uint256 amount);

    event DepositMade(address indexed sender, uint256 amount, address indexed receiver);

    /**
        @notice Mapping of payments sent to an address
     */
    mapping(address => uint256) public sentPayments;
    mapping(address => uint256) public receivedPayments;

    /**
        @notice Function to receive payments
        Emits DepositMade with the sender and the amount as a parameter
        Fails if value sent is 0
        @dev it calls an internal function that does this entirely
     */
    function deposit(address receiver) external payable {
        _deposit(msg.sender, msg.value, receiver);
    }

    /**
        @notice Sends the specified amount to the specified address 
        Emits PaymentMade with the receiver and the amount as a parameter
        Fails if value sent is greater than the balance the contract has
        Fails if not called by the owner
        @dev updates sentPayments mapping
        @param receiver Address that will receive the payment
        @param amount Amount to be sent
     */
    function sendPayment(address payable receiver, uint256 amount) external onlyOwner {
        require(address(this).balance >= amount, "not enough balance");
        require(amount > 0, "cannot send 0 weis");
        require(receivedPayments[receiver] >= amount, "not enough user balance");
        receivedPayments[receiver] = receivedPayments[receiver].sub(amount);
        emit PaymentMade(receiver, amount);
        (bool success, ) = receiver.call{ value: amount }("");
        require(success, "payment failed");
    }

    /**
        @notice fallback function: acts in the same way that deposit does
     */
    receive() external payable {
        _deposit(msg.sender, msg.value, msg.sender);
    }

    /**
        @notice Function to receive payments
        Emits DepositMade with the sender and the amount as a parameter
        Fails if value sent is 0
        @dev it calls an internal function that does this entirely
     */
    function _deposit(address sender, uint256 amount, address receiver) internal {
        require(amount > 0, "did not send any value");
        sentPayments[sender] = sentPayments[sender].add(amount);
        receivedPayments[receiver] = receivedPayments[receiver].add(amount);
        emit DepositMade(sender, amount, receiver);
    }

    function getDepositedPayments(address receiver) public view onlyOwner returns (uint256) {
        return receivedPayments[receiver];
    }
}
