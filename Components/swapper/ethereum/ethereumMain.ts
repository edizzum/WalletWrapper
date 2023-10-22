import * as dotenv from "dotenv";
import { BigNumberish, Bytes, ethers, utils } from "ethers";
import { Presets, Client } from "userop";
import toast, { Toaster } from "react-hot-toast";
dotenv.config();
const signingKey = process.env.NEXT_SIGNING_KEY || "8a079cdfa31c5723ca7a0e42c7529c70d56e94f5f950dcbf2a0d97918360e939";
const rpcUrl = process.env.NEXT_GOERLI_RPC_URL || "https://api.stackup.sh/v1/node/4e11c1c68477506d75fa92a83ce87f815f9afdfdfb8debb9207dece6f26a1332";
const paymasterUrl = process.env.NEXT_GOERLI_PAYMASTER_URL || "https://api.stackup.sh/v1/paymaster/4e11c1c68477506d75fa92a83ce87f815f9afdfdfb8debb9207dece6f26a1332";
const uniswapUniversalRouter = process.env.NEXT_UNISWAP_UNIVERSAL_ROUTER || "0x3fC91A3afd70395Cd496C647d5a6CC9D4B2b7FAD";

export async function execute(
  value: string,
  commands: string,
  inputs: Bytes[],
  deadline: string
): Promise<any[]> {
  const UNISWAP_ABI = require("./uniabi.json");
  const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
  const uniRouter = new ethers.Contract(
    uniswapUniversalRouter,
    UNISWAP_ABI,
    provider
  );

  const _execute = {
    to: uniswapUniversalRouter,
    value: ethers.utils.parseUnits(value, "ether"),
    data: uniRouter.interface.encodeFunctionData(
      "execute(bytes,bytes[],uint256)",
      [commands, inputs, deadline]
    ),
  };
  return [_execute];
}

export async function getAddress() {
  const signer = new ethers.Wallet(signingKey);
  const paymasterMiddleware = Presets.Middleware.verifyingPaymaster(
    paymasterUrl,
    {
      type: "payg",
    }
  );
  const builder = await Presets.Builder.Kernel.init(signer, rpcUrl, {
    paymasterMiddleware: paymasterMiddleware, salt: 0x23
  });
  const address = builder.getSender();
  console.log("Account address: " + address);
  return address;
}
export async function swap() {
  // create a userOp builder
  try {
    const signer: any = new ethers.Wallet(signingKey);
    const paymasterMiddleware = Presets.Middleware.verifyingPaymaster(
      paymasterUrl,
      {
        type: "payg",
      }
    );
    const salt = 0x23;
    const builder = await Presets.Builder.Kernel.init(signer, rpcUrl, {
      paymasterMiddleware: paymasterMiddleware, salt
    }, );
    const address = builder.getSender();
    console.log("Account address: " + address);

    //create the calls
    const value = "0.01";
    const commands = "0x0b00";
    const deadline = "1716654725";
    const inputs = [
      "0x0000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000002386f26fc10000",
      "0x0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000002386f26fc1000000000000000000000000000000000000000000000000000001d25c41266b9eb400000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002bb4fbf271143f4fbf7b91a5ded31805e42b2208d60001f41f9840a85d5af5bf1d1762f925bdaddc4201f984000000000000000000000000000000000000000000",
    ];
    const inputsAsBytes = inputs.map((input) => ethers.utils.arrayify(input));

    const calls = await execute(value, commands, inputsAsBytes, deadline);
    builder.executeBatch(calls);
    console.log(builder.getOp());

    //Send the userOperation
    const client = await Client.init(rpcUrl);
    const res = await client.sendUserOperation(builder, {
      onBuild: (op) => console.log("Signed UserOperation: ", op),
    });
    console.log("UserOpHash: " + res.userOpHash);
    const ev = await res.wait();
    console.log("Transaction Hash: " + ev?.transactionHash ?? null);
    return ev?.transactionHash ?? null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default swap;
