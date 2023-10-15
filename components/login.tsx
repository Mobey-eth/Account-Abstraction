import { useState } from "react";
import styles from "../styles/Home.module.css"
import loadingLottie from "../assets/lottie/animation_lnlsf6wq.json"
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

    const connectWallet = async () => {
        if (!username || !password) return;
    try {
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
    }
    }

    return username && signer ? (
        <>
            <Connected signer={signer} username={username} />
        </>
    ) : isLoading ? (
        
            <div className={styles.card}>
                <div
                    style={{
                        width: "440px"
                    }}
                >
                    <LottieLoader animationData={loadingLottie}/>
                </div>
                <p>{loadingStatus}</p>
            </div>
        
    ) : error ? (
        <div>
            <p>Error</p>
            <button onClick={() => setError("")}>
                Try Again
            </button>
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