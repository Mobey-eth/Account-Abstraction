import React, { useState } from "react";
import styles from "../styles/Home.module.css"
import loadingLottie from "../assets/lottie/animation_lnlsf6wq.json"
import loadinLottie2 from "../assets/lottie/animation_lnlsglcz_2.json"
import LottieLoader from "react-lottie-loader";
import { connectToSmartWallet } from "../lib/wallet";
import { Connected } from "./connected";
// import { ConnectWallet } from "@thirdweb-dev/react";

type LoginProps = {
    isOpen: boolean, 
    onClose: () => void;
}


export const Login: React.FC<LoginProps> = ({ isOpen, onClose}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [signer, setSigner] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [loadingStatus, setLoadingStatus] = useState("");
    const [error, setError] = useState("");

    if(!isOpen) return null;

    const handleOutsideClick = (e:React.MouseEvent<HTMLDivElement>) => {
        if (e.currentTarget === e.target) {
            onClose();
        }
    }

    const handleRetryLogin = async () => {
        let retryCount = 0; // Initialize retry count
    
        const retryLogin = async () => {
          if (retryCount <= 5) {
            try {
              // Clear previous error and status
              setError("");
              setLoadingStatus("");
    
              setIsLoading(true);
    
              const wallet = await connectToSmartWallet(username, password, (status) =>
                setLoadingStatus(status)
              );
    
              const s = await wallet.getSigner();
              setSigner(s);
              setIsLoading(false);
            } catch (e) {
              setIsLoading(false);
              console.error(e);
              setError((e as any).message);
    
              // Retry after 5 seconds
              setTimeout(() => {
                retryLogin();
              }, 5000);
    
              retryCount++; // Increment retry count
            }
          } else {
            // Maximum retries reached, handle accordingly
            setIsLoading(false);
            setError("Maximum retries reached");
          }
        };
    
        retryLogin(); // Start the initial login attempt
      };
    
      const connectWallet = async () => {
        if (!username || !password) return;
    
        handleRetryLogin(); // Start the login attempt
      };

    return username && signer ? (
        <>
            <Connected signer={signer} username={username} />
        </>
    ) : isLoading ? (
        
            <div className={styles.card}>
                <div className="lottieTwo"
                >
                    <LottieLoader animationData={loadingLottie}/>
                </div>
                <p>{loadingStatus}</p>
            </div>
        
    ) : error ? (
        <div>
            <div className={styles.card}>
                <div className="lottieTwo">
                    <LottieLoader animationData={loadinLottie2}/>
                    <p>Please Wait...</p>
                </div>

            </div>
            
            {/* <button onClick={() => setError("")}>
                Try Again
            </button> */}
        </div>
        
    ) : (
        <div className={`${styles.container} ${isOpen ? styles.open : ""}`}
                onClick={handleOutsideClick}
        >
            <div
                className={`${styles.card} ${isOpen ? styles.open : ""}`}
            >
                <button
                    onClick={onClose}
                    className={styles.closeButton}
                >x</button>
                <h1>Smart Wallet</h1>
                <div >
                    <input className={styles.loginInput}
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} 
                    />
                    <input className={styles.loginInput}
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                    <button 
                    className={styles.button}
                    onClick={() => connectWallet()}>
                        Login
                    </button>
                </div>
            </div>
        </div>
    )
};