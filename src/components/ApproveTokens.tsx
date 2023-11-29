import { useAccount, useContractWrite } from "wagmi"
import erc20ABI from "../ABIs/ERC-20-ABI.json"
import LoadingButton from "@mui/lab/LoadingButton"
import { parseEther } from "viem/utils" // Replace with your utility library for token conversion
import { Link, Stack, Typography } from "@mui/material"

const TokenApproval = ({ checkNetwork }: { checkNetwork: () => Promise<void> }) => {
  const { address } = useAccount()

  const { isLoading, isError, error, isSuccess, data, write } = useContractWrite({
    address: "0x3845badAde8e6dFF049820680d1F14bD3903a5d0",
    abi: erc20ABI,
    functionName: "approve",
  })

  const handleApproveTokens = async () => {
    try {
      await checkNetwork()
      const amountInWei = parseEther("0.001")
      const spenderAddress = address

      write({ args: [spenderAddress, amountInWei], to: address })

      console.log("Tokens approved successfully!")
    } catch (error) {
      console.error("Error approving tokens:", error)
    }
  }

  return (
    <Stack width={400} textAlign={"center"} sx={{ wordBreak: "break-word" }}>
      <LoadingButton
        variant="contained"
        loading={isLoading}
        color={isSuccess ? "success" : isError ? "error" : "primary"}
        onClick={handleApproveTokens}
      >
        Approve Tokens
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

export default TokenApproval
