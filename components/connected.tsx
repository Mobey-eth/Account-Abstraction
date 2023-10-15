import {
    SmartContract,
    ThirdwebNftMedia,
    ThirdwebSDKProvider,
    useAddress,
    useClaimNFT,
    useContract,
    useOwnedNFTs,
    useTotalCirculatingSupply,
    useTransferNFT,
  } from "@thirdweb-dev/react";
  import { Signer } from "ethers";
  import { nftCollection, THIRDWEB_API_KEY, chain } from "../lib/constants";
  import styles from "../styles/Home.module.css";
  import { shortenIfAddress } from "../lib/addresses";
  import { useState } from "react";
//   import { Blocks } from "react-loader-spinner"
  
  export const Connected = ({
    username,
    signer,
  }: {
    username: string;
    signer: Signer;
  }) => {
    return (
      <ThirdwebSDKProvider
        signer={signer}
        activeChain={chain}
        clientId={THIRDWEB_API_KEY || ""}
      >
        <ConnectedInner username={username} />
      </ThirdwebSDKProvider>
    );
  };
  
  const ConnectedInner = ({ username }: { username: string }) => {
    const address = useAddress();
    const { contract } = useContract(nftCollection);
    const { mutate: claim, isLoading: claimLoading } = useClaimNFT(contract);
    const { mutate: transfer, isLoading: transferLoading } =
      useTransferNFT(contract);
    const {
      data: ownedNFTs,
      isLoading: nftsLoading,
      refetch,
    } = useOwnedNFTs(contract, address);
    const [transferTo, setTransferTo] = useState("");
    return (
      <>
        <h1 className={styles.title} style={{ marginTop: "2rem" ,  textAlign: "center"}}>
          Welcome <br />
          <span className={styles.gradientText1}>{username}</span>
        </h1>
        <hr className={styles.divider} />
        <p className={styles.label} style={{ marginBottom: "1.4rem", textAlign: "center"}}>
          Smart Wallet Address:{" "}
          <a
            href={`https://thirdweb.com/${chain.slug}/${address}`}
            target="_blank"
          >
            {shortenIfAddress(address)}
          </a>
        </p>
        <div className={styles.filler}>
          {nftsLoading || claimLoading || transferLoading ? (
            <>
              <p>
                {nftsLoading
                  ? "Loading your account..."
                  : claimLoading
                  ? "Claiming..."
                  : "Transfering..."}
              </p>
            </>
          ) : ownedNFTs && ownedNFTs.length > 0 ? (
            <>
              <a href={`https://testnets.opensea.io/assets/mumbai/${nftCollection.toLowerCase()}/${
                    ownedNFTs[0].metadata.id
                  }`} target="_blank"><ThirdwebNftMedia metadata={ownedNFTs[0].metadata} /></a>
              
              <p style={{ marginTop: "1rem"}}>You own {ownedNFTs[0].quantityOwned}</p>
              <p className={styles.description} style={{ fontWeight: "bold" }}>
                A Mobi Whale!
              </p>
              <p style={{ color: "#999" }}>
                view on{" "}
                <a
                  href={`https://testnets.opensea.io/assets/mumbai/${nftCollection.toLowerCase()}/${
                    ownedNFTs[0].metadata.id
                  }`}
                  target="_blank"
                >
                  OpenSea
                </a>
              </p>
  
              <hr className={styles.divider} />
              <div className={styles.row_center} style={{ width: "100%" }}>
                <input
                  type="text"
                  placeholder="Wallet address / ENS"
                  className={styles.input}
                  style={{ borderRadius: "5px 0 0 5px" }}
                  value={transferTo}
                  onChange={(e) => setTransferTo(e.target.value)}
                />
                <button
                  className={styles.button}
                  style={{
                    marginTop: 0,
                    width: "130px",
                    borderRadius: "0 5px 5px 0",
                  }}
                  onClick={() =>
                    transfer(
                      {
                        to: transferTo,
                        tokenId: ownedNFTs[0].metadata.id,
                        amount: 1,
                      },
                      {
                        onSuccess: async () => {
                          alert("Transfer successful");
                          // wait for 1 sec before refetching
                          await new Promise((resolve) =>
                            setTimeout(resolve, 1000)
                          );
                          await refetch();
                        },
                        onError: (err) => alert((err as any).reason || err),
                      }
                    )

                  }
                >
                  Transfer
                </button>
              </div>
            </>
          ) : (
            <>
              <p className={styles.description}>Claim your Mobi: Whale Collection NFT!</p>
              <button
                className={styles.button}
                onClick={() =>
                  claim(
                    {
                      quantity: 1,
                      tokenId: 0,
                    },
                    {
                      onSuccess: async () => {
                        alert("Claim successful");
                        // wait for 1 sec before refetching
                        await new Promise((resolve) => setTimeout(resolve, 1000));
                        await refetch();
                      },
                      onError: (err) => {
                        let reason = (err as any).reason || err;
                        if (reason == "!Qty") {
                          reason = "Already claimed max number of Whales!";
                        }
                        alert(reason);
                      },
                    }
                  )
                }
              >
                Claim
              </button>
            </>
          )}
        </div>
        <TotalClaimed contract={contract} />
      </>
    );
  };
  
  const TotalClaimed = ({
    contract,
  }: {
    contract: SmartContract | undefined;
  }) => {
    const { data: totalClaimed } = useTotalCirculatingSupply(contract, 0);
    return (
      <div className={styles.column_center} style={{ marginBottom: "2rem" }}>
        <p style={{ color: "#999" }}>
          <b>{totalClaimed?.toString() || "-"}</b> Whales have been claimed
        </p>
        <p className={styles.label} style={{ color: "#999", marginTop: "5px" }}>
          Contract:{" "}
          <a
            href={`https://thirdweb.com/${chain.slug}/${nftCollection}`}
            target="_blank"
          >
            {shortenIfAddress(nftCollection)}
          </a>
        </p>
      </div>
    );
  };






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