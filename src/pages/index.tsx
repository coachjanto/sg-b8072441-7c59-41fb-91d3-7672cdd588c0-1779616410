import React, { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { LoginScreen } from "@/components/LoginScreen";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Send, Menu, Paperclip } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Message {
  id: string;
  sender: string;
  text: string;
  timestamp: Date;
  isAI: boolean;
}

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isFirstLogin, setIsFirstLogin] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");

  const handleLogin = (username: string) => {
    setCurrentUser(username);
    setIsLoggedIn(true);
    
    // Check if first login (in real app, check from database)
    const hasLoggedInBefore = localStorage.getItem(`user_${username}_logged_in`);
    setIsFirstLogin(!hasLoggedInBefore);
    
    if (!hasLoggedInBefore) {
      localStorage.setItem(`user_${username}_logged_in`, 'true');
    }
  };

  useEffect(() => {
    if (isLoggedIn && currentUser) {
      // Add Claudia's greeting as first message
      const greeting: Message = {
        id: '1',
        sender: 'Claudia Yang',
        text: isFirstLogin 
          ? `Konnichiwa, ${currentUser}! 👋\n\nSaya Claudia Yang, konsultan perjalanan & konten untuk Trip Osaka keluarga Djojo, 29 Juni – 13 Juli 2026.\n\nYang bisa saya bantu:\n🗺️ Itinerary & rute harian\n🍜 Rekomendasi kuliner & budget meals\n📸 Ide konten Reels Live & posting untuk channel Coach Janto\n🚇 Info transportasi harga tiket jam buka tempat wisata\n📄 Akses cepat semua dokumen trip\n⏰ Reminder & alarm persiapan\n💡 Rencana spontan dadakan\n\nTanya apa saja kapan saja. Saya selalu di sini! 🇯🇵`
          : `Ohayou, ${currentUser}! 🌸 Ada yang bisa saya bantu hari ini?`,
        timestamp: new Date(),
        isAI: true
      };
      setMessages([greeting]);
    }
  }, [isLoggedIn, currentUser, isFirstLogin]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      sender: currentUser,
      text: inputMessage,
      timestamp: new Date(),
      isAI: false
    };
    
    setMessages([...messages, newMessage]);
    setInputMessage("");
    
    // Simulate AI response (replace with Claude API call)
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        sender: 'Claudia Yang',
        text: `Terima kasih ${currentUser}! Saya sedang memproses pertanyaan Anda. (Claude API belum terhubung - tambahkan API key di Admin Dashboard)`,
        timestamp: new Date(),
        isAI: true
      }]);
    }, 1000);
  };

  if (!isLoggedIn) {
    return (
      <>
        <SEO 
          title="Japan2026 Trip - Osaka Travel HQ"
          description="AI-powered travel companion for Djojo family Osaka trip 2026"
        />
        <Layout>
          <LoginScreen onLogin={handleLogin} />
        </Layout>
      </>
    );
  }

  return (
    <>
      <SEO title="Chat - Japan2026 Trip" />
      <Layout>
        <div className="flex flex-col h-screen max-w-[430px] mx-auto">
          {/* Header */}
          <div className="glass-card p-4 m-4 rounded-2xl flex items-center justify-between">
            <div>
              <h2 className="text-xl font-serif font-bold text-primary">Main Chat 💬</h2>
              <p className="text-sm text-muted-foreground">with Claudia Yang</p>
            </div>
            <Button variant="ghost" size="icon" className="text-primary">
              <Menu className="h-5 w-5" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 space-y-4 pb-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.isAI ? 'justify-start' : 'justify-end'} animate-slide-in`}
              >
                <div
                  className={`glass-card max-w-[85%] p-4 rounded-2xl ${
                    msg.isAI ? 'bg-muted/30 border-secondary/20' : 'bg-primary/20 border-primary/20'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    {msg.isAI && (
                      <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-xs">
                        🤖
                      </div>
                    )}
                    <p className="text-xs text-muted-foreground font-medium">
                      {msg.sender}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {msg.timestamp.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  <p className="text-foreground whitespace-pre-line">{msg.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="glass-card p-4 m-4 rounded-2xl">
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-primary"
              >
                <Paperclip className="h-5 w-5" />
              </Button>
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Tanya Claudia..."
                className="flex-1 bg-background/50 border-muted"
              />
              <Button
                onClick={handleSendMessage}
                size="icon"
                className="ripple-effect bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Bottom Nav */}
          <div className="glass-card mx-4 mb-4 p-2 rounded-2xl flex justify-around items-center">
            <Button variant="ghost" size="sm" className="flex-col gap-1 h-auto py-2 text-primary font-semibold min-w-[48px]">
              <span className="text-lg">💬</span>
              <span className="text-xs">Chat</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex-col gap-1 h-auto py-2 text-muted-foreground min-w-[48px]">
              <span className="text-lg">📄</span>
              <span className="text-xs">Docs</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex-col gap-1 h-auto py-2 text-muted-foreground min-w-[48px]">
              <span className="text-lg">💰</span>
              <span className="text-xs">Expense</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex-col gap-1 h-auto py-2 text-muted-foreground min-w-[48px]">
              <span className="text-lg">🎁</span>
              <span className="text-xs">Souvenir</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex-col gap-1 h-auto py-2 text-muted-foreground min-w-[48px]">
              <span className="text-lg">📸</span>
              <span className="text-xs">Gallery</span>
            </Button>
          </div>
        </div>
      </Layout>
    </>
  );
}