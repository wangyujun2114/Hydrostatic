import React, { useState, useRef, useEffect } from 'react';
import { streamChatResponse } from '../services/geminiService';
import { ChatMessage } from '../types';
import { MessageSquare, X, Send, Minimize2, Maximize2, Bot } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const AiAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: '你好！我是你的静压支承AI助教。关于节流器设计、刚度计算或应用场景，随时问我！', timestamp: Date.now() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    setInput('');
    setIsLoading(true);

    // Add user message
    const newHistory = [...messages, { role: 'user', text: userText, timestamp: Date.now() } as ChatMessage];
    setMessages(newHistory);

    // Add placeholder for AI response
    setMessages(prev => [...prev, { role: 'model', text: '', timestamp: Date.now() }]);

    let accumulatedText = '';

    await streamChatResponse(
      newHistory.filter(m => m.text !== ''), // Filter out empty placeholders if any
      userText,
      (chunk) => {
        accumulatedText += chunk;
        setMessages(prev => {
          const last = prev[prev.length - 1];
          if (last.role === 'model') {
            return [...prev.slice(0, -1), { ...last, text: accumulatedText }];
          }
          return prev;
        });
      }
    );

    setIsLoading(false);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-accent hover:bg-sky-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-50 flex items-center gap-2"
      >
        <MessageSquare size={24} />
        <span className="font-semibold hidden md:inline">AI 助教</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-[90vw] md:w-[400px] h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-10 duration-300">
      {/* Header */}
      <div className="bg-primary text-white p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Bot size={20} className="text-accent" />
          <h3 className="font-bold">静压支承专家</h3>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setIsOpen(false)} className="hover:text-accent transition-colors">
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] p-3 rounded-lg text-sm shadow-sm ${
                msg.role === 'user'
                  ? 'bg-accent text-white rounded-tr-none'
                  : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
              }`}
            >
              <ReactMarkdown 
                className="prose prose-sm prose-invert"
                components={{
                  p: ({node, ...props}) => <p className={msg.role === 'user' ? 'text-white' : 'text-slate-800'} {...props} />
                }}
              >
                {msg.text}
              </ReactMarkdown>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white p-3 rounded-lg border border-slate-200 flex gap-1 items-center">
              <div className="w-2 h-2 bg-accent rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-accent rounded-full animate-bounce delay-100"></div>
              <div className="w-2 h-2 bg-accent rounded-full animate-bounce delay-200"></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-slate-100 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="例如：薄膜节流的优缺点是什么？"
          className="flex-1 bg-slate-100 border-none rounded-lg px-4 py-2 focus:ring-2 focus:ring-accent focus:outline-none text-sm"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="bg-primary hover:bg-slate-800 text-white p-2 rounded-lg transition-colors disabled:opacity-50"
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

export default AiAssistant;
