import React from 'react';
import { X, MessageSquarePlus, Settings, HelpCircle, Github } from 'lucide-react';

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNewChat: () => void;
}

export const SideMenu: React.FC<SideMenuProps> = ({ isOpen, onClose, onNewChat }) => {
  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div 
        className={`fixed top-0 left-0 h-full w-[280px] bg-[#1e1e1e] z-50 transform transition-transform duration-300 ease-out shadow-2xl border-r border-gray-800 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="h-32 bg-gradient-to-br from-blue-900 to-blue-700 p-6 flex flex-col justify-end">
             <h2 className="text-xl font-bold text-white">Joshua Ugly</h2>
             <p className="text-blue-100 text-sm opacity-80">AI Assistant</p>
          </div>

          {/* Menu Items */}
          <div className="flex-1 py-4">
             <button 
                onClick={() => {
                  onNewChat();
                  onClose();
                }}
                className="w-full px-6 py-4 flex items-center gap-4 hover:bg-white/5 active:bg-white/10 text-gray-200 transition-colors"
             >
                <MessageSquarePlus size={22} className="text-blue-400" />
                <span className="text-base font-medium">New Chat</span>
             </button>

             <button className="w-full px-6 py-4 flex items-center gap-4 hover:bg-white/5 active:bg-white/10 text-gray-200 transition-colors">
                <Settings size={22} className="text-gray-400" />
                <span className="text-base font-medium">Settings</span>
             </button>

             <button className="w-full px-6 py-4 flex items-center gap-4 hover:bg-white/5 active:bg-white/10 text-gray-200 transition-colors">
                <HelpCircle size={22} className="text-gray-400" />
                <span className="text-base font-medium">Help & Feedback</span>
             </button>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-800 text-xs text-gray-500 text-center">
             v1.0.2 • Powered by Google Gemini
          </div>
        </div>
      </div>
    </>
  );
};