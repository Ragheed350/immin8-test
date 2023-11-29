import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react"

import { WagmiConfig } from "wagmi"
import { arbitrum, mainnet } from "viem/chains"
import Home from "./pages/home"

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = "7d72846076e8ab9ddf698611d1b9fec7"

// 2. Create wagmiConfig
const metadata = {
  name: "Web3Modal",
  description: "Web3Modal Example",
  url: "https://web3modal.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
}

const chains = [mainnet, arbitrum]
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata })

// 3. Create modal
createWeb3Modal({ wagmiConfig, projectId, chains })

export default function App() {
  return (
    <WagmiConfig config={wagmiConfig}>
      <Home />
    </WagmiConfig>
  )
}
