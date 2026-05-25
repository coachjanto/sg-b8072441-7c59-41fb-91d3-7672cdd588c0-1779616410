import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface LoginScreenProps {
  onLogin: (username: string) => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [selectedUser, setSelectedUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const users = [
    { name: "Janto", email: "coach.janto@gmail.com" },
    { name: "Yina", email: "yina@gmail.com" },
    { name: "Pauline", email: "pauline@gmail.com" },
    { name: "Clement", email: "clement@gmail.com" },
  ];

  const handleLogin = () => {
    if (!selectedUser || !password) {
      setError("Nama dan password harus diisi!");
      return;
    }

    // Temporary validation - in production this should call Supabase
    const validPasswords: Record<string, string> = {
      "Janto": "1100110011",
      "Yina": "password123",
      "Pauline": "password123",
      "Clement": "password123",
    };

    if (password !== validPasswords[selectedUser]) {
      setError("Password salah!");
      return;
    }

    setError("");
    onLogin(selectedUser);
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <Card className="glass-card max-w-md w-full rounded-2xl border-border/50">
        <CardHeader className="text-center">
          <div className="mb-4 text-6xl">🇯🇵</div>
          <CardTitle className="text-3xl font-serif text-primary">Japan2026 Trip</CardTitle>
          <CardDescription className="text-base">Osaka Travel HQ with Claudia Yang</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="user">Select Your Name</Label>
            <Select value={selectedUser} onValueChange={setSelectedUser}>
              <SelectTrigger className="bg-background/50">
                <SelectValue placeholder="Pilih nama Anda" />
              </SelectTrigger>
              <SelectContent className="glass-card">
                {users.map((user) => (
                  <SelectItem key={user.name} value={user.name}>
                    {user.name} {user.name === "Janto" && "👑"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleLogin()}
              placeholder="Enter your password"
              className="bg-background/50"
            />
          </div>

          {error && (
            <div className="glass-card p-3 rounded-lg bg-destructive/10 border border-destructive/50">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          <Button
            onClick={handleLogin}
            className="w-full ripple-effect bg-primary hover:bg-primary/90 text-lg py-6"
            disabled={!selectedUser || !password}
          >
            Masuk ke Trip HQ 🚀
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}