import React, { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { LoginScreen } from "@/components/LoginScreen";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Send, Menu, Paperclip, MessageCircle, FileText, Coins, Gift, Image, Settings, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/router";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Message {
  id: string;
  sender: string;
  text: string;
  timestamp: Date;
  isAI: boolean;
}

export default function Home() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isFirstLogin, setIsFirstLogin] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [activeTab, setActiveTab] = useState("chat");
  const [apiConnected, setApiConnected] = useState(false);
  const [aiProvider, setAiProvider] = useState<"claude" | "openai">("claude");

  // Load login state from localStorage on mount
  useEffect(() => {
    // Only run on client-side
    if (typeof window === 'undefined') return;
    
    const savedLoginState = localStorage.getItem('user_session');
    if (savedLoginState) {
      const session = JSON.parse(savedLoginState);
      setCurrentUser(session.username);
      setIsLoggedIn(true);
      setIsFirstLogin(false);
    }
  }, []);

  // Check API connection status on mount and when returning from admin
  useEffect(() => {
    if (!isLoggedIn || typeof window === 'undefined') return;
    
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
  }, [isLoggedIn]);

  const handleLogin = (username: string) => {
    setCurrentUser(username);
    setIsLoggedIn(true);
    
    // Save login state to localStorage (client-side only)
    if (typeof window !== 'undefined') {
      localStorage.setItem('user_session', JSON.stringify({ username }));
    }
    
    // Check if first time login
    if (typeof window !== 'undefined') {
      const hasLoggedBefore = localStorage.getItem(`${username}_has_logged_before`);
      setIsFirstLogin(!hasLoggedBefore);
      
      if (!hasLoggedBefore) {
        localStorage.setItem(`${username}_has_logged_before`, 'true');
      }
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
    
    // Call backend API route to proxy AI request
    try {
      const savedSettings = localStorage.getItem('admin_settings');
      if (!savedSettings) {
        throw new Error('Settings not found');
      }
      
      const settings = JSON.parse(savedSettings);
      const apiKey = settings.ai_provider === 'openai' 
        ? settings.openai_api_key 
        : settings.claude_api_key;
      const model = settings.ai_model || 'claude-3-5-sonnet-20240620';
      
      // CRITICAL FIX: Strip display text from model name
      // Model names can have labels like "Claude 3 Haiku (Fast & Affordable)"
      // We need to extract ONLY the actual model ID
      const rawModel = settings.ai_model || 'claude-3-5-sonnet-20240620';
      
      // Strip everything after and including the first space or parenthesis
      // "Claude 3 Haiku (Fast & Affordable)" → "claude-3-haiku-20240307"
      // But our values should already be clean, so this is just a safety check
      const cleanModel = rawModel.split(' ')[0].split('(')[0].trim();
      
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
      
      // Call backend API route
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: currentInput,
          provider: settings.ai_provider || 'claude',
          apiKey: apiKey,
          model: cleanModel, // Use cleaned model ID
          currentUser: currentUser,
          knowledgeContext: knowledgeContext,
          conversationHistory: conversationHistory
        })
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'API error');
      }
      
      const data = await response.json();
      
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        sender: 'Claudia Yang',
        text: data.response,
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
        {/* Chat Container - Full width flex container */}
        <div className="flex-1 flex flex-col bg-background/50 backdrop-blur-sm w-full">
          {/* Messages Area - Full width but max-w inside */}
          <ScrollArea className="flex-1 w-full">
            <div className="py-6 space-y-6 max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "flex gap-3 animate-in fade-in-50 slide-in-from-bottom-3",
                    msg.isAI ? "justify-start" : "justify-end"
                  )}
                >
                  {msg.isAI && (
                    <Avatar className="h-8 w-8 border-2 border-primary/20 shrink-0">
                      <AvatarImage src="/20240410_120945_1_.jpg" />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        CY
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={cn(
                      "rounded-2xl px-4 py-3 max-w-[85%] backdrop-blur-md",
                      msg.isAI
                        ? "bg-card/80 border border-border/50 text-foreground shadow-lg"
                        : "bg-primary/90 text-primary-foreground shadow-lg"
                    )}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium opacity-70">
                        {msg.sender}
                      </span>
                      <span className="text-xs opacity-50">
                        {msg.timestamp.toLocaleTimeString("id-ID", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                      {msg.text}
                    </p>
                  </div>
                  {msg.isAI && (
                    <Avatar className="h-8 w-8 border-2 border-primary/20 shrink-0">
                      <AvatarFallback className="bg-primary/20 text-primary font-semibold">
                        {currentUser?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="border-t border-border/50 bg-background/80 backdrop-blur-md px-4 md:px-6 py-4 w-full shrink-0">
            <div className="flex gap-3 items-end max-w-4xl mx-auto">
              <Button
                size="icon"
                variant="ghost"
                className="shrink-0 h-10 w-10 rounded-full hover:bg-primary/10 hover:text-primary"
              >
                <Paperclip className="h-5 w-5" />
              </Button>
              <Textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder="Tanya Claudia..."
                className="min-h-[44px] max-h-32 resize-none bg-muted/50 border-border/50 backdrop-blur-sm focus:bg-muted/80 transition-colors"
                disabled={false}
              />
              <Button
                onClick={handleSendMessage}
                disabled={false || !inputMessage.trim()}
                size="icon"
                className="shrink-0 h-10 w-10 rounded-full bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20"
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Navigation - Full width with contained max-w for items */}
        <nav className="sticky bottom-0 left-0 right-0 z-50 border-t border-border/50 bg-background/95 backdrop-blur-xl w-full shrink-0 pb-safe">
          <div className="px-2 sm:px-4 py-3 max-w-4xl mx-auto">
            <div className="flex items-center justify-around gap-1 sm:gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActiveTab("chat")}
                className={cn(
                  "flex-1 gap-1 sm:gap-2 transition-colors flex-col sm:flex-row h-14 sm:h-9",
                  activeTab === "chat"
                    ? "bg-primary/10 text-primary hover:bg-primary/20"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <MessageCircle className="h-5 w-5 sm:h-4 sm:w-4" />
                <span className="text-[10px] sm:text-xs font-medium">Chat</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActiveTab("docs")}
                className={cn(
                  "flex-1 gap-1 sm:gap-2 transition-colors flex-col sm:flex-row h-14 sm:h-9",
                  activeTab === "docs"
                    ? "bg-primary/10 text-primary hover:bg-primary/20"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <FileText className="h-5 w-5 sm:h-4 sm:w-4" />
                <span className="text-[10px] sm:text-xs font-medium">Docs</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActiveTab("expense")}
                className={cn(
                  "flex-1 gap-1 sm:gap-2 transition-colors flex-col sm:flex-row h-14 sm:h-9",
                  activeTab === "expense"
                    ? "bg-primary/10 text-primary hover:bg-primary/20"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Coins className="h-5 w-5 sm:h-4 sm:w-4" />
                <span className="text-[10px] sm:text-xs font-medium">Expense</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActiveTab("souvenir")}
                className={cn(
                  "flex-1 gap-1 sm:gap-2 transition-colors flex-col sm:flex-row h-14 sm:h-9",
                  activeTab === "souvenir"
                    ? "bg-primary/10 text-primary hover:bg-primary/20"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Gift className="h-5 w-5 sm:h-4 sm:w-4" />
                <span className="text-[10px] sm:text-xs font-medium">Souvenir</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActiveTab("gallery")}
                className={cn(
                  "flex-1 gap-1 sm:gap-2 transition-colors flex-col sm:flex-row h-14 sm:h-9",
                  activeTab === "gallery"
                    ? "bg-primary/10 text-primary hover:bg-primary/20"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Image className="h-5 w-5 sm:h-4 sm:w-4" />
                <span className="text-[10px] sm:text-xs font-medium">Gallery</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push("/admin")}
                className="flex-1 gap-1 sm:gap-2 transition-colors flex-col sm:flex-row h-14 sm:h-9 text-muted-foreground hover:text-foreground"
              >
                <Settings className="h-5 w-5 sm:h-4 sm:w-4" />
                <span className="text-[10px] sm:text-xs font-medium">Admin</span>
              </Button>
            </div>
          </div>
        </nav>
      </Layout>
    </>
  );
}