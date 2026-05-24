import React, { useState } from "react";
import { Layout } from "@/components/Layout";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { 
  Key, 
  Lock, 
  DollarSign, 
  Users, 
  Image as ImageIcon, 
  Bell,
  Save,
  Upload,
  Eye,
  EyeOff,
  Shield,
  ArrowLeft,
  Edit,
  Trash2,
  UserPlus
} from "lucide-react";
import { useRouter } from "next/router";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Member {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
}

export default function AdminPage() {
  const router = useRouter();
  const [claudeApiKey, setClaudeApiKey] = useState("");
  const [showClaudeKey, setShowClaudeKey] = useState(false);
  const [googleDriveKey, setGoogleDriveKey] = useState("");
  const [showGoogleKey, setShowGoogleKey] = useState(false);
  const [securityPin, setSecurityPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [totalBudget, setTotalBudget] = useState("");
  const [perPaxBilling, setPerPaxBilling] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState<File | null>(null);
  const [backgroundPreview, setBackgroundPreview] = useState("");
  
  const [members, setMembers] = useState<Member[]>([
    { id: '1', name: 'Janto Djojo', email: 'coach.janto@gmail.com', role: 'Super Admin', isActive: true },
    { id: '2', name: 'Yina Djojo', email: 'yina@gmail.com', role: 'Member', isActive: true },
    { id: '3', name: 'Pauline Djojo', email: 'pauline@gmail.com', role: 'Member', isActive: true },
    { id: '4', name: 'Clement Djojo', email: 'clement@gmail.com', role: 'Member', isActive: true },
  ]);
  
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newMemberName, setNewMemberName] = useState("");
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [newMemberRole, setNewMemberRole] = useState("Member");

  const handleBackgroundUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBackgroundImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setBackgroundPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveApiKeys = () => {
    // TODO: Save to Supabase admin_settings
    alert("API Keys saved successfully!");
  };

  const handleSavePin = () => {
    if (securityPin !== confirmPin) {
      alert("PIN tidak sama!");
      return;
    }
    if (securityPin.length !== 6) {
      alert("PIN harus 6 digit!");
      return;
    }
    // TODO: Save to Supabase
    alert("PIN berhasil disimpan!");
  };

  const handleSaveBudget = () => {
    // TODO: Save to Supabase
    alert("Budget settings saved!");
  };

  const handleEditMember = (member: Member) => {
    setEditingMember({ ...member });
    setIsEditDialogOpen(true);
  };

  const handleUpdateMember = () => {
    if (!editingMember) return;
    
    setMembers(members.map(m => 
      m.id === editingMember.id ? editingMember : m
    ));
    
    // TODO: Update to Supabase
    setIsEditDialogOpen(false);
    alert("Member profile updated successfully!");
  };

  const handleAddMember = () => {
    if (!newMemberName || !newMemberEmail) {
      alert("Nama dan email harus diisi!");
      return;
    }

    const newMember: Member = {
      id: Date.now().toString(),
      name: newMemberName,
      email: newMemberEmail,
      role: newMemberRole,
      isActive: true
    };

    setMembers([...members, newMember]);
    
    // TODO: Save to Supabase
    setIsAddDialogOpen(false);
    setNewMemberName("");
    setNewMemberEmail("");
    setNewMemberRole("Member");
    alert("Member baru berhasil ditambahkan!");
  };

  const handleDeleteMember = (memberId: string) => {
    if (confirm("Yakin ingin menghapus member ini?")) {
      setMembers(members.filter(m => m.id !== memberId));
      // TODO: Delete from Supabase
      alert("Member berhasil dihapus!");
    }
  };

  const handleToggleActive = (memberId: string) => {
    setMembers(members.map(m => 
      m.id === memberId ? { ...m, isActive: !m.isActive } : m
    ));
    // TODO: Update Supabase
  };

  return (
    <>
      <SEO title="Admin Dashboard - Japan2026 Trip" />
      <Layout>
        <div className="min-h-screen p-4 max-w-6xl mx-auto pb-20">
          {/* Header */}
          <div className="glass-card p-6 rounded-2xl mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => router.push('/')}
                  className="glass-card-hover"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <div>
                  <h1 className="text-3xl font-serif font-bold text-primary">Super Admin Dashboard</h1>
                  <p className="text-muted-foreground">System Configuration & Management</p>
                </div>
              </div>
              <Badge variant="outline" className="bg-primary/20 text-primary border-primary">
                <Shield className="h-4 w-4 mr-1" />
                Super Admin
              </Badge>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="api-keys" className="space-y-6">
            <TabsList className="glass-card p-1 rounded-xl grid grid-cols-3 md:grid-cols-6 gap-1">
              <TabsTrigger value="api-keys" className="text-xs md:text-sm">
                <Key className="h-4 w-4 mr-1" /> API Keys
              </TabsTrigger>
              <TabsTrigger value="security" className="text-xs md:text-sm">
                <Lock className="h-4 w-4 mr-1" /> Security
              </TabsTrigger>
              <TabsTrigger value="budget" className="text-xs md:text-sm">
                <DollarSign className="h-4 w-4 mr-1" /> Budget
              </TabsTrigger>
              <TabsTrigger value="members" className="text-xs md:text-sm">
                <Users className="h-4 w-4 mr-1" /> Members
              </TabsTrigger>
              <TabsTrigger value="appearance" className="text-xs md:text-sm">
                <ImageIcon className="h-4 w-4 mr-1" /> Appearance
              </TabsTrigger>
              <TabsTrigger value="notifications" className="text-xs md:text-sm">
                <Bell className="h-4 w-4 mr-1" /> Notifications
              </TabsTrigger>
            </TabsList>

            {/* API Keys Tab */}
            <TabsContent value="api-keys">
              <Card className="glass-card border-border/50">
                <CardHeader>
                  <CardTitle className="text-primary">API Configuration</CardTitle>
                  <CardDescription>Manage external service API keys</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="claude-key">Claude API Key</Label>
                    <div className="relative">
                      <Input
                        id="claude-key"
                        type={showClaudeKey ? "text" : "password"}
                        value={claudeApiKey}
                        onChange={(e) => setClaudeApiKey(e.target.value)}
                        placeholder="sk-ant-..."
                        className="pr-10 bg-background/50"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0"
                        onClick={() => setShowClaudeKey(!showClaudeKey)}
                      >
                        {showClaudeKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Required for Claudia Yang AI consultant to function
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gdrive-key">Google Drive API Key</Label>
                    <div className="relative">
                      <Input
                        id="gdrive-key"
                        type={showGoogleKey ? "text" : "password"}
                        value={googleDriveKey}
                        onChange={(e) => setGoogleDriveKey(e.target.value)}
                        placeholder="AIza..."
                        className="pr-10 bg-background/50"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0"
                        onClick={() => setShowGoogleKey(!showGoogleKey)}
                      >
                        {showGoogleKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      For photo/document storage and gallery integration
                    </p>
                  </div>

                  <Button onClick={handleSaveApiKeys} className="w-full ripple-effect">
                    <Save className="h-4 w-4 mr-2" />
                    Save API Keys
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security">
              <Card className="glass-card border-border/50">
                <CardHeader>
                  <CardTitle className="text-primary">Security Settings</CardTitle>
                  <CardDescription>Set PIN for sensitive data protection</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="pin">Security PIN (6 digits)</Label>
                    <Input
                      id="pin"
                      type="password"
                      value={securityPin}
                      onChange={(e) => setSecurityPin(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      placeholder="******"
                      maxLength={6}
                      className="bg-background/50 font-mono text-lg tracking-widest"
                    />
                    <p className="text-xs text-muted-foreground">
                      This PIN will protect passport numbers, booking codes, and other sensitive data
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-pin">Confirm PIN</Label>
                    <Input
                      id="confirm-pin"
                      type="password"
                      value={confirmPin}
                      onChange={(e) => setConfirmPin(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      placeholder="******"
                      maxLength={6}
                      className="bg-background/50 font-mono text-lg tracking-widest"
                    />
                  </div>

                  <Button onClick={handleSavePin} className="w-full ripple-effect">
                    <Lock className="h-4 w-4 mr-2" />
                    Set Security PIN
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Budget Tab */}
            <TabsContent value="budget">
              <Card className="glass-card border-border/50">
                <CardHeader>
                  <CardTitle className="text-primary">Budget Configuration</CardTitle>
                  <CardDescription>Set total budget and billing preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="budget">Total Trip Budget (JPY)</Label>
                    <Input
                      id="budget"
                      type="number"
                      value={totalBudget}
                      onChange={(e) => setTotalBudget(e.target.value)}
                      placeholder="500000"
                      className="bg-background/50 font-mono"
                    />
                    <p className="text-xs text-muted-foreground">
                      Total planned budget in Japanese Yen
                    </p>
                  </div>

                  <div className="flex items-center justify-between glass-card p-4 rounded-xl">
                    <div className="space-y-0.5">
                      <Label htmlFor="per-pax">Per-Pax Billing Mode</Label>
                      <p className="text-sm text-muted-foreground">
                        Calculate individual expenses and generate billing per member
                      </p>
                    </div>
                    <Switch
                      id="per-pax"
                      checked={perPaxBilling}
                      onCheckedChange={setPerPaxBilling}
                    />
                  </div>

                  <Button onClick={handleSaveBudget} className="w-full ripple-effect">
                    <Save className="h-4 w-4 mr-2" />
                    Save Budget Settings
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Members Tab */}
            <TabsContent value="members">
              <Card className="glass-card border-border/50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-primary">Member Management</CardTitle>
                      <CardDescription>Manage family member profiles and roles</CardDescription>
                    </div>
                    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="glass-card-hover">
                          <UserPlus className="h-4 w-4 mr-2" />
                          Add Member
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="glass-card">
                        <DialogHeader>
                          <DialogTitle className="text-primary">Add New Member</DialogTitle>
                          <DialogDescription>
                            Add a new family member to the trip
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="new-name">Full Name</Label>
                            <Input
                              id="new-name"
                              value={newMemberName}
                              onChange={(e) => setNewMemberName(e.target.value)}
                              placeholder="Enter full name"
                              className="bg-background/50"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="new-email">Email Address</Label>
                            <Input
                              id="new-email"
                              type="email"
                              value={newMemberEmail}
                              onChange={(e) => setNewMemberEmail(e.target.value)}
                              placeholder="email@example.com"
                              className="bg-background/50"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="new-role">Role</Label>
                            <Select value={newMemberRole} onValueChange={setNewMemberRole}>
                              <SelectTrigger className="bg-background/50">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="glass-card">
                                <SelectItem value="Member">Member</SelectItem>
                                <SelectItem value="Super Admin">Super Admin</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button onClick={handleAddMember} className="ripple-effect">
                            Add Member
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {members.map((member) => (
                    <div key={member.id} className="glass-card p-4 rounded-xl space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-foreground">{member.name}</h3>
                            <Badge 
                              variant={member.role === 'Super Admin' ? 'default' : 'secondary'}
                              className={member.role === 'Super Admin' ? 'bg-primary/20 text-primary border-primary' : ''}
                            >
                              {member.role}
                            </Badge>
                            {!member.isActive && (
                              <Badge variant="outline" className="border-destructive text-destructive">
                                Inactive
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{member.email}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEditMember(member)}
                            className="glass-card-hover"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          {member.role !== 'Super Admin' && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteMember(member.id)}
                              className="glass-card-hover text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between pt-2 border-t border-border/50">
                        <span className="text-sm text-muted-foreground">Active Status</span>
                        <Switch
                          checked={member.isActive}
                          onCheckedChange={() => handleToggleActive(member.id)}
                          disabled={member.role === 'Super Admin'}
                        />
                      </div>
                    </div>
                  ))}

                  {/* Edit Member Dialog */}
                  <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                    <DialogContent className="glass-card">
                      <DialogHeader>
                        <DialogTitle className="text-primary">Edit Member Profile</DialogTitle>
                        <DialogDescription>
                          Update member details and permissions
                        </DialogDescription>
                      </DialogHeader>
                      {editingMember && (
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="edit-name">Full Name</Label>
                            <Input
                              id="edit-name"
                              value={editingMember.name}
                              onChange={(e) => setEditingMember({ ...editingMember, name: e.target.value })}
                              className="bg-background/50"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="edit-email">Email Address</Label>
                            <Input
                              id="edit-email"
                              type="email"
                              value={editingMember.email}
                              onChange={(e) => setEditingMember({ ...editingMember, email: e.target.value })}
                              className="bg-background/50"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="edit-role">Role</Label>
                            <Select 
                              value={editingMember.role} 
                              onValueChange={(value) => setEditingMember({ ...editingMember, role: value })}
                              disabled={editingMember.role === 'Super Admin'}
                            >
                              <SelectTrigger className="bg-background/50">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="glass-card">
                                <SelectItem value="Member">Member</SelectItem>
                                <SelectItem value="Super Admin">Super Admin</SelectItem>
                              </SelectContent>
                            </Select>
                            {editingMember.role === 'Super Admin' && (
                              <p className="text-xs text-muted-foreground">
                                Super Admin role cannot be changed
                              </p>
                            )}
                          </div>
                        </div>
                      )}
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleUpdateMember} className="ripple-effect">
                          <Save className="h-4 w-4 mr-2" />
                          Save Changes
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Appearance Tab */}
            <TabsContent value="appearance">
              <Card className="glass-card border-border/50">
                <CardHeader>
                  <CardTitle className="text-primary">Appearance Settings</CardTitle>
                  <CardDescription>Customize app background and branding</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="bg-upload">Background Image</Label>
                    <div className="flex gap-2">
                      <Input
                        id="bg-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleBackgroundUpload}
                        className="bg-background/50"
                      />
                      <Button variant="outline" size="icon" className="glass-card-hover">
                        <Upload className="h-4 w-4" />
                      </Button>
                    </div>
                    {backgroundPreview && (
                      <div className="mt-4 rounded-xl overflow-hidden border border-border/50">
                        <img 
                          src={backgroundPreview} 
                          alt="Background preview" 
                          className="w-full h-48 object-cover"
                        />
                      </div>
                    )}
                    <p className="text-xs text-muted-foreground">
                      Recommended: 1920x1080px or larger. Will display as overlay on gradient mesh.
                    </p>
                  </div>

                  <Button className="w-full ripple-effect">
                    <Save className="h-4 w-4 mr-2" />
                    Save Appearance
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications">
              <Card className="glass-card border-border/50">
                <CardHeader>
                  <CardTitle className="text-primary">Notification Preferences</CardTitle>
                  <CardDescription>Manage push notifications and alerts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12 text-muted-foreground">
                    <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Notification settings coming soon</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </Layout>
    </>
  );
}