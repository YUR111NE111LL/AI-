import React, { useState, useRef, useEffect } from 'react';
import { Header } from './components/Header';
import { InputArea } from './components/InputArea';
import { ChatMessage } from './components/ChatMessage';
import { SideMenu } from './components/SideMenu';
import { Message } from './types';
import { sendMessageToGemini } from './services/geminiService';
import { Sparkles } from 'lucide-react';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (text: string, image?: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      text,
      image,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Pass the current history (excluding the new message we just added locally)
      const responseText = await sendMessageToGemini(text, image, messages);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: Date.now(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: "Sorry, I'm having trouble connecting to the network right now. Please try again.",
        timestamp: Date.now(),
        isError: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewChat = () => {
    setMessages([]);
    setIsMenuOpen(false);
  };

  return (
    <div className="flex flex-col h-screen bg-[#121212] text-gray-100 overflow-hidden font-sans">
      <SideMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
        onNewChat={handleNewChat}
      />

      <Header onMenuClick={() => setIsMenuOpen(true)} />

      <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 no-scrollbar relative">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center opacity-40 p-8 text-center">
            <div className="bg-gray-800 p-6 rounded-full mb-6">
              <Sparkles size={48} className="text-blue-500" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Welcome Back</h2>
            <p className="text-gray-400 max-w-xs">
              I'm your pocket assistant using Gemini 3 Flash. Snap a photo or type to start.
            </p>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto w-full pb-4">
            {messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))}
            {isLoading && (
              <div className="flex justify-start mb-6 animate-pulse">
                 <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center">
                       <Sparkles size={16} className="text-white" />
                    </div>
                    <div className="bg-gray-800 px-4 py-3 rounded-2xl rounded-bl-none border border-gray-700">
                        <span className="text-sm text-gray-400">Thinking...</span>
                    </div>
                 </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </main>

      <div className="w-full max-w-2xl mx-auto z-30">
        <InputArea onSend={handleSend} disabled={isLoading} />
      </div>
    </div>
  );
};

export default App;