import { ethers } from "ethers";

import abi from "../utils/Keyboards.json"

const contractAddress = '0x7b57c6A1708ffE2604DC65f46f5c05412e0b4818';
const contractABI = abi.abi;

export default function getKeyboardsContract(ethereum) {
  if(ethereum) {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    return new ethers.Contract(contractAddress, contractABI, signer);
  } else {
    return undefined;
  }
}
