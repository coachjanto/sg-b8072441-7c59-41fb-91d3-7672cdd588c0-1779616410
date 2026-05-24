import React, { useState } from "react";
import { Layout } from "@/components/Layout";
import { LoginScreen } from "@/components/LoginScreen";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Send, Plus, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [messages, setMessages] = useState<Array<{id: string, sender: string, text: string, timestamp: Date, isAI: boolean}>>([]);
  const [inputMessage, setInputMessage] = useState("");

  const handleLogin = (username: string) => {
    setCurrentUser(username);
    setIsLoggedIn(true);
    setShowOnboarding(true);
  };

  const handleStartApp = () => {
    setShowOnboarding(false);
    // Add initial greeting from Claudia
    setMessages([{
      id: '1',
      sender: 'Claudia Yang',
      text: `Ohayou, ${currentUser}! 🌸 Ada yang bisa saya bantu hari ini?`,
      timestamp: new Date(),
      isAI: true
    }]);
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    const newMessage = {
      id: Date.now().toString(),
      sender: currentUser,
      text: inputMessage,
      timestamp: new Date(),
      isAI: false
    };
    
    setMessages([...messages, newMessage]);
    setInputMessage("");
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        sender: 'Claudia Yang',
        text: `Terima kasih ${currentUser}! Saya sedang memproses pertanyaan Anda. (Claude API belum terhubung)`,
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

  if (showOnboarding) {
    return (
      <>
        <SEO title="Welcome - Japan2026 Trip" />
        <Layout>
          <div className="flex items-center justify-center min-h-screen p-6">
            <div className="glass-card p-8 max-w-2xl w-full rounded-2xl animate-slide-in">
              <h1 className="text-4xl font-serif font-bold text-primary mb-6 text-center">
                Konnichiwa, {currentUser}! 👋
              </h1>
              
              <p className="text-lg mb-6 text-center text-muted-foreground">
                Saya Claudia Yang, konsultan perjalanan & konten untuk Trip Osaka keluarga Djojo, 29 Juni – 13 Juli 2026.
              </p>

              <div className="space-y-4 mb-8">
                <p className="text-primary font-semibold">Yang bisa saya bantu:</p>
                
                <div className="space-y-3 text-foreground">
                  <p>🗺️ Itinerary & rute harian</p>
                  <p>🍜 Rekomendasi kuliner & budget meals</p>
                  <p>📸 Ide konten Reels Live & posting untuk channel Coach Janto</p>
                  <p>🚇 Info transportasi harga tiket jam buka tempat wisata</p>
                  <p>📄 Akses cepat semua dokumen trip</p>
                  <p>⏰ Reminder & alarm persiapan</p>
                  <p>💡 Rencana spontan dadakan</p>
                </div>
              </div>

              <p className="text-center text-muted-foreground italic mb-8">
                Tanya apa saja kapan saja. Saya selalu di sini! 🇯🇵
              </p>

              <div className="flex justify-center">
                <Button
                  onClick={handleStartApp}
                  size="lg"
                  className="ripple-effect bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8"
                >
                  Mulai 🚀
                </Button>
              </div>
            </div>
          </div>
        </Layout>
      </>
    );
  }

  return (
    <>
      <SEO title="Chat - Japan2026 Trip" />
      <Layout>
        <div className="flex flex-col h-screen max-w-2xl mx-auto">
          {/* Header */}
          <div className="glass-card p-4 m-4 rounded-2xl flex items-center justify-between">
            <div>
              <h2 className="text-xl font-serif font-bold text-primary">Main Chat 💬</h2>
              <p className="text-sm text-muted-foreground">with Claudia Yang</p>
            </div>
            <Button variant="ghost" size="icon">
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
                  className={`glass-card max-w-[80%] p-4 rounded-2xl ${
                    msg.isAI ? 'bg-muted/30' : 'bg-primary/20'
                  }`}
                >
                  <p className="text-xs text-muted-foreground mb-1">
                    {msg.sender} • {msg.timestamp.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                  <p className="text-foreground">{msg.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="glass-card p-4 m-4 rounded-2xl">
            <div className="flex gap-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Tanya Claudia..."
                className="flex-1 bg-background/50"
              />
              <Button
                onClick={handleSendMessage}
                size="icon"
                className="ripple-effect bg-primary hover:bg-primary/90"
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Bottom Nav */}
          <div className="glass-card mx-4 mb-4 p-2 rounded-2xl flex justify-around">
            <Button variant="ghost" size="sm" className="flex-1 text-primary">
              💬 Chat
            </Button>
            <Button variant="ghost" size="sm" className="flex-1">
              📄 Docs
            </Button>
            <Button variant="ghost" size="sm" className="flex-1">
              💰 Expenses
            </Button>
            <Button variant="ghost" size="sm" className="flex-1">
              🎁 Souvenirs
            </Button>
          </div>
        </div>
      </Layout>
    </>
  );
}