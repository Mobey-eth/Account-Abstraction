// import { ThirdwebSDKProvider, useAddress, useContract, useContractMetadata, useOwnedNFTs } from "@thirdweb-dev/react"
// import { Signer } from "ethers"
// import { THIRDWEB_API_KEY, chain, nftCollection } from "../lib/constants"


// export const Connected = ({
//     username, 
//     signer,
// } : {
//     username: string,
//     signer: Signer
// }) => {
//     return(
//         <ThirdwebSDKProvider signer={signer} activeChain={chain} clientId={THIRDWEB_API_KEY || ""} >
//            <ConnectedInner username = {username}/> 
//         </ThirdwebSDKProvider>
//     )
// }

// const ConnectedInner = ({username} : {username: string}) => {
//     const address = useAddress();

//     function truncateAddress(address: string) {
//         return address.slice(0,6) + "..." + address.slice(-4);
//     }

//     const {
//         contract
//     } = useContract(nftCollection);
//     const {
//         data: contractMetadata,
//         isLoading: contractMetadataLoading,
//     } = useContractMetadata(contract);

//     const {
//         data: ownedNFTs,
//         isLoading: ownedNFTsLoading,
//     } = useOwnedNFTs(contract, address);

//     return (
        
//     )
// }