// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EthTransfer {
  function transfer(address payable recipient) external payable {
    recipient.transfer(msg.value);
  }
}
