import React from 'react';
import './App.css';
import { ethers } from "ethers";
import Lock from "./artifacts/contracts/Lock.sol/Lock.json";

function App() {
  const connect = async () => {
    // v6版本使用BrowserProvider替代Web3Provider
    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const addr = await signer.getAddress();
  }

  const readMessage = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const lock = new ethers.Contract(
        "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
        Lock.abi,
        provider
    );
    const message = await lock.message();
    alert(message);
  }

  const setMessage = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner(); // v6需要await

    const lock = new ethers.Contract(
        "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
        Lock.abi,
        signer
    );

    // v6中不再需要connect(signer)，因为已经用signer初始化了合约
    const transaction = await lock.setMessage("world hello!");
    const tx = await transaction.wait(1);

    // v6中事件处理有所不同
    const event = tx.logs[0]; // 使用logs而不是events
    // 具体如何访问事件参数可能需要根据合约设计调整
    const value = event.args ? event.args[0] : null;

    if (value) {
      const message = value.toString();
      alert(message);
    }
  }

  return (
      <div className="App">
        <button onClick={connect}>connect wallet</button>
        <button onClick={readMessage}>readMessage</button>
        <button onClick={setMessage}>setMessage</button>
      </div>
  );
}

export default App;
