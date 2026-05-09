import React from 'react';
import { Sparkles, Menu, MoreVertical } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    <div className="h-16 bg-[#1e1e1e]/95 backdrop-blur-md border-b border-gray-800 flex items-center justify-between px-4 sticky top-0 z-40 shadow-sm">
      <div className="flex items-center gap-3">
        <button 
          onClick={onMenuClick}
          className="p-2 -ml-2 text-gray-400 hover:text-white active:bg-gray-800 rounded-full transition-colors"
        >
          <Menu size={24} />
        </button>
        <div className="flex items-center gap-2">
          <Sparkles className="text-blue-500 fill-blue-500" size={20} />
          <h1 className="text-lg font-semibold text-white tracking-wide">Joshua Ugly</h1>
        </div>
      </div>
      <button className="p-2 -mr-2 text-gray-400 hover:text-white active:bg-gray-800 rounded-full transition-colors">
        <MoreVertical size={24} />
      </button>
    </div>
  );
};