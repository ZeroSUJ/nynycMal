// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import '@openzeppelin/contracts/utils/Context.sol';


contract Ownable is Context {
  address private _owner;

  event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

  constructor() {
    address msgSender = _msgSender();
    _owner = msgSender;
    emit OwnershipTransferred(address(0), msgSender);
  }

  function owner() public view returns (address) {
    return _owner;
  }

  modifier onlyOwner() {
    require(_owner == _msgSender(), 'Ownable: caller is not the owner');
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
    require(newOwner != address(0), 'Ownable: new owner is the zero address');
    emit OwnershipTransferred(_owner, newOwner);
    _owner = newOwner;
  }
}

interface IERC20 {
  function balanceOf(address account) external view returns (uint256);

  // function isPresaleClaimed(address account) external view returns (bool);
}

contract Mining is Context, Ownable {

  uint256 private BONES_TO_HATCH_1MINERS = 1080000; //for final version should be seconds in a day
  uint256 private PSN = 10000;
  uint256 private PSNH = 5000;
  uint256 private devFeeVal = 2;
  bool private initialized = false;
  address payable private recAdd = payable(0x00913C6C8ae1458b3DD6Bb1010106Fc74a0a9C7C);
  event Log(string func, uint gas);
  mapping(address => uint256) private hatcheryMiners;
  mapping(address => uint256) private claimedBones;
  mapping(address => uint256) private lastHatch;
  mapping(address => address) private referrals;
  uint256 private marketBones;
  uint8 public tradingState = 0;
  IERC20 token;

  constructor(address _owner, address _token) {
    setToken(_token);
    transferOwnership(_owner);
  }

  modifier canTrade() {
    // if (tradingState == 1)
    //   require(token.isPresaleClaimed(_msgSender()) || owner() == _msgSender(), 'only presale users');

    if (tradingState == 0) require(owner() == _msgSender(), 'trades are not enabled');

    require(owner() == _msgSender() || token.balanceOf(_msgSender()) > 50000, 'should be more than 50000 NYNYC');

    _;
  }

  function setTradingState(uint8 _tradingState) public onlyOwner {
    require(_tradingState < 3, 'trading state should be 0:only owner, 1:whitelisted, 2:public');
    tradingState = _tradingState;
  }

  function setToken(address _token) public onlyOwner {
    require(_token != address(0), 'invalid token address');
    token = IERC20(_token);
  }

  function hatchBones() public canTrade {
    require(initialized, 'not initilized');

    uint256 bonesUsed = getMyBones(msg.sender);
    uint256 newMiners = bonesUsed / BONES_TO_HATCH_1MINERS;
    hatcheryMiners[msg.sender] = hatcheryMiners[msg.sender] + newMiners;
    claimedBones[msg.sender] = 0;
    lastHatch[msg.sender] = block.timestamp;

    //boost market to nerf miners hoarding
    marketBones = marketBones + (bonesUsed/5);
  }

  function sellBones() public canTrade {
    require(initialized, 'not initilized');
    uint256 hasBones = getMyBones(msg.sender);
    uint256 boneValue = calculateBoneSell(hasBones);
    uint256 fee = devFee(boneValue);
    claimedBones[msg.sender] = 0;
    lastHatch[msg.sender] = block.timestamp;
    marketBones = marketBones + hasBones;
    recAdd.transfer(fee);
    payable(msg.sender).transfer(boneValue - fee);
  }

  function beanRewards(address adr) public view returns (uint256) {
    uint256 hasBones = getMyBones(adr);
    uint256 boneValue = calculateBoneSell(hasBones);
    return boneValue;
  }

  function buyBones() public payable canTrade {
    require(initialized, 'not initilized');
    uint256 bonesBought = calculateBoneBuy(msg.value, (address(this).balance - msg.value));
    bonesBought = bonesBought - devFee(bonesBought);
    uint256 fee = devFee(msg.value);
    recAdd.transfer(fee);
    claimedBones[msg.sender] = claimedBones[msg.sender] + bonesBought;
    hatchBones();
  }

  function calculateTrade(
    uint256 rt,
    uint256 rs,
    uint256 bs
  ) private view returns (uint256) {
    return
        PSN * bs/(PSNH + (PSN * rs + PSNH * rt)/rt);
  }

  function calculateBoneSell(uint256 bones) public view returns (uint256) {
    return calculateTrade(bones, marketBones, address(this).balance);
  }

  function calculateBoneBuy(uint256 eth, uint256 contractBalance) public view returns (uint256) {
    return calculateTrade(eth, contractBalance, marketBones);
  }

  function calculateBoneBuySimple(uint256 eth) public view returns (uint256) {
    return calculateBoneBuy(eth, address(this).balance);
  }

  function devFee(uint256 amount) private view returns (uint256) {
    return amount * devFeeVal/100;
  }

  function seedMarket() public payable onlyOwner {
    require(marketBones == 0);
    initialized = true;
    marketBones = 108000000000;
  }

  function getBalance() public view returns (uint256) {
    return address(this).balance;
  }

  function getMyMiners(address adr) public view returns (uint256) {
    return hatcheryMiners[adr];
  }

  function getMyBones(address adr) public view returns (uint256) {
    return claimedBones[adr] + getBonesSinceLastHatch(adr);
  }

  function getBonesSinceLastHatch(address adr) public view returns (uint256) {
    uint256 secondsPassed = min(BONES_TO_HATCH_1MINERS, (block.timestamp - lastHatch[adr]));
    return secondsPassed * hatcheryMiners[adr];
  }
  function min(uint256 a, uint256 b) private pure returns (uint256) {
    return a < b ? a : b;
  }

  receive() external payable{
    emit Log("receive", gasleft());
  }

  fallback() external payable {
    // send / transfer (forwards 2300 gas to this fallback function)
    // call (forwards all of the gas)
    emit Log("fallback", gasleft());
  }
}