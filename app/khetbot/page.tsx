'use client';

import React, { useState, useRef, useEffect } from 'react';
import DashboardLayout from '@/components/shared/dashboard-layout';
import { ModernCard } from '@/components/ModernCard';
import { ModernButton } from '@/components/ModernButton';
import { useLanguage } from '@/app/hooks/useLanguage';
import type { Message } from '@/app/types';
import { getKhetBotResponse } from '@/app/lib/advice-engine';

export default function KhetBotPage() {
  const { t, language } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: language === 'ur'
        ? 'السلام علیکم! میں کھیت بوٹ ہوں، آپ کا زرعی مشیر۔ میں آپ کی کاشتکاری میں مدد کر سکتا ہوں۔'
        : 'Assalam-o-Alaikum! I am KhetBot, your farming advisor. How can I help you today?',
      sender: 'bot',
      timestamp: new Date(),
      language: language,
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
      language: language,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate bot response delay
    setTimeout(() => {
      const response = getKhetBotResponse(input, language === 'ur' ? 'ur' : 'en');

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'bot',
        timestamp: new Date(),
        language: language,
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickSuggestions = [
    {
      en: 'How to control pests?',
      ur: 'کیڑوں سے کیسے بچیں؟',
      roman: 'Keeray se Kaisay Bachein?',
    },
    {
      en: 'Best irrigation method?',
      ur: 'بہترین آبپاشی کا طریقہ؟',
      roman: 'Behtareen Aabpashi ka Tareeqa?',
    },
    {
      en: 'Fertilizer recommendation',
      ur: 'کھاد کی سفارش',
      roman: 'Khaad ki Sifarish',
    },
    {
      en: 'Crop protection tips',
      ur: 'فصل کی حفاظت کے نکات',
      roman: 'Fasal ki Hifazat ke Nukaat',
    },
  ];

  const handleSuggestionClick = (suggestion: typeof quickSuggestions[0]) => {
    setInput(t(suggestion));
  };

  return (
    <DashboardLayout
      title={t({ en: 'KhetBot - AI Farming Advisor', ur: 'کھیت بوٹ - اے آئی زرعی مشیر', roman: 'KhetBot - AI Farming Advisor' })}
      userRole="farmer"
    >
      <div className="max-w-4xl mx-auto">
        <ModernCard variant="elevated" padding="none" className="h-[calc(100vh-250px)] flex flex-col">
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-4 ${
                    message.sender === 'user'
                      ? 'rounded-br-none'
                      : 'rounded-bl-none'
                  }`}
                  style={{
                    backgroundColor: message.sender === 'user' ? 'var(--agri-dark)' : 'var(--color-surface-muted)',
                    color: message.sender === 'user' ? 'white' : 'var(--color-text)',
                  }}
                >
                  {message.sender === 'bot' && (
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">🤖</span>
                      <span className="font-semibold text-sm" style={{ color: 'var(--agri-dark)' }}>
                        KhetBot
                      </span>
                    </div>
                  )}
                  <p className={`text-sm whitespace-pre-line ${language === 'ur' ? 'font-urdu text-right' : ''}`}>
                    {message.text}
                  </p>
                  <p
                    className="text-xs mt-2"
                    style={{
                      color: message.sender === 'user' ? 'rgba(255,255,255,0.7)' : 'var(--color-text-muted)',
                    }}
                  >
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div
                  className="rounded-lg rounded-bl-none p-4"
                  style={{ backgroundColor: 'var(--color-surface-muted)' }}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🤖</span>
                    <div className="flex gap-1">
                      <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--agri-dark)' }} />
                      <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--agri-dark)', animationDelay: '0.2s' }} />
                      <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--agri-dark)', animationDelay: '0.4s' }} />
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions */}
          {messages.length <= 2 && (
            <div className="px-6 py-3 border-t" style={{ borderColor: 'var(--color-border)' }}>
              <p className="text-xs mb-2" style={{ color: 'var(--color-text-muted)' }}>
                {t({ en: 'Quick Questions:', ur: 'فوری سوالات:', roman: 'Fori Sawalat:' })}
              </p>
              <div className="flex flex-wrap gap-2">
                {quickSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="px-3 py-2 text-xs rounded-lg border transition-colors hover:border-[var(--agri-orange)] hover:bg-[var(--color-surface-muted)]"
                    style={{
                      borderColor: 'var(--color-border)',
                      color: 'var(--color-text-secondary)',
                    }}
                  >
                    {t(suggestion)}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="p-4 border-t" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }}>
            <div className="flex gap-3">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={t({
                  en: 'Ask me anything about farming...',
                  ur: 'کاشتکاری کے بارے میں کچھ بھی پوچھیں...',
                  roman: 'Kashtkari ke baare mein kuch bhi poochhein...',
                })}
                className={`flex-1 px-4 py-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[var(--agri-orange)] ${
                  language === 'ur' ? 'font-urdu text-right' : ''
                }`}
                style={{
                  backgroundColor: 'var(--color-surface)',
                  borderColor: 'var(--color-border)',
                  color: 'var(--color-text)',
                  minHeight: '60px',
                  maxHeight: '120px',
                }}
                rows={2}
              />
              <ModernButton
                variant="primary"
                size="lg"
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="self-end"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </ModernButton>
            </div>
          </div>
        </ModernCard>

        {/* Info Card */}
        <ModernCard variant="outlined" padding="md" className="mt-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💡</span>
            <div className="flex-1">
              <h4 className="font-semibold mb-1" style={{ color: 'var(--agri-dark)' }}>
                {t({ en: 'How to use KhetBot', ur: 'کھیت بوٹ کیسے استعمال کریں', roman: 'KhetBot Kaisay Istemaal Karain' })}
              </h4>
              <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                {t({
                  en: 'Ask questions about pest control, irrigation, fertilizers, crop protection, and more. KhetBot provides farming advice in both English and Urdu.',
                  ur: 'کیڑوں سے بچاؤ، آبپاشی، کھاد، فصل کی حفاظت، اور مزید کے بارے میں سوالات پوچھیں۔ کھیت بوٹ انگریزی اور اردو دونوں میں زرعی مشورے فراہم کرتا ہے۔',
                  roman: 'Keeray se bachao, aabpashi, khaad, fasal ki hifazat, aur mazeed ke baare mein sawalat poochhein.',
                })}
              </p>
            </div>
          </div>
        </ModernCard>
      </div>
    </DashboardLayout>
  );
}
