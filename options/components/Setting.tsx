import { ChangeEvent, useContext } from "react"

import { CHAIN_CONFIG, CHAIN_CONFIG_TYPE } from "../config/chainConfig"
import {
  WEB3AUTH_NETWORK,
  WEB3AUTH_NETWORK_TYPE
} from "../config/web3AuthNetwork"
import { Web3AuthContext } from "../services/web3auth"
import styles from "../styles/Home.module.css"

interface IProps {
  setNetwork: (network: WEB3AUTH_NETWORK_TYPE) => void
  setChain: (chain: CHAIN_CONFIG_TYPE) => void
  chain: CHAIN_CONFIG_TYPE
  network: WEB3AUTH_NETWORK_TYPE
}

const Setting = ({ setNetwork, setChain, chain, network }: IProps) => {
  const networkChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log("Settings", e.target.value)
    setNetwork(e.target.value as WEB3AUTH_NETWORK_TYPE)
  }

  const chainChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log("Settings", e.target.value)
    setChain(e.target.value as CHAIN_CONFIG_TYPE)
  }
  const { provider } = useContext(Web3AuthContext)
  const isLoggedIn = provider !== null

  return (
    <div className={styles.setting}>
      <div className={styles.row}>
        <label htmlFor="network" className={styles.label}>
          Web3Auth Network
        </label>
        <select
          id="network"
          value={network}
          onChange={networkChangeHandler}
          className={styles.select}
          disabled={isLoggedIn}>
          {Object.keys(WEB3AUTH_NETWORK).map((x: string) => {
            return (
              <option key={x} value={x}>
                {WEB3AUTH_NETWORK[x as WEB3AUTH_NETWORK_TYPE].displayName}
              </option>
            )
          })}
        </select>
      </div>
      <div className={styles.row}>
        <label htmlFor="network" className={styles.label}>
          Blockchain
        </label>
        <select
          value={chain}
          onChange={chainChangeHandler}
          className={styles.select}
          disabled={isLoggedIn}>
          {Object.entries(CHAIN_CONFIG).map(([chain, config]) => {
            return (
              <option key={chain} value={chain}>
                {config.displayName}
              </option>
            )
          })}
        </select>
      </div>
    </div>
  )
}

export default Setting
