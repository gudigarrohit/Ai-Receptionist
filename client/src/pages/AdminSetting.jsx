import { useState } from "react";
import { DashboardLayout } from "../components/DashboardLayout";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { Switch } from "../components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { useToast } from "../hooks/use-toast";
import { Building2, Bell, Shield, Globe } from "lucide-react";

export default function AdminSettings() {
  const { toast } = useToast();
  const [hospitalName, setHospitalName] = useState("Geeth HealthCare Hospital & Research");
  const [email, setEmail] = useState("info@geethcare.com");
  const [phone, setPhone] = useState("+91 98765 43210");
  const [address, setAddress] = useState("Geeth HealthCare Hospital in Navle, Shimoga, Karnataka");
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [smsNotifs, setSmsNotifs] = useState(false);
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  const handleSave = () => {
    toast({ title: "Settings Saved", description: "Your changes have been saved successfully." });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-3xl">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Settings</h1>
          <p className="text-sm text-muted-foreground">Manage hospital configuration</p>
        </div>

        <Tabs defaultValue="general">
          <TabsList className="mb-6">
            <TabsTrigger value="general" className="gap-1.5"><Building2 className="h-4 w-4" /> General</TabsTrigger>
            <TabsTrigger value="notifications" className="gap-1.5"><Bell className="h-4 w-4" /> Notifications</TabsTrigger>
            <TabsTrigger value="security" className="gap-1.5"><Shield className="h-4 w-4" /> Security</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <div className="rounded-xl border bg-card p-6 shadow-card space-y-5">
              <h2 className="font-display font-bold text-foreground flex items-center gap-2"><Globe className="h-4 w-4 text-primary" /> Hospital Information</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Hospital Name</Label>
                  <Input value={hospitalName} onChange={(e) => setHospitalName(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Contact Email</Label>
                  <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Phone Number</Label>
                  <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Address</Label>
                  <Input value={address} onChange={(e) => setAddress(e.target.value)} />
                </div>
              </div>
              <Button onClick={handleSave} className="gradient-hero border-0 text-primary-foreground">Save Changes</Button>
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <div className="rounded-xl border bg-card p-6 shadow-card space-y-5">
              <h2 className="font-display font-bold text-foreground flex items-center gap-2"><Bell className="h-4 w-4 text-primary" /> Notification Preferences</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <p className="font-medium text-foreground text-sm">Email Notifications</p>
                    <p className="text-xs text-muted-foreground">Receive appointment updates via email</p>
                  </div>
                  <Switch checked={emailNotifs} onCheckedChange={setEmailNotifs} />
                </div>
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <p className="font-medium text-foreground text-sm">SMS Notifications</p>
                    <p className="text-xs text-muted-foreground">Receive SMS alerts for urgent updates</p>
                  </div>
                  <Switch checked={smsNotifs} onCheckedChange={setSmsNotifs} />
                </div>
              </div>
              <Button onClick={handleSave} className="gradient-hero border-0 text-primary-foreground">Save Preferences</Button>
            </div>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <div className="rounded-xl border bg-card p-6 shadow-card space-y-5">
              <h2 className="font-display font-bold text-foreground flex items-center gap-2"><Shield className="h-4 w-4 text-primary" /> Security Settings</h2>
              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Current Password</Label>
                    <Input type="password" placeholder="••••••••" />
                  </div>
                  <div className="space-y-2">
                    <Label>New Password</Label>
                    <Input type="password" placeholder="••••••••" />
                  </div>
                </div>
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <p className="font-medium text-foreground text-sm">Maintenance Mode</p>
                    <p className="text-xs text-muted-foreground">Temporarily disable public access</p>
                  </div>
                  <Switch checked={maintenanceMode} onCheckedChange={setMaintenanceMode} />
                </div>
              </div>
              <Button onClick={handleSave} className="gradient-hero border-0 text-primary-foreground">Update Security</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
