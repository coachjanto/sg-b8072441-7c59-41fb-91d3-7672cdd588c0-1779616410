import React, { useState } from "react";
import { Layout } from "@/components/Layout";
import { LoginScreen } from "@/components/LoginScreen";
import { SEO } from "@/components/SEO";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  const handleLogin = async (name: string, password: string) => {
    // TODO: Implement actual authentication with Supabase
    console.log("Login attempt:", name);
    setCurrentUser(name);
    setIsLoggedIn(true);
  };

  return (
    <>
      <SEO
        title="Japan2026 Trip - Osaka Adventure"
        description="Travel companion app for the Djojo family's 2026 Osaka trip with AI consultant Claudia Yang"
      />
      <Layout>
        {!isLoggedIn ? (
          <LoginScreen onLogin={handleLogin} />
        ) : (
          <div className="min-h-screen flex items-center justify-center p-4">
            <div className="glass-card p-8 rounded-2xl max-w-2xl w-full text-center space-y-6">
              <h1 className="text-3xl font-serif font-bold text-foreground">
                Konnichiwa, {currentUser}! 👋
              </h1>
              <p className="text-muted-foreground">
                Saya Claudia Yang, konsultan perjalanan & konten untuk Trip Osaka keluarga Djojo, 29 Juni – 13 Juli 2026.
              </p>
              <div className="text-left space-y-3 text-foreground/90">
                <p className="font-semibold text-primary">Yang bisa saya bantu:</p>
                <ul className="space-y-2 ml-4">
                  <li>🗺️ Itinerary & rute harian</li>
                  <li>🍜 Rekomendasi kuliner & budget meals</li>
                  <li>📸 Ide konten Reels Live & posting untuk channel Coach Janto</li>
                  <li>🚇 Info transportasi harga tiket jam buka tempat wisata</li>
                  <li>📄 Akses cepat semua dokumen trip</li>
                  <li>⏰ Reminder & alarm persiapan</li>
                  <li>💡 Rencana spontan dadakan</li>
                </ul>
              </div>
              <p className="text-foreground/80 italic">
                Tanya apa saja kapan saja. Saya selalu di sini! 🇯🇵
              </p>
            </div>
          </div>
        )}
      </Layout>
    </>
  );
}