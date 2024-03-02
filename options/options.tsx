import "./App.css"

import { useState } from "react"

import Main from "./components/Main"
import Setting from "./components/Setting"
import type { CHAIN_CONFIG_TYPE } from "./config/chainConfig"
import type { WEB3AUTH_NETWORK_TYPE } from "./config/web3AuthNetwork"
import { Web3AuthProvider } from "./services/web3auth"
import styles from "./styles/Home.module.css"

const STORAGE_KEY = {
  WEB3AUTH_NETWORK: "web3auth_network",
  BLOCKCHAIN: "blockchain"
}

function Options() {
  const savedNetwork = window.localStorage.getItem(
    STORAGE_KEY.WEB3AUTH_NETWORK
  ) as WEB3AUTH_NETWORK_TYPE
  const savedChain = window.localStorage.getItem(
    STORAGE_KEY.BLOCKCHAIN
  ) as CHAIN_CONFIG_TYPE
  const [web3AuthNetwork, setWeb3AuthNetwork] = useState<WEB3AUTH_NETWORK_TYPE>(
    savedNetwork || "sapphire_mainnet"
  )
  const [chain, setChain] = useState<CHAIN_CONFIG_TYPE>(
    savedChain || "polygon-mumbai"
  )

  const networkChangeHandler = (network: WEB3AUTH_NETWORK_TYPE) => {
    window.localStorage.setItem(STORAGE_KEY.BLOCKCHAIN, network)
    setWeb3AuthNetwork(network)
  }

  const chainChangeHandler = (chain: CHAIN_CONFIG_TYPE) => {
    window.localStorage.setItem(STORAGE_KEY.BLOCKCHAIN, chain)
    setChain(chain)
  }

  return (
    <div className={styles.container}>
      <Web3AuthProvider chain={chain} web3AuthNetwork={web3AuthNetwork}>
        <h1 className={styles.title}>
          <a target="_blank" href="http://web3auth.io/" rel="noreferrer">
            999
          </a>
          Kingdom
        </h1>
        <Setting
          setNetwork={networkChangeHandler}
          setChain={chainChangeHandler}
          chain={chain}
          network={web3AuthNetwork}
        />
        <Main />
      </Web3AuthProvider>
      <footer className={styles.footer}>
        <a
          href="https://github.com/Web3Auth/Web3Auth/tree/master/demo/react-app"
          target="_blank"
          rel="noopener noreferrer">
          Source code {"  "}
          <img
            className={styles.logo}
            src="https://create-react-app.dev/img/logo.svg"
            alt="github-logo"
          />
        </a>
      </footer>
    </div>
  )
}

export default Options
