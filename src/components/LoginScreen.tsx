import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plane } from "lucide-react";

interface LoginScreenProps {
  onLogin: (name: string, password: string) => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedUser && password) {
      onLogin(selectedUser, password);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-slide-in">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full glass-card mb-4">
            <Plane className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl font-serif font-bold text-foreground mb-2">
            Japan2026 Trip
          </h1>
          <p className="text-muted-foreground">
            Osaka Adventure · Keluarga Djojo
          </p>
        </div>

        {/* Login Form */}
        <div className="glass-card p-8 rounded-2xl space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="user-select" className="text-foreground">
                Pilih Nama
              </Label>
              <Select value={selectedUser} onValueChange={setSelectedUser}>
                <SelectTrigger 
                  id="user-select"
                  className="glass-card border-border h-12 text-base"
                >
                  <SelectValue placeholder="Pilih anggota keluarga" />
                </SelectTrigger>
                <SelectContent className="glass-card border-border">
                  <SelectItem value="Janto">Janto (Admin)</SelectItem>
                  <SelectItem value="Yina">Yina</SelectItem>
                  <SelectItem value="Pauline">Pauline</SelectItem>
                  <SelectItem value="Clement">Clement</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="glass-card border-border h-12 text-base"
                placeholder="Masukkan password"
              />
            </div>

            <Button
              type="submit"
              disabled={!selectedUser || !password}
              className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90 text-primary-foreground ripple-effect"
            >
              Masuk ke Trip HQ
            </Button>
          </form>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              29 Juni – 13 Juli 2026 🇯🇵
            </p>
          </div>
        </div>

        {/* Footer decoration */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 text-xs text-muted-foreground">
            <span>Powered by Claudia Yang</span>
            <span className="text-accent">✦</span>
            <span>AI Travel Consultant</span>
          </div>
        </div>
      </div>
    </div>
  );
}