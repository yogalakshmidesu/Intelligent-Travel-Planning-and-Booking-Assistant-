import React, { useState } from 'react';
import { MessageSquare, Send, X, Sparkles, Bot, User, RefreshCw } from 'lucide-react';
import { sendChatMessageApi } from '../services/api';

export default function AIChatDrawer({ destinationName }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: `Hello! I'm your TripMind AI Assistant. Ask me anything about ${destinationName || 'your upcoming trip'}!`
    }
  ]);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);

  const quickPrompts = [
    'Top street food spots?',
    'Local tipping customs?',
    'Best time for photo ops?',
    'Budget saving tips?'
  ];

  const handleSend = async (textToSend) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg = { id: Date.now(), sender: 'user', text: query };
    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsSending(true);

    const res = await sendChatMessageApi(query, destinationName);

    const botMsg = {
      id: Date.now() + 1,
      sender: 'bot',
      text: res.reply || 'Here is a helpful tip: always keep a lightweight daypack and water bottle ready during daily tours!'
    };

    setMessages((prev) => [...prev, botMsg]);
    setIsSending(false);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-[#117A8B] to-[#0B3C49] text-white p-4 rounded-full shadow-2xl hover:scale-105 transition-transform flex items-center gap-2.5 cursor-pointer group border border-white/20"
        >
          <div className="relative">
            <Bot className="w-6 h-6 text-[#FF6B4A]" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping"></span>
          </div>
          <span className="text-xs font-bold hidden sm:inline">Ask TripMind AI</span>
        </button>
      )}

      {/* Chat Drawer Modal */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-80 sm:w-96 bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col h-[500px] animate-fadeIn">
          
          {/* Header */}
          <div className="bg-[#0B3C49] text-white px-4 py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-[#FF6B4A]">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold leading-none">TripMind Assistant</h4>
                <p className="text-[10px] text-slate-300 mt-0.5">Online • {destinationName || 'Global'}</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-300 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 text-xs ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-6 h-6 rounded-full bg-[#117A8B] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                )}
                <div
                  className={`p-3 rounded-2xl max-w-[80%] leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#FF6B4A] text-white rounded-tr-xs font-medium'
                      : 'bg-white border border-slate-200 text-slate-800 rounded-tl-xs shadow-2xs'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isSending && (
              <div className="flex gap-2 items-center text-xs text-slate-400">
                <RefreshCw className="w-4 h-4 animate-spin text-[#117A8B]" />
                <span>Thinking...</span>
              </div>
            )}
          </div>

          {/* Quick Prompts Chips */}
          <div className="p-2 bg-white border-t border-slate-100 flex gap-1.5 overflow-x-auto no-scrollbar">
            {quickPrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSend(prompt)}
                className="shrink-0 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-semibold px-2.5 py-1 rounded-full"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Area */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about food, packing, travel..."
              className="flex-1 bg-slate-100 text-xs font-medium px-3.5 py-2.5 rounded-xl outline-none focus:bg-slate-50 focus:border focus:border-[#117A8B]"
            />
            <button
              type="submit"
              disabled={isSending || !input.trim()}
              className="bg-[#117A8B] hover:bg-[#09313C] text-white p-2.5 rounded-xl disabled:opacity-40"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
}
