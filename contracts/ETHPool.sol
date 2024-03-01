// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ETHPool {
    address public team;
    uint public totalDeposits;
    mapping(address => uint) public deposits;
    mapping(address => uint) public rewards;
    mapping(address => uint) public depositTimestamps;

    constructor() {
        team = msg.sender;
    }

    function deposit() external payable {
        require(msg.value > 0, "Deposit amount must be greater than 0");
        
        deposits[msg.sender] += msg.value;
        depositTimestamps[msg.sender] = block.timestamp;
        totalDeposits += msg.value;
    }

    function withdraw() external {
        uint userDeposit = deposits[msg.sender];
        uint userRewards = rewards[msg.sender];
        uint userTotal = userDeposit + userRewards;

        require(userTotal > 0, "No funds to withdraw");

        uint userDepositTime = depositTimestamps[msg.sender];
        uint timeInPool = block.timestamp - userDepositTime;
        uint userShare = (userDeposit * timeInPool) / (totalDeposits * 1 days); // Calculate user's share based on time

        deposits[msg.sender] = 0;
        rewards[msg.sender] = 0;
        totalDeposits -= userDeposit;

        uint amountToWithdraw = userDeposit + userShare;
        payable(msg.sender).transfer(amountToWithdraw);
    }

    function depositRewards(uint amount) external {
        require(msg.sender == team, "Only team can deposit rewards");
        
    }

}