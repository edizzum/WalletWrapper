"use client"
import Dropdown from "@/Components/Dropdown";
import { useState } from 'react';
import Tab from "@/Components/Tab";
import { Wallet } from "@/Components/Wallet";
import Ethereum from "@/Components/Ethereum";
import Bsc from "@/Components/Bsc";
import Base from "@/Components/Base";
import Arbitrum from "@/Components/Arbitrum";
import Polygon from "@/Components/Polygon";
import Scroll from "@/Components/Scroll";
import Mantle from "@/Components/Mantle";
import { getAddress } from "@/Components/swapper/ethereum/ethereumMain";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
require("@solana/wallet-adapter-react-ui/styles.css");


export default function Page() {
  const [dropdown, setDropdown] = useState<string>('Ethereum');
  const [position, setPosition] = useState(0);
  const options: string[] = ['Ethereum', 'Scroll', 'Mantle', 'BSC', 'Arbitrum', 'Polygon', 'Base'];
  const address = getAddress();
  return (
    <div className="p-4 sm:p-6 align-center">
        <div className="bg-neutral h-18 max-w-3xl p-2 px-2 rounded-xl mx-auto flex justify-between items-center">
          <div>
            <Dropdown label={dropdown} options={options} selectedOption={dropdown} onSelect={setDropdown} />
          </div>
          <div className="flex flex-col text-white items-center">
            <WalletMultiButton />
          </div>
            
        </div>

        <div  className="text-white mt-6 h-18 max-w-4xl p-2 px-2 rounded-xl mx-auto flex items-center">
            {dropdown === "Ethereum" ? <Ethereum /> : null}
            {dropdown === "BSC" ? <Bsc /> : null}
            {dropdown === "Base" ? <Base /> : null}
            {dropdown === "Arbitrum" ? <Arbitrum /> : null}
            {dropdown === "Polygon" ? <Polygon /> : null}
            {dropdown === "Scroll" ? <Scroll /> : null}
            {dropdown === "Mantle" ? <Mantle /> : null}
        </div>
    </div>
  );
}
