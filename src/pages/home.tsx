import { useAccount, useNetwork, useSwitchNetwork } from "wagmi"
import Grid from "@mui/material/Grid"
import Stack from "@mui/material/Stack"
import ApproveTokens from "../components/ApproveTokens"
import BuyButton from "../components/BuyButton"
import { sepoilaChainId } from "../utils/constants"
import { Typography } from "@mui/material"

function Home() {
  const { isConnected } = useAccount()
  const { switchNetworkAsync, error, isError } = useSwitchNetwork()
  const { chain } = useNetwork()

  const checkNetwork = async () => {
    if (chain?.id !== sepoilaChainId && switchNetworkAsync) {
      try {
        await switchNetworkAsync(sepoilaChainId)
      } catch (err) {
        throw new Error(error?.message)
      }
    }
  }

  return (
    <div className="container">
      <Grid container justifyContent={"center"}>
        <Stack spacing={2}>
          {isError && (
            <Typography variant="caption" color="white">
              {error?.message?.toString()}
            </Typography>
          )}
          <w3m-button />

          {isConnected && <ApproveTokens checkNetwork={checkNetwork} />}
          {isConnected && <BuyButton checkNetwork={checkNetwork} />}
        </Stack>
      </Grid>
    </div>
  )
}

export default Home
