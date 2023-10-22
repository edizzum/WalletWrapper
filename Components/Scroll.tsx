"use client"
import React from 'react';
import Image from 'next/image';
import syncswap from '../Images/SyncSwap-logo.jpg'
import rhinofi from '../Images/symbiosis.png'
import kyberswap from '../Images/download (1).png'

type Props = {};

const Scroll = (props: Props) => {
  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-1 sm:grid-cols-1 w-full rounded-xl flex flex-wrap p-1 px-0 sm:p-2 sm:px-2 gap-2 justify-center">
      <a href='/syncswap-eth' className='text-center'>
          <Image src={syncswap} alt="Syncswap Logo" className="bg-white w-30 sm:w-60 rounded-lg h-auto mx-auto" />
          <h1 className='mt-2 font-hanson'>SyncSwap</h1>
      </a>
      <a href='/rhinofi-eth' className='text-center'>
          <Image src={rhinofi} alt="rhino.fi Logo" className="bg-white w-30 sm:w-60 rounded-lg h-auto mx-auto" />
          <h1 className='mt-2 font-hanson'>rhino.fi</h1>
      </a>
      <a href='/kyberswap-eth' className='text-center'>
          <Image src={kyberswap} alt="KyberSwap Logo" className="bg-white w-30 sm:w-60 rounded-lg h-auto mx-auto" />
          <h1 className='mt-2 font-hanson'>KyberSwap</h1>
      </a>
    </div>
  );
};

export default Scroll;
