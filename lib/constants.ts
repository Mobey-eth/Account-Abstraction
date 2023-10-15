import {Mumbai} from "@thirdweb-dev/chains"
import dotenv from 'dotenv';

dotenv.config()

export const THIRDWEB_API_KEY = process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID

export const chain = Mumbai

export const factoryAddress= "0xA6871E0f5cA989C9150503B9920Cd49910AEa27d"

// deploy new drop
export const nftCollection= "0x15DCfBab872555dB7e80fBf6CA0379214cbf015F"