import { ConnectWallet } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import { NextPage } from "next";
import { useState } from "react";
import { Login } from "../components/login";

const Home: NextPage = () => {
  const [isModalOpen, setIsOpen] = useState(false)
  return (
    <div className={styles.container}>
      {!isModalOpen && (
        <div className={styles.loginCard}>
          <h1>Wallet Abstraction</h1>
          <p>Generate your crypto wallet with only a username and password! 😉</p>
          <button className= {styles.button} 
            onClick={() => setIsOpen(true)}>
            Enter
          </button>
        </div>
      )}

      <Login 
        isOpen={isModalOpen}
        onClose={()=>setIsOpen(false)} 
        
      />
     
      
    </div>
  );
};

export default Home;
