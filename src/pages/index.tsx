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
  const [activeTab, setActiveTab] = useState("chat");
  const [apiConnected, setApiConnected] = useState(false);
  const [aiProvider, setAiProvider] = useState<"claude" | "openai">("claude");

  // Check API connection status on mount and when returning from admin
  useEffect(() => {
    if (isLoggedIn) {
      const savedSettings = localStorage.getItem('admin_settings');
      if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        const hasClaudeKey = settings.claude_api_key && settings.claude_api_key.length > 0;
        const hasOpenaiKey = settings.openai_api_key && settings.openai_api_key.length > 0;
        
        setAiProvider(settings.ai_provider || 'claude');
        
        if (settings.ai_provider === 'openai') {
          setApiConnected(hasOpenaiKey);
        } else {
          setApiConnected(hasClaudeKey);
        }
      }
    }
  }, [isLoggedIn]);

  const handleLogin = (username: string) => {
    setCurrentUser(username);
    setIsLoggedIn(true);
    
    // Check if first time login
    const hasLoggedBefore = localStorage.getItem(`${username}_has_logged_before`);
    setIsFirstLogin(!hasLoggedBefore);
    
    if (!hasLoggedBefore) {
      localStorage.setItem(`${username}_has_logged_before`, 'true');
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      const welcomeMessage = isFirstLogin
        ? `Konnichiwa, ${currentUser}! 👋\n\nSaya Claudia Yang, konsultan perjalanan & konten untuk Trip Osaka keluarga Djojo, 29 Juni – 13 Juli 2026.\n\nYang bisa saya bantu:\n🗺️ Itinerary & rute harian\n🍜 Rekomendasi kuliner & budget meals\n📸 Ide konten Reels Live & posting untuk channel Coach Janto\n🚇 Info transportasi harga tiket jam buka tempat wisata\n📄 Akses cepat semua dokumen trip\n⏰ Reminder & alarm persiapan\n💡 Rencana spontan dadakan\n\nTanya apa saja kapan saja. Saya selalu di sini! 🇯🇵`
        : `Ohayou, ${currentUser}! 🌸 Ada yang bisa saya bantu hari ini?`;

      setMessages([{
        id: '1',
        sender: 'Claudia Yang',
        text: welcomeMessage,
        timestamp: new Date(),
        isAI: true
      }]);
    }
  }, [isLoggedIn, currentUser, isFirstLogin]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    // Check API connection before sending
    if (!apiConnected) {
      const newMessages = [
        {
          id: Date.now().toString(),
          sender: currentUser,
          text: inputMessage,
          timestamp: new Date(),
          isAI: false
        },
        {
          id: (Date.now() + 1).toString(),
          sender: 'Claudia Yang',
          text: `⚠️ ${aiProvider === 'claude' ? 'Claude' : 'OpenAI'} API belum terhubung. Silakan minta Super Admin untuk setup API key di halaman Admin Settings terlebih dahulu.`,
          timestamp: new Date(),
          isAI: true
        }
      ];
      setMessages([...messages, ...newMessages]);
      setInputMessage("");
      return;
    }
    
    const userMessage = {
      id: Date.now().toString(),
      sender: currentUser,
      text: inputMessage,
      timestamp: new Date(),
      isAI: false
    };
    
    setMessages([...messages, userMessage]);
    const currentInput = inputMessage;
    setInputMessage("");
    
    // Call real AI API
    try {
      const savedSettings = localStorage.getItem('admin_settings');
      if (!savedSettings) {
        throw new Error('Settings not found');
      }
      
      const settings = JSON.parse(savedSettings);
      const apiKey = settings.ai_provider === 'openai' 
        ? settings.openai_api_key 
        : settings.claude_api_key;
      const model = settings.ai_model || 'claude-3-5-sonnet-20241022';
      
      // Get knowledge base for context
      const savedKnowledge = localStorage.getItem('knowledge_base');
      let knowledgeContext = '';
      if (savedKnowledge) {
        const knowledge = JSON.parse(savedKnowledge);
        knowledgeContext = knowledge.map((entry: any) => 
          `[${entry.category}] ${entry.title}: ${entry.content}`
        ).join('\n\n');
      }
      
      // Build conversation history for context
      const conversationHistory = messages.slice(-5).map(msg => ({
        role: msg.isAI ? 'assistant' : 'user',
        content: msg.text
      }));
      
      let aiResponse = '';
      
      if (settings.ai_provider === 'claude') {
        // Call Claude API
        const response = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey,
            'anthropic-version': '2023-06-01'
          },
          body: JSON.stringify({
            model: model,
            max_tokens: 1024,
            system: `Kamu adalah Claudia Yang, konsultan AI perjalanan dan konten untuk keluarga Djojo yang akan trip ke Osaka, Jepang dari 29 Juni - 13 Juli 2026. 

Anggota keluarga: Janto (Super Admin, Business Coach/Content Creator), Yina, Pauline, Clement.

Kamu berbicara dalam Bahasa Indonesia dengan natural dan ramah. Saat ini kamu sedang berbicara dengan ${currentUser}.

KNOWLEDGE BASE:
${knowledgeContext || 'Belum ada knowledge base yang ditambahkan.'}

Tugasmu:
- Membantu dengan itinerary & rute harian
- Rekomendasi kuliner & budget meals
- Ide konten Reels Live & posting untuk channel Coach Janto
- Info transportasi, harga tiket, jam buka tempat wisata
- Reminder & alarm persiapan
- Rencana spontan dadakan

Jawab dengan spesifik, personal, dan action-oriented.`,
            messages: [
              ...conversationHistory,
              { role: 'user', content: currentInput }
            ]
          })
        });
        
        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error?.message || 'Claude API error');
        }
        
        const data = await response.json();
        aiResponse = data.content[0].text;
        
      } else {
        // Call OpenAI API
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: model,
            messages: [
              {
                role: 'system',
                content: `Kamu adalah Claudia Yang, konsultan AI perjalanan dan konten untuk keluarga Djojo yang akan trip ke Osaka, Jepang dari 29 Juni - 13 Juli 2026. 

Anggota keluarga: Janto (Super Admin, Business Coach/Content Creator), Yina, Pauline, Clement.

Kamu berbicara dalam Bahasa Indonesia dengan natural dan ramah. Saat ini kamu sedang berbicara dengan ${currentUser}.

KNOWLEDGE BASE:
${knowledgeContext || 'Belum ada knowledge base yang ditambahkan.'}

Tugasmu:
- Membantu dengan itinerary & rute harian
- Rekomendasi kuliner & budget meals
- Ide konten Reels Live & posting untuk channel Coach Janto
- Info transportasi, harga tiket, jam buka tempat wisata
- Reminder & alarm persiapan
- Rencana spontan dadakan

Jawab dengan spesifik, personal, dan action-oriented.`
              },
              ...conversationHistory,
              { role: 'user', content: currentInput }
            ],
            max_tokens: 1024,
            temperature: 0.7
          })
        });
        
        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error?.message || 'OpenAI API error');
        }
        
        const data = await response.json();
        aiResponse = data.choices[0].message.content;
      }
      
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        sender: 'Claudia Yang',
        text: aiResponse,
        timestamp: new Date(),
        isAI: true
      }]);
      
    } catch (error: any) {
      console.error('AI API Error:', error);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        sender: 'Claudia Yang',
        text: `❌ Maaf ${currentUser}, ada error saat menghubungi AI: ${error.message}\n\nSilakan cek API key di Admin Settings atau hubungi Super Admin.`,
        timestamp: new Date(),
        isAI: true
      }]);
    }
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
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                with Claudia Yang
                {apiConnected ? (
                  <span className="flex items-center gap-1 text-xs text-green-400">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    {aiProvider === 'claude' ? 'Claude' : 'OpenAI'} Connected
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-xs text-amber-400">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    API Not Connected
                  </span>
                )}
              </p>
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
          <div className="glass-card mx-4 mb-4 p-2 rounded-2xl flex justify-around">
            <Button 
              variant="ghost" 
              size="sm" 
              className={`flex-1 ${activeTab === 'chat' ? 'text-primary' : ''}`}
              onClick={() => setActiveTab('chat')}
            >
              💬 <span className="ml-1 hidden sm:inline">Chat</span>
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className={`flex-1 ${activeTab === 'docs' ? 'text-primary' : ''}`}
              onClick={() => setActiveTab('docs')}
            >
              📄 <span className="ml-1 hidden sm:inline">Docs</span>
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className={`flex-1 ${activeTab === 'expense' ? 'text-primary' : ''}`}
              onClick={() => setActiveTab('expense')}
            >
              💰 <span className="ml-1 hidden sm:inline">Expense</span>
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className={`flex-1 ${activeTab === 'souvenir' ? 'text-primary' : ''}`}
              onClick={() => setActiveTab('souvenir')}
            >
              🎁 <span className="ml-1 hidden sm:inline">Souvenir</span>
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className={`flex-1 ${activeTab === 'gallery' ? 'text-primary' : ''}`}
              onClick={() => setActiveTab('gallery')}
            >
              📸 <span className="ml-1 hidden sm:inline">Gallery</span>
            </Button>
            {currentUser === 'Janto' && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="flex-1"
                onClick={() => window.location.href = '/admin'}
              >
                ⚙️ <span className="ml-1 hidden sm:inline">Admin</span>
              </Button>
            )}
          </div>
        </div>
      </Layout>
    </>
  );
}