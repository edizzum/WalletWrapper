"use client";
import React, { useState, useEffect } from "react";
import { Wallet } from "@/Components/Wallet";
import Swal from "sweetalert2";
import { Input, Popover, Radio, Modal, message } from "antd";
import {
  ArrowDownOutlined,
  DownOutlined,
  SettingOutlined,
} from "@ant-design/icons";
require("@solana/wallet-adapter-react-ui/styles.css");
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import "./App.css";
import tokenList from "./tokenList.json";
import swap, { getAddress } from "@/Components/swapper/ethereum/ethereumMain";
import { useWalletMultiButton } from "@solana/wallet-adapter-base-ui";
import { WalletName } from "@solana/wallet-adapter-base";
import { connect } from "http2";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export default function Page() {
  const [walletModalConfig, setWalletModalConfig] = useState<Readonly<{
    onSelectWallet(walletName: WalletName): void;
    wallets: any[];
  }> | null>(null);
  /*  const { buttonState, onConnect, onDisconnect, onSelectWallet, publicKey } = useWalletMultiButton({
    onSelectWallet: setWalletModalConfig,
  });
  const connect = onConnect;
  console.log(publicKey); */

  const [dropdown, setDropdown] = useState<string>("Ethereum");
  const [position, setPosition] = useState(0);
  const options: string[] = ["Ethereum", "BSC", "Arbitrum", "Polygon", "Base"];

  const [tokenOneAmount, setTokenOneAmount] = useState("0");
  const [tokenTwoAmount, setTokenTwoAmount] = useState("0");
  const [isOpen, setIsOpen] = useState(false);
  const [changeToken, setChangeToken] = useState(1);
  const [tokenOne, setTokenOne] = useState(tokenList[0]);
  const [tokenTwo, setTokenTwo] = useState(tokenList[1]);
  const [slippage, setSlippage] = useState(2.5);

  function handleSlippageChange(e: any) {
    setSlippage(e.target.value);
  }

  function changeAmount(e: any) {
    setTokenOneAmount(e.target.value);
    if (e.target.value) {
      setTokenTwoAmount((e.target.value / 0.07414).toFixed(4));
    } else {
      setTokenTwoAmount("0");
    }
  }

  function switchTokens() {
    const one = tokenOne;
    const two = tokenTwo;
    setTokenOne(two);
    setTokenTwo(one);
  }

  function openModal(asset: any) {
    setChangeToken(asset);
    setIsOpen(true);
  }

  function modifyToken(i: any) {
    if (changeToken === 1) {
      setTokenOne(tokenList[i]);
    } else {
      setTokenTwo(tokenList[i]);
    }
    setIsOpen(false);
  }

  const settings = (
    <>
      <div>Slippage Tolerance</div>
      <div>
        <Radio.Group value={slippage} onChange={handleSlippageChange}>
          <Radio.Button value={0.5}>0.5%</Radio.Button>
          <Radio.Button value={2.5}>2.5%</Radio.Button>
          <Radio.Button value={5}>5.0%</Radio.Button>
        </Radio.Group>
      </div>
    </>
  );
  const [loading, setLoading] = useState(false);
  async function Swap() {
    setLoading(true);
    const res = await swap();
    console.log(res);
    Swal.fire(
      'Transcation Success',
      res as string,
      'success'
    )
    setLoading(false);
  }

  const wallet = useWallet();

  const { publicKey, sendTransaction } = wallet;
  const isConneted = wallet.connected;
  console.log(isConneted);
  const base58 = publicKey?.toBase58();
  console.log(base58);
  const [address, setAddress] = useState("");
  async function getAddressAccount() {
    /* const wallet = await useWallet();
    const { publicKey, sendTransaction } = wallet;
    const isConneted = wallet.connected;
    console.log(isConneted); */
    const address = await getAddress();
    setAddress(address as string);
  }
  useEffect(() => {
    getAddressAccount();
  }, []);
  return (
    <div className="p-4 sm:p-6 align-center">
      <div className="bg-neutral h-18 max-w-3xl p-2 px-2 rounded-xl mx-auto flex justify-between items-center">
        <div>
          <a
            className="rounded-md bg-gradient-to-r from-purple to-green px-5 py-2.5 text-sm font-medium text-white shadow"
            href="/app"
          >
            Turn Back
          </a>
        </div>
        <div className="flex flex-col text-white items-center">
          <WalletMultiButton />
          {isConneted && (address || "No Address")}
        </div>
      </div>

      <div className="flex items-center justify-center h-screen">
        {/* {address || "No Address"} */}
        <Modal
          open={isOpen}
          footer={null}
          onCancel={() => setIsOpen(false)}
          title="Select a token"
        >
          <div className="modalContent text-white">
            {tokenList?.map((e, i) => {
              return (
                <div
                  className="tokenChoice"
                  key={i}
                  onClick={() => modifyToken(i)}
                >
                  <img src={e.img} alt={e.ticker} className="tokenLogo" />
                  <div className="tokenChoiceNames">
                    <div className="tokenName">{e.name}</div>
                    <div className="tokenTicker">{e.ticker}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </Modal>
        <div className="tradeBox text-white">
          <div className="tradeBoxHeader">
            <h4>Swap</h4>
            <Popover
              content={settings}
              title="Settings"
              trigger="click"
              placement="bottomRight"
            >
              <SettingOutlined className="cog" />
            </Popover>
          </div>
          <div className="inputs">
            <Input
              placeholder="0"
              value={tokenOneAmount}
              onChange={changeAmount}
            />
            <Input
              placeholder={tokenTwoAmount}
              value={tokenTwoAmount}
              disabled={true}
            />
            <div className="switchButton" onClick={switchTokens}>
              <ArrowDownOutlined className="switchArrow" />
            </div>
            <div className="assetOne" onClick={() => openModal(1)}>
              <img
                src={tokenOne.img}
                alt="assetOneLogo"
                className="assetLogo"
              />
              {tokenOne.ticker}
              <DownOutlined />
            </div>
            <div className="assetTwo" onClick={() => openModal(2)}>
              <img
                src={tokenTwo.img}
                alt="assetOneLogo"
                className="assetLogo"
              />
              {tokenTwo.ticker}
              <DownOutlined />
            </div>
          </div>
          <button className="swapButton" disabled={loading} onClick={Swap}>
            {!loading ? (
              "Swap"
            ) : (
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="w-8 h-8 mr-2 text-gray-400 animate-spin  fill-red-600"
                  style={{
                    color : "gray",
                    fill: "#00b5ffb3",
                  }}
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
