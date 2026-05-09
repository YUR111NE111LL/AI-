import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Message } from '../types';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex w-full mb-6 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex max-w-[85%] md:max-w-[70%] ${isUser ? 'flex-row-reverse' : 'flex-row'} items-end gap-2`}>
        
        {/* Avatar */}
        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
          isUser ? 'bg-blue-600' : 'bg-emerald-600'
        }`}>
          {isUser ? <User size={16} className="text-white" /> : <Bot size={16} className="text-white" />}
        </div>

        {/* Bubble */}
        <div
          className={`px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
            isUser
              ? 'bg-blue-600 text-white rounded-br-none'
              : 'bg-gray-800 text-gray-100 rounded-bl-none border border-gray-700'
          } ${message.isError ? 'bg-red-900 border-red-700' : ''}`}
        >
          {message.image && (
            <div className="mb-3 rounded-lg overflow-hidden border border-white/20">
              <img src={message.image} alt="User upload" className="w-full h-auto object-cover max-h-60" />
            </div>
          )}
          
          <div className="markdown-content">
            <ReactMarkdown>{message.text}</ReactMarkdown>
          </div>
          
          <div className={`text-[10px] mt-1 opacity-50 ${isUser ? 'text-right' : 'text-left'}`}>
            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>
    </div>
  );
};
