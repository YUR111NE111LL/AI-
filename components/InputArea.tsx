import React, { useState, useRef } from 'react';
import { Send, Image as ImageIcon, X, Loader2, Camera } from 'lucide-react';

interface InputAreaProps {
  onSend: (text: string, image?: string) => void;
  disabled: boolean;
}

export const InputArea: React.FC<InputAreaProps> = ({ onSend, disabled }) => {
  const [text, setText] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if ((!text.trim() && !selectedImage) || disabled) return;
    onSend(text, selectedImage || undefined);
    setText('');
    setSelectedImage(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
    // Reset input so same file can be selected again
    e.target.value = '';
  };

  return (
    <div className="bg-[#1e1e1e] border-t border-gray-800 p-3 pb-safe-area">
      
      {/* Image Preview */}
      {selectedImage && (
        <div className="relative inline-block mb-3 ml-1">
          <img 
            src={selectedImage} 
            alt="Preview" 
            className="h-20 w-20 object-cover rounded-lg border border-gray-600"
          />
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute -top-2 -right-2 bg-gray-700 rounded-full p-1 text-white border border-gray-500 hover:bg-gray-600"
          >
            <X size={14} />
          </button>
        </div>
      )}

      <div className="flex items-end gap-2">
        {/* Hidden File Input */}
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          capture="environment" // Triggers camera on mobile
          className="hidden"
          onChange={handleFileChange}
        />

        {/* Camera/Image Button */}
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled}
          className="p-3 text-gray-400 hover:text-white bg-gray-800 rounded-full transition-colors active:scale-95 disabled:opacity-50"
        >
          {selectedImage ? <ImageIcon size={24} className="text-blue-400" /> : <Camera size={24} />}
        </button>

        {/* Text Input */}
        <div className="flex-1 bg-gray-800 rounded-2xl border border-gray-700 focus-within:border-blue-500 transition-colors flex items-center">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything..."
            disabled={disabled}
            className="w-full bg-transparent text-white px-4 py-3 max-h-32 min-h-[48px] focus:outline-none resize-none no-scrollbar text-base"
            rows={1}
            style={{ height: 'auto' }}
          />
        </div>

        {/* Send Button */}
        <button
          onClick={handleSend}
          disabled={disabled || (!text.trim() && !selectedImage)}
          className={`p-3 rounded-full transition-all active:scale-95 ${
            text.trim() || selectedImage
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20'
              : 'bg-gray-800 text-gray-500'
          }`}
        >
          {disabled ? <Loader2 size={24} className="animate-spin" /> : <Send size={24} />}
        </button>
      </div>
    </div>
  );
};
