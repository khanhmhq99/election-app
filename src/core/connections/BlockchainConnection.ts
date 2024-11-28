import { ethers } from "ethers";
import { electionAbi, electionAddress } from "../contracts/election";

export async function connectToBlockchain() {
    if (!(window as any).ethereum) {
        throw new Error("MetaMask is not installed!");
    }

    // Kết nối đến ví MetaMask
    const signer = await new ethers.BrowserProvider((window as any).ethereum).getSigner();
    const contract = new ethers.Contract(electionAddress, electionAbi, signer);

    return { signer, contract };
}
