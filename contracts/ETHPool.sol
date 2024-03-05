// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


contract ETHPool {
    address public team;
    uint256 public totalDeposits;
    mapping(address => UserInfo) public deposits;
    address[] users;

    struct UserInfo {
        address user;
        uint capital;
        uint rewards;
        bool active;
    }

    event WithdrawWithoutRewards(address indexed user, uint amount);

    constructor() {
        team = msg.sender;
    }

    function deposit() external payable {
        require(msg.value > 0, "Deposit amount must be greater than 0");
        users.push(msg.sender);

        deposits[msg.sender].user = msg.sender;
        deposits[msg.sender].active = true;
        deposits[msg.sender].capital = msg.value;

        totalDeposits += msg.value;
    }

    function withdraw() external {
        UserInfo memory userInfo = deposits[msg.sender];
        require(userInfo.active, "Deactive user");
        userInfo.active = false;
        if (userInfo.rewards == 0 ) {
            emit WithdrawWithoutRewards(msg.sender, userInfo.capital);
        }

        uint256 amountToWithdraw = userInfo.capital + userInfo.rewards;
        totalDeposits -= userInfo.capital ;
        (bool success, ) = payable(msg.sender).call{value: amountToWithdraw}("");
        require(success, "withdraw failed!");
    }

    function depositRewards() external payable{

        require(msg.sender == team, "Only team can deposit rewards");
        for (uint i = 0; i < users.length; i++) {
            UserInfo storage userInfo = deposits[users[i]];
            if (!userInfo.active) continue;
            userInfo.rewards = userInfo.capital * msg.value / totalDeposits;

        }
    }

}
