import { ThirdwebSDK, isContractDeployed } from "@thirdweb-dev/sdk";
import { chain, factoryAddress} from "./constants"
import { LocalWallet, SmartWallet } from "@thirdweb-dev/wallets";


const THIRDWEB_API_KEY = "b3cce49e1a0a665d809031e541d27022"
export function createSmartWallet(): SmartWallet {
    const smartWallet = new SmartWallet({
      chain: chain,
      factoryAddress: factoryAddress,
      gasless: true,
      clientId: THIRDWEB_API_KEY || "",
    });
    return smartWallet;
}

export async function getWalletAddressForUser(
    sdk: ThirdwebSDK,
    username: string
  ): Promise<string> {
    const factory = await sdk.getContract(factoryAddress);
    const smartWalletAddress: string = await factory.call("accountOfUsername", [
      username,
    ]);
    return smartWalletAddress;
}

export async function connectToSmartWallet(
    username: string,
    pwd: string,
    statusCallback?: (status: string) => void
  ): Promise<SmartWallet> {
    statusCallback?.("Checking username...");
    const sdk = new ThirdwebSDK(chain, {
      clientId: THIRDWEB_API_KEY || "",
    });
    const smartWalletAddress = await getWalletAddressForUser(sdk, username);
    const isDeployed = await isContractDeployed(
      smartWalletAddress,
      sdk.getProvider()
    );

    const smartWallet = createSmartWallet();
    const personalWallet = new LocalWallet();

    if (isDeployed) {
        statusCallback?.("Username exists, accessing onchain data...");

        const contract = await sdk.getContract(smartWalletAddress);
        const metadata = await contract.metadata.get();
        console.log("Fetching wallet for", metadata.name);
    
        const encryptedWallet = metadata.encryptedWallet;
        console.log(encryptedWallet);
        if (!encryptedWallet) {
            throw new Error("No encrypted wallet found");
          }
        statusCallback?.("Decrypting personal wallet...");
        // wait before importing as it blocks the main thread rendering
        await new Promise((resolve) => setTimeout(resolve, 300));
        await personalWallet.import({
            encryptedJson: encryptedWallet,
            password: pwd,
        });

        statusCallback?.("Connecting...");
        await smartWallet.connect({
            personalWallet,
        });

        return smartWallet;
    } else {
        statusCallback?.("New userName, Generating a personal wallet...");
        await personalWallet.generate();
        // encrypt it
        const encryptedWallet = await personalWallet.export({
            strategy: "encryptedJson",
            password: pwd,
        });

        await smartWallet.connect({
            personalWallet,
        });

        statusCallback?.(`Deploying & registering username onchain...`);

        await smartWallet.deploy();

        const contract = await smartWallet.getAccountContract();

        const encryptedWalletUri = await sdk.storage.upload({
            name: username,
            encryptedWallet,
        });

        await contract.call(
            "register",
            [username, encryptedWalletUri]
        );

        return smartWallet;

    }

}