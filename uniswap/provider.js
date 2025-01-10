import { ethers } from "ethers";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

export const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
export const UNISWAP_ROUTER_ADDRESS =
  "0xeE567Fe1712Faf6149d80dA1E6934E354124CfE3";
// export const USDC_ADDRESS = "0x9F73DF0Ef9616Ed85255A0E75eE59BC786c51E6D";
export const USDC_ADDRESS = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48";
export const WETH_ADDRESS = "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14";
