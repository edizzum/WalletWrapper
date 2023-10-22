import React from 'react';

const Header: React.FC = () => {
  return (
    <section className="bg-transparent text-white">
      <div className="mx-auto max-w-screen-xl px-4 py-32 flex h-screen items-center">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-hanson bg-gradient-to-r from-white to-white bg-clip-text text-xl font-extrabold text-transparent sm:text-4xl">
            CONNECT EVM DAPPS WITH{' '}<br/>
            <span className="text-3xl sm:text-5xl bg-gradient-to-r from-purple to-green bg-clip-text">WalletWrapper.</span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm">
            
          </p>

          <p className="mx-auto mt-8 max-w-xl text-sm">
            <a
              className="rounded-md bg-gradient-to-r from-purple to-green px-5 py-2.5 text-sm font-medium text-white shadow"
              href="/app"
            >
              Launch Dapp
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Header;
