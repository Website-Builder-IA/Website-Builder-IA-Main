import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { useWebsiteStore } from '../../store/websiteStore';
import { chatFlow } from '../../utils/chatFlow';
import { WebsitePreview } from '../WebsitePreview';
import { FeedbackForm } from '../FeedbackForm';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

export function ChatInterface() {
  const [messages, setMessages] = useState<Array<{ text: string; isBot: boolean }>>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const websiteStore = useWebsiteStore();
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (messages.length === 0) {
      setIsTyping(true);
      setMessages([{ text: chatFlow[0].question, isBot: true }]);
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleUserResponse = async (response: string) => {
    if (isTyping) return;

    // Add user's message
    setMessages(prev => [...prev, { text: response, isBot: false }]);
    
    // Process the response
    const currentQuestion = chatFlow[currentStep];
    await currentQuestion.processResponse(response, websiteStore);

    // Move to next step
    const nextStep = currentStep + 1;
    if (nextStep < chatFlow.length) {
      setIsTyping(true);
      setCurrentStep(nextStep);
      
      // Add bot's next message after a short delay
      setTimeout(() => {
        setMessages(prev => [...prev, { text: chatFlow[nextStep].question, isBot: true }]);
      }, 1000);
    } else {
      setShowPreview(true);
    }
  };

  const handleFeedback = async (feedback: string) => {
    if (user) {
      useAuthStore.getState().usePrompt();
      // Here we would integrate with bolt.new API
      console.log('Sending feedback to AI:', feedback);
      setShowFeedback(false);
      navigate('/dashboard');
    }
  };

  const handleTypingComplete = () => {
    setIsTyping(false);
  };

  if (showPreview) {
    return (
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Seu site está pronto!</h2>
          <p className="mt-2 text-gray-600">
            Veja como ficou seu site profissional
          </p>
        </div>
        <WebsitePreview data={websiteStore} />
        <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Quer fazer alguma alteração?
          </h3>
          <p className="text-gray-600 mb-4">
            Você tem {user?.promptsRemaining || 0} prompts disponíveis este mês.
          </p>
          <div className="flex space-x-4">
            <button
              onClick={() => setShowFeedback(true)}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Solicitar Alterações
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Ir para Dashboard
            </button>
          </div>
        </div>
        {showFeedback && (
          <FeedbackForm onSubmit={handleFeedback} />
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] max-w-3xl mx-auto">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            message={message.text}
            isBot={message.isBot}
            isTyping={isTyping && index === messages.length - 1 && message.isBot}
            onTypingComplete={handleTypingComplete}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <ChatInput onSubmit={handleUserResponse} disabled={isTyping} />
    </div>
  );
}