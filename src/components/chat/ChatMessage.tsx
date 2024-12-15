import React from 'react';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  message: string;
  isBot: boolean;
  isTyping?: boolean;
  onTypingComplete?: () => void;
}

export function ChatMessage({ message, isBot, isTyping = false, onTypingComplete }: ChatMessageProps) {
  React.useEffect(() => {
    if (isTyping) {
      const words = message.split(' ');
      let currentWord = 0;
      const element = document.getElementById('typing-text');
      
      if (element) {
        element.textContent = '';
        
        const interval = setInterval(() => {
          if (currentWord < words.length) {
            element.textContent += (currentWord > 0 ? ' ' : '') + words[currentWord];
            currentWord++;
          } else {
            clearInterval(interval);
            onTypingComplete?.();
          }
        }, 100);

        return () => clearInterval(interval);
      }
    }
  }, [isTyping, message, onTypingComplete]);

  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4`}>
      <div className={`flex max-w-[80%] ${isBot ? 'flex-row' : 'flex-row-reverse'}`}>
        <div className={`flex items-start ${isBot ? 'mr-2' : 'ml-2'}`}>
          <div className={`rounded-full p-2 ${isBot ? 'bg-blue-100' : 'bg-gray-100'}`}>
            {isBot ? (
              <Bot className="h-6 w-6 text-blue-600" />
            ) : (
              <User className="h-6 w-6 text-gray-600" />
            )}
          </div>
        </div>
        <div
          className={`rounded-lg p-4 ${
            isBot
              ? 'bg-blue-50 text-gray-800'
              : 'bg-blue-600 text-white'
          }`}
        >
          {isTyping ? (
            <p id="typing-text" className="text-sm whitespace-pre-wrap"></p>
          ) : (
            <p className="text-sm whitespace-pre-wrap">{message}</p>
          )}
        </div>
      </div>
    </div>
  );
}