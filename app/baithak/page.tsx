"use client";

import { useState, useEffect, useRef, useMemo } from 'react';
import { Send, Users, Mic, Volume2 } from 'lucide-react';
import ProtectedRoute from '@/app/components/shared/ProtectedRoute';
import DashboardLayout from '@/app/components/shared/DashboardLayout';
import ModernCard from '@/app/components/ModernCard';
import ModernButton from '@/app/components/ModernButton';
import ModernInput from '@/app/components/ModernInput';
import Badge from '@/app/components/ui/Badge';
import { formatRelativeTime } from '@/app/lib/utils/format';
import { useAuth } from '@/app/lib/context/AuthContext';

interface Message {
  _id: string;
  sender_id: string;
  sender_name: string;
  message_text: string;
  language: string;
  timestamp: string;
}

export default function BaithakPage() {
  const { user } = useAuth();
  const [selectedRoom, setSelectedRoom] = useState<string>('wheat_growers');
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock messages
  const mockMessages = useMemo(() => [
    {
      _id: '1',
      sender_id: '1',
      sender_name: 'Ahmad Khan',
      message_text: 'Assalamu Alaikum everyone! Anyone here from Multan?',
      language: 'en',
      timestamp: '2025-11-04T10:00:00Z',
    },
    {
      _id: '2',
      sender_id: '2',
      sender_name: 'Ali Raza',
      message_text: 'Walaikum Assalam! Yes, I am from Multan.',
      language: 'en',
      timestamp: '2025-11-04T10:01:00Z',
    },
    {
      _id: '3',
      sender_id: '3',
      sender_name: 'Fatima Bibi',
      message_text: 'Wheat ki qeemat aj 2850 rupay per 40kg hai.',
      language: 'roman_ur',
      timestamp: '2025-11-04T10:02:00Z',
    },
    {
      _id: '4',
      sender_id: '1',
      sender_name: 'Ahmad Khan',
      message_text: 'That is good price! Should we sell now?',
      language: 'en',
      timestamp: '2025-11-04T10:03:00Z',
    },
  ], []);

  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const mockRooms = [
    {
      room_id: 'wheat_growers',
      room_name: 'Wheat Growers Circle',
      description: 'Discuss wheat cultivation and market',
      active_users: 24,
    },
    {
      room_id: 'cotton_farmers',
      room_name: 'Cotton Farmers Forum',
      description: 'Cotton farming best practices',
      active_users: 18,
    },
    {
      room_id: 'vegetable_farming',
      room_name: 'Vegetable Farming',
      description: 'Vegetable cultivation tips',
      active_users: 32,
    },
    {
      room_id: 'organic_farming',
      room_name: 'Organic Farming',
      description: 'Organic and sustainable farming',
      active_users: 15,
    },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      _id: Date.now().toString(),
      sender_id: user?.user_id || '',
      sender_name: user?.full_name || 'You',
      message_text: message,
      language: 'en',
      timestamp: new Date().toISOString(),
    };

    setMessages([...messages, newMessage]);
    setMessage('');
    scrollToBottom();

    // In production, this would send via Socket.io
    // socket.emit('send_message', { room_id: selectedRoom, message });
  };

  const currentRoom = mockRooms.find((r) => r.room_id === selectedRoom);

  return (
    <ProtectedRoute allowedRoles={['farmer', 'admin', 'expert']}>
      <DashboardLayout role={user?.role === 'admin' ? 'admin' : 'farmer'}>
        <div className="h-[calc(100vh-120px)] flex flex-col">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full overflow-hidden">
            {/* Rooms List */}
            <div className="lg:col-span-1 h-full overflow-hidden">
              <ModernCard className="h-full flex flex-col">
                <h3 className="text-lg font-semibold text-(--color-text) mb-4 flex items-center gap-2 flex-shrink-0">
                  <Users className="w-5 h-5" />
                  Active Rooms
                </h3>
                <div className="space-y-2 overflow-y-auto flex-1">
                  {mockRooms.map((room) => (
                    <button
                      key={room.room_id}
                      onClick={() => setSelectedRoom(room.room_id)}
                      className={`w-full text-left p-3 rounded-lg transition-all ${
                        selectedRoom === room.room_id
                          ? 'bg-(--color-primary) text-white'
                          : 'bg-(--color-surface-alt) hover:bg-(--color-hover-overlay)'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <p className={`font-semibold text-sm ${
                          selectedRoom === room.room_id
                            ? 'text-white'
                            : 'text-(--color-text)'
                        }`}>{room.room_name}</p>
                        <Badge
                          variant={
                            selectedRoom === room.room_id ? 'success' : 'neutral'
                          }
                          size="sm"
                        >
                          {room.active_users}
                        </Badge>
                      </div>
                      <p
                        className={`text-xs ${
                          selectedRoom === room.room_id
                            ? 'text-white'
                            : 'text-(--color-text-muted)'
                        }`}
                      >
                        {room.description}
                      </p>
                    </button>
                  ))}
                </div>
              </ModernCard>
            </div>

            {/* Chat Area */}
            <div className="lg:col-span-3 h-full overflow-hidden">
              <ModernCard className="h-full flex flex-col">
                {/* Chat Header */}
                <div className="flex items-center justify-between pb-4 border-b border-(--color-border)">
                  <div>
                    <h2 className="text-xl font-semibold text-(--color-text)">
                      {currentRoom?.room_name}
                    </h2>
                    <p className="text-sm text-(--color-text-muted) flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      {currentRoom?.active_users} active participants
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <ModernButton variant="ghost" size="sm">
                      <Mic className="w-5 h-5" />
                    </ModernButton>
                    <ModernButton variant="ghost" size="sm">
                      <Volume2 className="w-5 h-5" />
                    </ModernButton>
                  </div>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto py-4 space-y-4">
                  {messages.map((msg) => {
                    const isOwnMessage = msg.sender_id === user?.user_id;
                    return (
                      <div
                        key={msg._id}
                        className={`flex ${
                          isOwnMessage ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        <div
                          className={`max-w-[70%] ${
                            isOwnMessage ? 'items-end' : 'items-start'
                          }`}
                        >
                          {!isOwnMessage && (
                            <p className="text-xs font-semibold text-(--color-text) mb-1">
                              {msg.sender_name}
                            </p>
                          )}
                          <div
                            className={`p-3 rounded-lg ${
                              isOwnMessage
                                ? 'bg-(--color-primary) text-white'
                                : 'bg-(--color-surface-alt) text-(--color-text)'
                            }`}
                          >
                            <p className="text-sm">{msg.message_text}</p>
                            <p
                              className={`text-xs mt-1 ${
                                isOwnMessage
                                  ? 'text-white/70'
                                  : 'text-(--color-text-muted)'
                              }`}
                            >
                              {formatRelativeTime(msg.timestamp)}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <div className="pt-4 border-t border-(--color-border)">
                  <div className="flex gap-2">
                    <ModernInput
                      label=""
                      placeholder="Type your message... (Urdu/Roman Urdu/English)"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                      className="flex-1"
                    />
                    <ModernButton
                      variant="primary"
                      onClick={handleSendMessage}
                      disabled={!message.trim()}
                    >
                      <Send className="w-5 h-5" />
                    </ModernButton>
                  </div>
                  <p className="text-xs text-(--color-text-muted) mt-2">
                    Press Enter to send, Shift + Enter for new line
                  </p>
                </div>

                {/* Connection Status (Socket.io indicator) */}
                <div className="mt-2 pt-2 border-t border-(--color-border) flex items-center gap-2 text-sm shrink-0">
                  <div className="w-2 h-2 rounded-full bg-(--color-success) animate-pulse"></div>
                  <span className="text-(--color-text-muted) text-xs">
                    Connected (Demo Mode)
                  </span>
                </div>
              </ModernCard>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
