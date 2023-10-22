"use client"
import React from 'react';
import uniswap from '../Images/uniswap-uni-logo.png';
import inch from '../Images/1inch_token.png'
import aave from '../Images/aave-aave-logo.png'
import sandbox from '../Images/the-sandbox-logo.png'
import sushi from '../Images/sushiswap-sushi-logo.png'
import Image from 'next/image';

type Props = {};

const Arbitrum = (props: Props) => {
  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-1 sm:grid-cols-1 w-full rounded-xl flex flex-wrap p-1 px-0 sm:p-2 sm:px-2 gap-2 justify-center">
      <a href='/uniswap-eth' className='text-center'>
          <Image src={uniswap} alt="Uniswap Logo" className="bg-white w-30 sm:w-60 rounded-lg h-auto mx-auto" />
          <h1 className='mt-2 font-hanson'>UNISWAP</h1>
      </a>
      <a href='/1inch-eth' className='text-center'>
          <Image src={inch} alt="1Inch Logo" className="bg-white w-30 sm:w-60 rounded-lg h-auto mx-auto" />
          <h1 className='mt-2 font-hanson'>1INCH</h1>
      </a>
      <a href='/sushi-eth' className='text-center'>
          <Image src={sushi} alt="Sushi Logo" className="bg-white w-30 sm:w-60 rounded-lg h-auto mx-auto" />
          <h1 className='mt-2 font-hanson'>SUSHI SWAP</h1>
      </a>
    </div>
  );
};

export default Arbitrum;
