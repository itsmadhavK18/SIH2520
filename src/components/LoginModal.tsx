import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

interface LoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const roles = [
  { id: "secretary", name: "Water Resources Secretary" },
  { id: "admin", name: "Chief Engineer (Admin)" },
  { id: "technical", name: "Chief Engineer (Technical)" },
  { id: "supervisor", name: "Superintending Engineer" },
  { id: "executive", name: "Executive Engineer" },
  { id: "assistant", name: "Assistant Engineer" },
  { id: "junior", name: "Junior Engineer" },
  { id: "contractor", name: "Contractor" },
  { id: "clerk", name: "Clerk / Office Assistant" },
  { id: "surveyor", name: "Surveyor" },
];

export const LoginModal = ({ open, onOpenChange }: LoginModalProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = () => {
    // Simulate login
    onOpenChange(false);
    
    // Map role to dashboard route
    const roleRouteMap: Record<string, string> = {
      admin: "admin",
      technical: "admin",
      secretary: "admin",
      supervisor: "supervisor",
      executive: "supervisor",
      contractor: "employee",
      assistant: "employee",
      junior: "employee",
      clerk: "employee",
      surveyor: "employee",
    };
    
    const route = roleRouteMap[selectedRole] || "employee";
    navigate(`/dashboard/${route}`);
    
    // Reset
    setTimeout(() => {
      setEmail("");
      setPassword("");
      setSelectedRole("");
    }, 300);
  };

  const handleSSOLogin = () => {
    // Simulate SSO login
    handleLogin();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">Login to iPPMS Portal</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div>
            <Label htmlFor="role">Select Your Role</Label>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger id="role">
                <SelectValue placeholder="Choose your role" />
              </SelectTrigger>
              <SelectContent>
                {roles.map((role) => (
                  <SelectItem key={role.id} value={role.id}>
                    {role.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button 
            variant="gov-primary" 
            onClick={handleLogin} 
            className="w-full"
            disabled={!selectedRole || !email || !password}
          >
            Login
          </Button>

          <div className="text-center">
            <Button variant="link" className="text-sm">
              Forgot password?
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or</span>
            </div>
          </div>

          <Button variant="gov-accent" className="w-full" onClick={handleSSOLogin}>
            Login with SSO
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
