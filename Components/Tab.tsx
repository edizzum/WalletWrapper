import React, { useState } from 'react';

interface TabProps {
  onSelect: (tab: number) => void;
}

const Tab: React.FC<TabProps> = ({ onSelect }) => {
  const [activeTab, setActiveTab] = useState<number>(1);

  const tabStyle = (isActive: boolean) => {
    if (isActive) {
      return "inline-block px-4 py-3 text-white rounded-lg bg-gradient-to-r from-purple to-green shadow";
    } else {
      return "inline-block px-4 py-3 text-white rounded-lg";
    }
  };

  const handleTabClick = (tab: number) => {
    setActiveTab(tab);
    onSelect(tab);
  };

  return (
    <ul className="flex flex-wrap text-sm font-medium sm:font-small text-center text-white">
      <li className="mr-1">
        <button className={tabStyle(activeTab === 1)} onClick={() => handleTabClick(1)}>App</button>
      </li>
      <li className="mr-1">
        <button className={tabStyle(activeTab === 2)} onClick={() => handleTabClick(2)}>Bridge</button>
      </li>
    </ul>
  );
};

export default Tab;
