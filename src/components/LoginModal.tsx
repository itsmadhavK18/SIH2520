import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Eye, EyeOff } from "lucide-react";

interface LoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const roles = [
  { id: "admin", name: "Administrator" },
  { id: "supervisor", name: "Supervisor" },
  { id: "employee", name: "Employee" },
  { id: "ippms_admin", name: "iPPMS Admin" },
];

export const LoginModal = ({ open, onOpenChange }: LoginModalProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      setError(null);
      await login(email, password);
      onOpenChange(false);

      const roleRouteMap: Record<string, string> = {
        admin: "admin",
        supervisor: "supervisor",
        employee: "employee",
        ippms_admin: "ippms",
      };

      const route = roleRouteMap[selectedRole] || "employee";

      if (route === "ippms") {
        navigate("/ippms");
      } else {
        navigate(`/dashboard/${route}`);
      }

    } catch (err) {
      setError("Login failed. Please check your credentials.");
      console.error(err);
    }
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
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-500" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-500" />
                )}
              </Button>
            </div>
          </div>

          {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

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
