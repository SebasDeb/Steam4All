import React, { useRef, useEffect, useState } from 'react';
import { X, ChevronRight } from 'lucide-react';
import { ChatMessage } from '../types';

interface ChatInterfaceProps {
  messages: ChatMessage[];
  isLoading: boolean;
  onSendMessage: (message: string) => void;
  onClose: () => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  messages,
  isLoading,
  onSendMessage,
  onClose,
}) => {
  const [input, setInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSendMessage(input);
    setInput('');
  };

  return (
    <div className="absolute right-0 top-0 bottom-0 w-80 bg-white dark:bg-gray-800 shadow-2xl z-30 flex flex-col border-l border-gray-200 dark:border-gray-700">
      <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-cream dark:bg-gray-900">
        <h3 className="font-serif font-bold text-primary dark:text-white">AI Assistant</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
          <span className="sr-only">Close</span>
          <X size={20} />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-800">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm ${msg.role === 'user' ? 'bg-primary text-white dark:bg-gray-700' : 'bg-white border border-gray-200 text-gray-800 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-200'}`}>
              {msg.text}
            </div>
          </div>
        ))}
        
        {isLoading && (
           <div className="flex justify-start">
             <div className="bg-white border border-gray-200 dark:bg-gray-900 dark:border-gray-700 rounded-2xl px-4 py-3">
               <div className="flex space-x-1">
                 <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                 <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                 <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
               </div>
             </div>
           </div>
        )}
        <div ref={chatEndRef}></div>
      </div>

      <form onSubmit={handleSubmit} className="p-4 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
        <div className="flex gap-2">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask for a hint..."
            className="flex-1 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-full px-4 py-2 text-sm focus:outline-none focus:border-accent"
          />
          <button type="submit" disabled={isLoading || !input.trim()} className="bg-accent text-white p-2 rounded-full hover:bg-fuchsia-600 disabled:opacity-50">
            <ChevronRight size={18} />
          </button>
        </div>
      </form>
    </div>
  );
};