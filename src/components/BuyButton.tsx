import { useAccount, useContractWrite } from "wagmi"
import myABI from "../ABIs/MY-ABI.json"
import LoadingButton from "@mui/lab/LoadingButton"
import { Link, Stack, Typography } from "@mui/material"

const BuyButton = ({ checkNetwork }: { checkNetwork: () => Promise<void> }) => {
  const { isLoading, isError, error, isSuccess, data, write } = useContractWrite({
    address: "0xfF88Ff7650ce8D6dd9F50B3171fb0a3E06b9cF16", //my smart contract
    abi: myABI,
    functionName: "buy",
  })

  const handleBuy = async () => {
    try {
      await checkNetwork()
      write()
      console.log("Tokens bought successfully!")
    } catch (error) {
      console.error("Error buying tokens:", error)
    }
  }

  return (
    <Stack width={400} textAlign={"center"} sx={{ wordBreak: "break-word" }}>
      <LoadingButton
        variant="contained"
        loading={isLoading}
        color={isSuccess ? "success" : isError ? "error" : "primary"}
        onClick={handleBuy}
      >
        Buy
      </LoadingButton>
      {isError && (
        <Typography variant="caption" color={"white"}>
          {(error?.cause as any).toString()}
        </Typography>
      )}
      {isSuccess && (
        <Link href={`https://sepolia.etherscan.io/tx/${data?.hash}`} target="_blank" rel="noopener" variant="caption">
          https://sepolia.etherscan.io/tx/{data?.hash}
        </Link>
      )}
    </Stack>
  )
}

export default BuyButton
