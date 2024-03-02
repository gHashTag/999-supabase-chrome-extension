import { Button, IconKey, IconMail, Input, Typography } from "@supabase/ui"
import { WALLET_ADAPTERS } from "@web3auth/base"

import { useWeb3Auth } from "../services/web3auth"
import styles from "../styles/Home.module.css"

const Main = () => {
  const {
    provider,
    login,
    logout,
    getUserInfo,
    getAccounts,
    getBalance,
    signMessage,
    signTransaction,
    signAndSendTransaction,
    web3Auth,
    chain,
    addChain,
    switchChain,
    getTokenBalance,
    signAndSendTokenTransaction,
    randomContractInteraction,
    showWalletConnectScanner,
    enableMFA
  } = useWeb3Auth()

  const loggedInView = (
    <>
      <Button
        block
        placeholder="Get User Info"
        onClick={getUserInfo}
        size="large"
        style={{ marginBottom: "10px" }}
        type="primary">
        Get User Info
      </Button>

      <Button
        block
        placeholder="Get Accounts"
        onClick={getAccounts}
        size="large"
        style={{ marginBottom: "10px" }}
        type="primary">
        Get Accounts
      </Button>

      <Button
        block
        placeholder="Get Balance"
        onClick={getBalance}
        size="large"
        style={{ marginBottom: "10px" }}
        type="primary">
        Get Balance
      </Button>

      <Button
        block
        placeholder="Get Token Balance"
        onClick={getTokenBalance}
        size="large"
        style={{ marginBottom: "10px" }}
        type="primary">
        Get Token Balance
      </Button>

      <Button
        block
        placeholder="Sign Message"
        onClick={signMessage}
        size="large"
        style={{ marginBottom: "10px" }}
        type="primary">
        Sign Message
      </Button>

      <Button
        block
        placeholder="Add Chain"
        onClick={addChain}
        size="large"
        style={{ marginBottom: "10px" }}
        type="primary">
        Add Chain
      </Button>

      <Button
        block
        placeholder="Switch Chain"
        onClick={switchChain}
        size="large"
        style={{ marginBottom: "10px" }}
        type="primary">
        Switch Chain
      </Button>

      <Button
        block
        placeholder="Enable MFA"
        onClick={enableMFA}
        size="large"
        style={{ marginBottom: "10px" }}
        type="primary">
        Enable MFA
      </Button>

      {(web3Auth?.connectedAdapterName === WALLET_ADAPTERS.OPENLOGIN ||
        chain === "solana") && (
        <Button
          block
          placeholder="Sign Transaction"
          onClick={signTransaction}
          size="large"
          style={{ marginBottom: "10px" }}
          type="primary">
          Sign Transaction
        </Button>
      )}
      <Button
        block
        placeholder="Sign and Send Transaction"
        onClick={signAndSendTransaction}
        size="large"
        style={{ marginBottom: "10px" }}
        type="primary">
        Sign and Send Transaction
      </Button>

      <Button
        block
        placeholder="Sign and Send Token Transaction"
        onClick={signAndSendTokenTransaction}
        size="large"
        style={{ marginBottom: "10px" }}
        type="primary">
        Sign and Send Token Transaction
      </Button>

      <Button
        block
        placeholder="Contract Interaction"
        onClick={randomContractInteraction}
        size="large"
        style={{ marginBottom: "10px" }}
        type="primary">
        Contract Interaction
      </Button>

      <Button
        block
        placeholder="Show WalletConnect Scanner"
        onClick={showWalletConnectScanner}
        size="large"
        style={{ marginBottom: "10px" }}
        type="primary">
        Show WalletConnect Scanner
      </Button>

      <Button
        block
        placeholder="Log Out"
        onClick={logout}
        size="large"
        style={{ marginBottom: "10px" }}
        type="outline">
        Log Out
      </Button>

      <div className={styles.console} id="console">
        <p className={styles.code}></p>
      </div>
    </>
  )

  const unloggedInView = (
    <Button
      block
      placeholder="Login"
      onClick={login}
      size="large"
      style={{ marginBottom: "10px" }}
      type="primary">
      Login
    </Button>
  )

  return (
    <div className={styles.grid}>
      {provider ? loggedInView : unloggedInView}
    </div>
  )
}

export default Main
