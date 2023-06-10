import React, { useState } from 'react';
import { ethers } from 'ethers';
import './App.css';

const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'; 
const abi = [
  {
    "inputs": [
      {
        "internalType": "address payable",
        "name": "recipient",
        "type": "address"
      }
    ],
    "name": "transfer",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  }
]
function App() {
  const [amount, setAmount] = useState("0");
  const [recipient, setRecipient] = useState('');

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleRecipientChange = (e) => {
    setRecipient(e.target.value);
  };

  const handleTransfer = async () => {
    if (typeof window.ethereum !== 'undefined') {
      await window.ethereum.enable();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);
      await contract.transfer(recipient, { value: ethers.utils.parseEther(amount) });
      alert('Transfer successful!');
    } else {
      alert('Please install MetaMask to use this DApp.');
    }
  };

  return (
    <div className="App">
      <h1>Ethereum Transfer DApp</h1>
      <input type="number" value={amount} onChange={handleAmountChange} placeholder="Amount" />
      <input type="text" value={recipient} onChange={handleRecipientChange} placeholder="Recipient Address" />
      <button onClick={handleTransfer}>Transfer</button>
    </div>
  );
}

export default App;
