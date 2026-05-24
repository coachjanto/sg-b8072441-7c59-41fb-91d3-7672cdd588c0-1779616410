import React, { useState } from "react";
import { Layout } from "@/components/Layout";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Key, Lock, Users, DollarSign, Image, Bell } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AdminPage() {
  const { toast } = useToast();
  const [claudeApiKey, setClaudeApiKey] = useState("");
  const [googleDriveKey, setGoogleDriveKey] = useState("");
  const [sensitiveDataPin, setSensitiveDataPin] = useState("");
  const [perPaxBilling, setPerPaxBilling] = useState(false);
  const [totalBudget, setTotalBudget] = useState("");
  const [backgroundImage, setBackgroundImage] = useState<File | null>(null);

  // Mock current user - replace with actual auth
  const currentUser = { username: "janto", email: "coach.janto@gmail.com", isSuperAdmin: true };

  if (!currentUser.isSuperAdmin) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="glass-card p-8 rounded-2xl max-w-md text-center">
            <Lock className="h-16 w-16 mx-auto mb-4 text-destructive" />
            <h2 className="text-2xl font-serif font-bold mb-2">Access Denied</h2>
            <p className="text-muted-foreground">
              Only Super Admin (coach.janto@gmail.com) can access this page.
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  const handleSaveApiKeys = () => {
    // TODO: Save to Supabase admin_settings
    toast({
      title: "✅ API Keys Saved",
      description: "Configuration has been updated successfully.",
    });
  };

  const handleSavePin = () => {
    // TODO: Hash and save PIN to Supabase
    toast({
      title: "✅ PIN Updated",
      description: "Sensitive data PIN has been set.",
    });
  };

  const handleSaveBudget = () => {
    // TODO: Save budget settings to Supabase
    toast({
      title: "✅ Budget Configuration Saved",
      description: `Total budget set to ¥${totalBudget}`,
    });
  };

  const handleUploadBackground = () => {
    if (!backgroundImage) return;
    // TODO: Upload to Supabase Storage
    toast({
      title: "✅ Background Uploaded",
      description: "New background image has been set.",
    });
  };

  return (
    <>
      <SEO title="Admin Dashboard - Japan2026 Trip" />
      <Layout>
        <div className="container max-w-6xl mx-auto p-6 space-y-6">
          {/* Header */}
          <div className="glass-card p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-2">
              <Settings className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-serif font-bold text-primary">
                Super Admin Dashboard
              </h1>
            </div>
            <p className="text-muted-foreground">
              Logged in as: <span className="text-primary font-semibold">{currentUser.email}</span>
            </p>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="api" className="w-full">
            <TabsList className="glass-card w-full justify-start overflow-x-auto">
              <TabsTrigger value="api">🔑 API Keys</TabsTrigger>
              <TabsTrigger value="security">🔒 Security</TabsTrigger>
              <TabsTrigger value="budget">💰 Budget</TabsTrigger>
              <TabsTrigger value="members">👥 Members</TabsTrigger>
              <TabsTrigger value="appearance">🎨 Appearance</TabsTrigger>
              <TabsTrigger value="notifications">🔔 Notifications</TabsTrigger>
            </TabsList>

            {/* API Keys Tab */}
            <TabsContent value="api" className="space-y-4">
              <Card className="glass-card border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Key className="h-5 w-5" />
                    API Configuration
                  </CardTitle>
                  <CardDescription>
                    Configure external service API keys for Claude AI and Google Drive integration.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="claude-api">Claude API Key</Label>
                    <Input
                      id="claude-api"
                      type="password"
                      placeholder="sk-ant-..."
                      value={claudeApiKey}
                      onChange={(e) => setClaudeApiKey(e.target.value)}
                      className="font-mono"
                    />
                    <p className="text-xs text-muted-foreground">
                      Get your API key from <a href="https://console.anthropic.com" target="_blank" className="text-primary hover:underline">console.anthropic.com</a>
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="google-drive-api">Google Drive API Key</Label>
                    <Input
                      id="google-drive-api"
                      type="password"
                      placeholder="AIza..."
                      value={googleDriveKey}
                      onChange={(e) => setGoogleDriveKey(e.target.value)}
                      className="font-mono"
                    />
                    <p className="text-xs text-muted-foreground">
                      Enable Drive API in Google Cloud Console and create credentials
                    </p>
                  </div>

                  <Button onClick={handleSaveApiKeys} className="ripple-effect">
                    Save API Keys
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security" className="space-y-4">
              <Card className="glass-card border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="h-5 w-5" />
                    Sensitive Data Protection
                  </CardTitle>
                  <CardDescription>
                    Set a PIN to protect passport numbers, booking codes, and other sensitive information.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="pin">6-Digit PIN</Label>
                    <Input
                      id="pin"
                      type="password"
                      maxLength={6}
                      placeholder="••••••"
                      value={sensitiveDataPin}
                      onChange={(e) => setSensitiveDataPin(e.target.value.replace(/\D/g, ''))}
                      className="font-mono text-center text-2xl tracking-widest"
                    />
                    <p className="text-xs text-muted-foreground">
                      This PIN will be required to view passport numbers, booking codes, and other sensitive trip data.
                    </p>
                  </div>

                  <Button onClick={handleSavePin} className="ripple-effect" disabled={sensitiveDataPin.length !== 6}>
                    Set PIN
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Budget Tab */}
            <TabsContent value="budget" className="space-y-4">
              <Card className="glass-card border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Budget Configuration
                  </CardTitle>
                  <CardDescription>
                    Set total trip budget and enable per-person billing calculations.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="total-budget">Total Budget (JPY)</Label>
                    <Input
                      id="total-budget"
                      type="number"
                      placeholder="5000000"
                      value={totalBudget}
                      onChange={(e) => setTotalBudget(e.target.value)}
                      className="font-mono"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 glass-card rounded-lg">
                    <div>
                      <Label htmlFor="per-pax-billing" className="font-semibold">
                        Enable Per-Pax Billing
                      </Label>
                      <p className="text-xs text-muted-foreground mt-1">
                        Calculate and split expenses equally among all trip members
                      </p>
                    </div>
                    <Switch
                      id="per-pax-billing"
                      checked={perPaxBilling}
                      onCheckedChange={setPerPaxBilling}
                    />
                  </div>

                  <Button onClick={handleSaveBudget} className="ripple-effect">
                    Save Budget Settings
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Members Tab */}
            <TabsContent value="members" className="space-y-4">
              <Card className="glass-card border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Member Management
                  </CardTitle>
                  <CardDescription>
                    Manage trip members, roles, and permissions.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { name: "Janto", email: "coach.janto@gmail.com", role: "Super Admin" },
                      { name: "Yina", email: "yina.djojo@gmail.com", role: "Member" },
                      { name: "Pauline", email: "pauline.djojo@gmail.com", role: "Member" },
                      { name: "Clement", email: "clement.djojo@gmail.com", role: "Member" },
                    ].map((member) => (
                      <div key={member.email} className="flex items-center justify-between p-4 glass-card rounded-lg">
                        <div>
                          <p className="font-semibold">{member.name}</p>
                          <p className="text-sm text-muted-foreground">{member.email}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          member.role === "Super Admin" 
                            ? "bg-primary/20 text-primary" 
                            : "bg-muted text-muted-foreground"
                        }`}>
                          {member.role}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Appearance Tab */}
            <TabsContent value="appearance" className="space-y-4">
              <Card className="glass-card border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Image className="h-5 w-5" />
                    Appearance Settings
                  </CardTitle>
                  <CardDescription>
                    Customize the app's visual appearance and background.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="background-upload">Background Image</Label>
                    <Input
                      id="background-upload"
                      type="file"
                      accept="image/*"
                      onChange={(e) => setBackgroundImage(e.target.files?.[0] || null)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Upload a custom background image for the app (recommended: 1920x1080px)
                    </p>
                  </div>

                  <Button onClick={handleUploadBackground} className="ripple-effect" disabled={!backgroundImage}>
                    Upload Background
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications" className="space-y-4">
              <Card className="glass-card border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Notification Settings
                  </CardTitle>
                  <CardDescription>
                    Configure push notifications and reminder preferences.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Notification settings will be available in future updates.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </Layout>
    </>
  );
}