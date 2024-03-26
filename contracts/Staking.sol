//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Ownable is Context {
    address private _owner;

    event OwnershipTransferred(
        address indexed previousOwner,
        address indexed newOwner
    );

    constructor() {
        address msgSender = _msgSender();
        _owner = msgSender;
        emit OwnershipTransferred(address(0), msgSender);
    }

    function owner() public view returns (address) {
        return _owner;
    }

    modifier onlyOwner() {
        require(_owner == _msgSender(), "Ownable: caller is not the owner");
        _;
    }

    function renounceOwnership() public onlyOwner {
        emit OwnershipTransferred(_owner, address(0));
        _owner = address(0);
    }

    function transferOwnership(address newOwner) public onlyOwner {
        _transferOwnership(newOwner);
    }

    function _transferOwnership(address newOwner) internal {
        require(
            newOwner != address(0),
            "Ownable: new owner is the zero address"
        );
        emit OwnershipTransferred(_owner, newOwner);
        _owner = newOwner;
    }
}

contract Staking is Context, Ownable {
    struct Position {
        uint positionId;
        address payable walletAddress;
        uint createdDate;
        uint unlockDate;
        uint percentInterest;
        uint japerStaked;
        uint japerInterest;
        bool open;
    }

    Position position;
    address private constant NYNYC_TOKEN =
        0xb953bea4143A9cf15498a2D0b08674d4824E4ce8;
    IERC20 private NYNYC_token = IERC20(NYNYC_TOKEN);

    uint public currentPositionId;
    uint public totalStaked;
    mapping(uint => Position) public positions;
    mapping(address => uint[]) public positionIdsByAddress;
    mapping(uint => uint) public tiers;
    uint[] public lockPeriods;
    uint8 public stakingState = 0;

    constructor() {
        currentPositionId = 0;
        totalStaked = 0;

        tiers[30] = 1000;
        tiers[90] = 3600;
        tiers[180] = 9000;
        tiers[360] = 20000;

        lockPeriods.push(30);
        lockPeriods.push(90);
        lockPeriods.push(180);
        lockPeriods.push(360);
    }

    modifier canStake() {
        if (stakingState == 0)
            require(owner() == _msgSender(), "Staking are not enabled");
        require(
            owner() == _msgSender() || NYNYC_token.balanceOf(_msgSender()) != 0,
            "should be a NYNYC holder"
        );

        _;
    }
    function stakeNYNYC(uint numDays, uint stakeAmount) external canStake {
        require(tiers[numDays] > 0, "Mapping not found");

        NYNYC_token.transferFrom(msg.sender, address(this), stakeAmount);

        positions[currentPositionId] = Position(
            currentPositionId,
            payable(msg.sender),
            block.timestamp,
            block.timestamp + (numDays * 1 seconds),
            tiers[numDays],
            stakeAmount,
            calculateInterest(tiers[numDays], stakeAmount),
            true
        );

        positionIdsByAddress[msg.sender].push(currentPositionId);
        currentPositionId += 1;
        totalStaked += stakeAmount;
    }

    function setStakingState(uint8 _stakingState) external onlyOwner {
        require(_stakingState < 3, 'trading state should be 0:only owner, 2:public');
        stakingState = _stakingState;
    }

    function calculateInterest(
        uint basisPoints,
        uint japerAmount
    ) private pure returns (uint) {
        return (basisPoints * japerAmount) / 10000; //700 / 10000 => 0.07
    }

    function modifyLockPeriods(
        uint numDays,
        uint basisPoints
    ) external onlyOwner {
        tiers[numDays] = basisPoints;
        lockPeriods.push(numDays);
    }

    function getPositionById(
        uint positionId
    ) external view returns (Position memory) {
        return positions[positionId];
    }

    function getPositionIdsForAddress(
        address walletAddress
    ) external view returns (uint[] memory) {
        return positionIdsByAddress[walletAddress];
    }

    function claimNYNYC(uint positionId) external {
        require(
            positions[positionId].walletAddress == msg.sender,
            "Only position creator may modify position"
        );
        require(positions[positionId].open == true, "This position is closed!");

        if (block.timestamp > positions[positionId].unlockDate) {
            uint amount = positions[positionId].japerStaked +
                positions[positionId].japerInterest;
            NYNYC_token.transfer(msg.sender, amount);
        } else {
            NYNYC_token.transfer(msg.sender, positions[positionId].japerStaked);
        }
        positions[positionId].open == false;
        totalStaked -= positions[positionId].japerStaked;
    }
}
