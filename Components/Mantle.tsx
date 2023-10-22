"use client"
import React from 'react';
import uniswap from '../Images/uniswap-uni-logo.png';
import inch from '../Images/1inch_token.png'
import aave from '../Images/aave-aave-logo.png'
import sandbox from '../Images/the-sandbox-logo.png'
import range from '../Images/range-protocole.jpg'
import ondo from '../Images/ondo.jpg'
import mintle from '../Images/Mintle.jpg'
import Image from 'next/image';

type Props = {};

const Mantle = (props: Props) => {
  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-1 sm:grid-cols-1 w-full rounded-xl flex flex-wrap p-1 px-0 sm:p-2 sm:px-2 gap-2 justify-center">
      <a href='/range-eth' className='text-center'>
          <Image src={range} alt="Range Logo" className="bg-white w-30 sm:w-60 rounded-lg h-auto mx-auto" />
          <h1 className='mt-2 font-hanson'>Range Protocole</h1>
      </a>
      <a href='/ondo-eth' className='text-center'>
          <Image src={ondo} alt="Ondo Logo" className="bg-white w-30 sm:w-60 rounded-lg h-auto mx-auto" />
          <h1 className='mt-2 font-hanson'>Ondo Finance</h1>
      </a>
      <a href='/mintle-eth' className='text-center'>
          <Image src={mintle} alt="Mintle Logo" className="bg-white w-30 sm:w-60 rounded-lg h-auto mx-auto" />
          <h1 className='mt-2 font-hanson'>Mintle App</h1>
      </a>
    </div>
  );
};

export default Mantle;
