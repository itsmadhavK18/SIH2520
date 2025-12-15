import { useState } from "react";
import { Globe, User, ChevronDown, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

interface HeaderProps {
  onLoginClick: () => void;
  currentUser?: { name: string; role: string } | null;
  onLogout?: () => void;
}

export const Header = ({ onLoginClick, currentUser, onLogout }: HeaderProps) => {
  console.log('Header rendered with currentUser:', currentUser);
  const [fontSize, setFontSize] = useState<"small" | "normal" | "large" | "xlarge">("normal");
  const [language, setLanguage] = useState<"en" | "hi">("en");

  const adjustFontSize = (size: "small" | "normal" | "large" | "xlarge") => {
    setFontSize(size);
    document.body.className = document.body.className.replace(/font-size-\w+/, "");
    document.body.classList.add(`font-size-${size}`);
  };

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "hi" : "en");
  };

  const menuItems = [
    { title: "Home", href: "/" },
    {
      title: "About Brahmaputra Board",
      items: ["Office Location", "Who's Who", "Organogram", "Contact Us", "Roll of Honour"],
    },
    {
      title: "Downloads",
      items: ["Logo", "Data Download"],
    },
    {
      title: "Publications",
      items: ["Project Reports", "Technical Publications & Media Warehouse", "Project News"],
    },
    { title: "Projects", href: "#" },
    { title: "Tender", href: "#" },
    { title: "Vacancies", href: "#" },
    { title: "Social Media", href: "#" },
    {
      title: "Citizen Corner",
      items: ["Project Portal", "Public Notice", "RTI Act", "Citizen Charter"],
    },
    { title: "Vedic Gallery", href: "#" },
  ];

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground py-1 px-4">
        <div className="container mx-auto flex justify-between items-center text-xs">
          <div className="flex gap-1">
            <button
              onClick={() => adjustFontSize("small")}
              className="px-2 py-0.5 hover:bg-primary-hover rounded"
            >
              A-
            </button>
            <button
              onClick={() => adjustFontSize("normal")}
              className="px-2 py-0.5 hover:bg-primary-hover rounded"
            >
              A
            </button>
            <button
              onClick={() => adjustFontSize("large")}
              className="px-2 py-0.5 hover:bg-primary-hover rounded"
            >
              A+
            </button>
            <button
              onClick={() => adjustFontSize("xlarge")}
              className="px-2 py-0.5 hover:bg-primary-hover rounded font-bold"
            >
              A+
            </button>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={toggleLanguage} className="flex items-center gap-1 hover:underline">
              <Globe size={14} />
              <span>{language === "en" ? "हिंदी" : "English"}</span>
            </button>
            <button className="px-3 py-1 bg-accent hover:bg-accent-hover rounded text-xs font-medium">
              SSO
            </button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto py-4 px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg"
              alt="Government of India Emblem"
              className="gov-emblem"
            />
            <div>
              <h1 className="text-2xl font-bold text-primary">Brahmaputra Board Portal</h1>
              <p className="text-sm text-muted-foreground">Digital Governance and Productivity Platform</p>
            </div>
          </div>
          {currentUser ? (
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-medium">{currentUser.name}</p>
                <p className="text-xs text-muted-foreground">{currentUser.role}</p>
              </div>
              <Button variant="outline" size="sm" onClick={onLogout}>
                <LogOut size={16} />
                Logout
              </Button>
            </div>
          ) : (
            <Button variant="gov-primary" onClick={onLoginClick}>
              <User size={18} />
              Login
            </Button>
          )}
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="bg-primary/5 border-t border-border">
        <div className="container mx-auto px-4">
          <NavigationMenu className="mx-auto">
            <NavigationMenuList>
              {menuItems.map((item) =>
                item.items ? (
                  <NavigationMenuItem key={item.title}>
                    <NavigationMenuTrigger className="bg-transparent">
                      {item.title}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4">
                        {item.items.map((subItem) => (
                          <li key={subItem}>
                            <NavigationMenuLink asChild>
                              <a
                                href="#"
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              >
                                <div className="text-sm font-medium leading-none">{subItem}</div>
                              </a>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ) : (
                  <NavigationMenuItem key={item.title}>
                    <NavigationMenuLink
                      href={item.href}
                      className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                    >
                      {item.title}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                )
              )}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </header>
  );
};
