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
  UserPlus,
  BookOpen,
  Plus,
  FileText,
  Paperclip,
  X
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

interface KnowledgeEntry {
  id: string;
  title: string;
  content: string;
  category: string;
  type: 'text' | 'file';
  fileName?: string;
  fileUrl?: string;
  createdAt: Date;
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

  // Knowledge Base states
  const [knowledgeEntries, setKnowledgeEntries] = useState<KnowledgeEntry[]>([
    {
      id: '1',
      title: 'Trip Dates & Overview',
      content: 'Trip Osaka 29 Juni - 13 Juli 2026. Family: Janto (Coach/Content Creator), Yina, Pauline, Clement. Focus: kuliner, content creation untuk channel Coach Janto.',
      category: 'Trip Info',
      type: 'text',
      createdAt: new Date(),
    },
  ]);
  const [isAddKnowledgeOpen, setIsAddKnowledgeOpen] = useState(false);
  const [newKnowledgeTitle, setNewKnowledgeTitle] = useState("");
  const [newKnowledgeContent, setNewKnowledgeContent] = useState("");
  const [newKnowledgeCategory, setNewKnowledgeCategory] = useState("Trip Info");
  const [knowledgeFile, setKnowledgeFile] = useState<File | null>(null);
  const [editingKnowledge, setEditingKnowledge] = useState<KnowledgeEntry | null>(null);
  const [isEditKnowledgeOpen, setIsEditKnowledgeOpen] = useState(false);

  const knowledgeCategories = [
    "Trip Info",
    "Itinerary",
    "Budget & Finance",
    "Content Strategy",
    "Travel Tips",
    "Restaurant List",
    "Transportation",
    "Accommodation",
    "Emergency Info",
    "Other"
  ];

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

  // Knowledge Base handlers
  const handleAddKnowledgeText = () => {
    if (!newKnowledgeTitle || !newKnowledgeContent) {
      alert("Judul dan konten harus diisi!");
      return;
    }

    const newEntry: KnowledgeEntry = {
      id: Date.now().toString(),
      title: newKnowledgeTitle,
      content: newKnowledgeContent,
      category: newKnowledgeCategory,
      type: 'text',
      createdAt: new Date(),
    };

    setKnowledgeEntries([newEntry, ...knowledgeEntries]);
    
    // TODO: Save to Supabase
    setIsAddKnowledgeOpen(false);
    setNewKnowledgeTitle("");
    setNewKnowledgeContent("");
    setNewKnowledgeCategory("Trip Info");
    alert("Knowledge base entry berhasil ditambahkan!");
  };

  const handleUploadKnowledgeFile = () => {
    if (!knowledgeFile || !newKnowledgeTitle) {
      alert("File dan judul harus diisi!");
      return;
    }

    const newEntry: KnowledgeEntry = {
      id: Date.now().toString(),
      title: newKnowledgeTitle,
      content: `File: ${knowledgeFile.name}`,
      category: newKnowledgeCategory,
      type: 'file',
      fileName: knowledgeFile.name,
      fileUrl: URL.createObjectURL(knowledgeFile),
      createdAt: new Date(),
    };

    setKnowledgeEntries([newEntry, ...knowledgeEntries]);
    
    // TODO: Upload to Supabase Storage and save reference
    setIsAddKnowledgeOpen(false);
    setKnowledgeFile(null);
    setNewKnowledgeTitle("");
    setNewKnowledgeCategory("Trip Info");
    alert("File berhasil diupload ke knowledge base!");
  };

  const handleEditKnowledge = (entry: KnowledgeEntry) => {
    setEditingKnowledge({ ...entry });
    setIsEditKnowledgeOpen(true);
  };

  const handleUpdateKnowledge = () => {
    if (!editingKnowledge) return;

    setKnowledgeEntries(knowledgeEntries.map(e =>
      e.id === editingKnowledge.id ? editingKnowledge : e
    ));

    // TODO: Update Supabase
    setIsEditKnowledgeOpen(false);
    alert("Knowledge entry berhasil diupdate!");
  };

  const handleDeleteKnowledge = (entryId: string) => {
    if (confirm("Yakin ingin menghapus entry ini dari knowledge base?")) {
      setKnowledgeEntries(knowledgeEntries.filter(e => e.id !== entryId));
      // TODO: Delete from Supabase
      alert("Entry berhasil dihapus!");
    }
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
            <TabsList className="glass-card p-1 rounded-xl grid grid-cols-3 md:grid-cols-7 gap-1">
              <TabsTrigger value="api-keys" className="text-xs md:text-sm">
                <Key className="h-4 w-4 mr-1" /> API
              </TabsTrigger>
              <TabsTrigger value="knowledge" className="text-xs md:text-sm">
                <BookOpen className="h-4 w-4 mr-1" /> Knowledge
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
                <ImageIcon className="h-4 w-4 mr-1" /> Style
              </TabsTrigger>
              <TabsTrigger value="notifications" className="text-xs md:text-sm">
                <Bell className="h-4 w-4 mr-1" /> Notif
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

            {/* Knowledge Base Tab */}
            <TabsContent value="knowledge">
              <Card className="glass-card border-border/50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-primary">AI Knowledge Base</CardTitle>
                      <CardDescription>
                        Add context for Claudia Yang - text prompts or uploaded documents
                      </CardDescription>
                    </div>
                    <Dialog open={isAddKnowledgeOpen} onOpenChange={setIsAddKnowledgeOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="glass-card-hover">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Entry
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="glass-card max-w-2xl">
                        <DialogHeader>
                          <DialogTitle className="text-primary">Add to Knowledge Base</DialogTitle>
                          <DialogDescription>
                            Add text or upload files for Claudia Yang's context
                          </DialogDescription>
                        </DialogHeader>
                        <Tabs defaultValue="text" className="mt-4">
                          <TabsList className="grid w-full grid-cols-2 glass-card">
                            <TabsTrigger value="text">
                              <FileText className="h-4 w-4 mr-2" />
                              Text Entry
                            </TabsTrigger>
                            <TabsTrigger value="file">
                              <Paperclip className="h-4 w-4 mr-2" />
                              Upload File
                            </TabsTrigger>
                          </TabsList>
                          
                          <TabsContent value="text" className="space-y-4 mt-4">
                            <div className="space-y-2">
                              <Label htmlFor="kb-title">Title</Label>
                              <Input
                                id="kb-title"
                                value={newKnowledgeTitle}
                                onChange={(e) => setNewKnowledgeTitle(e.target.value)}
                                placeholder="e.g., Restaurant recommendations in Dotonbori"
                                className="bg-background/50"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="kb-category">Category</Label>
                              <Select value={newKnowledgeCategory} onValueChange={setNewKnowledgeCategory}>
                                <SelectTrigger className="bg-background/50">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="glass-card">
                                  {knowledgeCategories.map(cat => (
                                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="kb-content">Content</Label>
                              <Textarea
                                id="kb-content"
                                value={newKnowledgeContent}
                                onChange={(e) => setNewKnowledgeContent(e.target.value)}
                                placeholder="Enter detailed information that Claudia Yang should remember..."
                                rows={8}
                                className="bg-background/50"
                              />
                            </div>
                            <Button onClick={handleAddKnowledgeText} className="w-full ripple-effect">
                              <Save className="h-4 w-4 mr-2" />
                              Add to Knowledge Base
                            </Button>
                          </TabsContent>
                          
                          <TabsContent value="file" className="space-y-4 mt-4">
                            <div className="space-y-2">
                              <Label htmlFor="kb-file-title">Title</Label>
                              <Input
                                id="kb-file-title"
                                value={newKnowledgeTitle}
                                onChange={(e) => setNewKnowledgeTitle(e.target.value)}
                                placeholder="e.g., Flight itinerary document"
                                className="bg-background/50"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="kb-file-category">Category</Label>
                              <Select value={newKnowledgeCategory} onValueChange={setNewKnowledgeCategory}>
                                <SelectTrigger className="bg-background/50">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="glass-card">
                                  {knowledgeCategories.map(cat => (
                                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="kb-file">Upload File</Label>
                              <Input
                                id="kb-file"
                                type="file"
                                accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                                onChange={(e) => setKnowledgeFile(e.target.files?.[0] || null)}
                                className="bg-background/50"
                              />
                              <p className="text-xs text-muted-foreground">
                                Supported: PDF, DOC, DOCX, TXT, JPG, PNG
                              </p>
                            </div>
                            {knowledgeFile && (
                              <div className="glass-card p-3 rounded-lg flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <Paperclip className="h-4 w-4 text-primary" />
                                  <span className="text-sm">{knowledgeFile.name}</span>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => setKnowledgeFile(null)}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            )}
                            <Button onClick={handleUploadKnowledgeFile} className="w-full ripple-effect">
                              <Upload className="h-4 w-4 mr-2" />
                              Upload to Knowledge Base
                            </Button>
                          </TabsContent>
                        </Tabs>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {knowledgeEntries.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No knowledge base entries yet</p>
                      <p className="text-sm">Add context to help Claudia Yang provide better assistance</p>
                    </div>
                  ) : (
                    knowledgeEntries.map((entry) => (
                      <div key={entry.id} className="glass-card p-4 rounded-xl space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              {entry.type === 'text' ? (
                                <FileText className="h-4 w-4 text-secondary" />
                              ) : (
                                <Paperclip className="h-4 w-4 text-accent" />
                              )}
                              <h3 className="font-semibold text-foreground">{entry.title}</h3>
                              <Badge variant="secondary" className="text-xs">
                                {entry.category}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {entry.type === 'text' ? entry.content : `File: ${entry.fileName}`}
                            </p>
                            <p className="text-xs text-muted-foreground mt-2">
                              Added {entry.createdAt.toLocaleDateString('id-ID', { 
                                day: 'numeric', 
                                month: 'short', 
                                year: 'numeric' 
                              })}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            {entry.type === 'text' && (
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleEditKnowledge(entry)}
                                className="glass-card-hover"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteKnowledge(entry.id)}
                              className="glass-card-hover text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}

                  {/* Edit Knowledge Dialog */}
                  <Dialog open={isEditKnowledgeOpen} onOpenChange={setIsEditKnowledgeOpen}>
                    <DialogContent className="glass-card max-w-2xl">
                      <DialogHeader>
                        <DialogTitle className="text-primary">Edit Knowledge Entry</DialogTitle>
                        <DialogDescription>
                          Update the content of this knowledge base entry
                        </DialogDescription>
                      </DialogHeader>
                      {editingKnowledge && (
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="edit-kb-title">Title</Label>
                            <Input
                              id="edit-kb-title"
                              value={editingKnowledge.title}
                              onChange={(e) => setEditingKnowledge({ ...editingKnowledge, title: e.target.value })}
                              className="bg-background/50"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="edit-kb-category">Category</Label>
                            <Select 
                              value={editingKnowledge.category} 
                              onValueChange={(value) => setEditingKnowledge({ ...editingKnowledge, category: value })}
                            >
                              <SelectTrigger className="bg-background/50">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="glass-card">
                                {knowledgeCategories.map(cat => (
                                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="edit-kb-content">Content</Label>
                            <Textarea
                              id="edit-kb-content"
                              value={editingKnowledge.content}
                              onChange={(e) => setEditingKnowledge({ ...editingKnowledge, content: e.target.value })}
                              rows={8}
                              className="bg-background/50"
                            />
                          </div>
                        </div>
                      )}
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsEditKnowledgeOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleUpdateKnowledge} className="ripple-effect">
                          <Save className="h-4 w-4 mr-2" />
                          Save Changes
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security Tab - Keep existing content */}
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

            {/* Other tabs remain the same - Budget, Members, Appearance, Notifications */}
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

            {/* Members Tab - Already has full implementation */}
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