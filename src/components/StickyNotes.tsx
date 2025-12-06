import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const activities = [
  { id: 1, title: "iPPMS Dashboard", desc: "Integrated Performance & Project Management System - Complete digital office solution", color: "bg-blue-600", icon: "⚡", link: "/ippms" },
  { id: 2, title: "Program Roadmapping", desc: "Long-term program planning and stakeholder alignment", color: "bg-blue-500", icon: "🗺️", link: "/project-collaboration" },
  { id: 3, title: "DPR Preparation", desc: "Detailed Project Reports for infrastructure development", color: "bg-green-500", icon: "📋", link: "/expense-management" },
  { id: 4, title: "Field Monitoring", desc: "Real-time project execution and quality assessment", color: "bg-purple-500", icon: "📊", link: "/kpi-dashboard" },
  { id: 5, title: "Performance Tracking", desc: "KPI-based evaluation and productivity measurement", color: "bg-orange-500", icon: "📈", link: "/dashboard" },
];

const utilities = [
  { id: 1, title: "RTI Portal", desc: "Right to Information and transparency access", color: "bg-red-500", icon: "🔓", link: "/rti-portal" },
  { id: 2, title: "Query Management", desc: "Ticket system for issues and appeals", color: "bg-teal-500", icon: "🎫", link: "/ticket-management" },
  { id: 3, title: "Expense Tracker", desc: "Project budget and expenditure monitoring", color: "bg-cyan-500", icon: "💰", link: "/expense-management" },
  { id: 4, title: "Collaboration Hub", desc: "Team communication and project coordination", color: "bg-pink-500", icon: "🤝", link: "/project-collaboration" },
];

export const StickyNotes = () => {
  const [activeActivityIndex, setActiveActivityIndex] = useState(0);
  const [activeUtilityIndex, setActiveUtilityIndex] = useState(0);

  // Rotate Activities independently
  useEffect(() => {
    const activityInterval = setInterval(() => {
      setActiveActivityIndex((prev) => (prev + 1) % activities.length);
    }, 4000);
    return () => clearInterval(activityInterval);
  }, []);

  // Rotate Utilities independently
  useEffect(() => {
    const utilityInterval = setInterval(() => {
      setActiveUtilityIndex((prev) => (prev + 1) % utilities.length);
    }, 4500);
    return () => clearInterval(utilityInterval);
  }, []);

  const NoteSection = ({ 
    title, 
    items, 
    activeIndex, 
    onPrev, 
    onNext 
  }: { 
    title: string; 
    items: typeof activities; 
    activeIndex: number; 
    onPrev: () => void; 
    onNext: () => void;
  }) => {
    const currentItem = items[activeIndex];
    
    return (
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-primary flex items-center gap-2">
          <span className="text-3xl">{title === "📌 Activities" ? "🏗️" : "⚡"}</span>
          {title.replace(/📌|🔧/, "").trim()}
        </h3>
        
        <div className="relative group">
          <Card className={`${currentItem.color} text-white border-0 shadow-xl p-10 min-h-[260px] relative overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer`}>
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
            
            {/* Content */}
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-5">
                <span className="text-5xl">{currentItem.icon}</span>
                <div>
                  <h4 className="font-bold text-2xl mb-1">{currentItem.title}</h4>
                  <p className="text-white/90 text-base leading-relaxed break-words">{currentItem.desc}</p>
                </div>
              </div>
              
              <div className="flex justify-between items-center mt-6">
              <div className="flex gap-3">
                  <Button 
                  size="lg" 
                    variant="secondary" 
                    onClick={onPrev}
                    className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                  >
                  <ChevronLeft size={18} />
                  </Button>
                  <Button 
                  size="lg" 
                    variant="secondary" 
                    onClick={onNext}
                    className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                  >
                  <ChevronRight size={18} />
                  </Button>
                </div>
                
                <Link to={currentItem.link}>
                  <Button 
                    size="lg" 
                    variant="secondary"
                    className="bg-white text-gray-800 hover:bg-white/90 font-medium"
                  >
                    Access <ExternalLink size={14} className="ml-1" />
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Progress indicator */}
            <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-2">
              {items.map((_, index) => (
                <div 
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeIndex ? 'bg-white scale-125' : 'bg-white/60'
                  }`}
                />
              ))}
            </div>
          </Card>
        </div>
        
        {/* Grid view of all items */}
        <div className="grid grid-cols-2 gap-4 mt-8">
          {items.map((item, index) => (
            <Link key={item.id} to={item.link}>
              <Card className={`p-6 min-h-[120px] ${item.color} text-white hover:scale-105 transition-all duration-300 cursor-pointer border-0 shadow-lg group`}>
                <div className="flex items-center gap-3">
                  <span className="text-3xl group-hover:scale-110 transition-transform">{item.icon}</span>
                  <div>
                    <h5 className="font-semibold text-base">{item.title}</h5>
                    <p className="text-white/80 text-sm break-words">{item.desc}</p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
      <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
      <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Digital Performance Hub</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed break-words">
            Access powerful tools and track key activities for enhanced productivity and transparency across your organization.
          </p>
        </div>
        
        <div className="max-w-7xl mx-auto space-y-16">
          {/* Activities Section (Top) */}
          <NoteSection
            title="📌 Activities"
            items={activities}
            activeIndex={activeActivityIndex}
            onPrev={() => setActiveActivityIndex((prev) => (prev - 1 + activities.length) % activities.length)}
            onNext={() => setActiveActivityIndex((prev) => (prev + 1) % activities.length)}
          />
          {/* Utilities Section (Below) */}
          <NoteSection
            title="🔧 Utilities"
            items={utilities}
            activeIndex={activeUtilityIndex}
            onPrev={() => setActiveUtilityIndex((prev) => (prev - 1 + utilities.length) % utilities.length)}
            onNext={() => setActiveUtilityIndex((prev) => (prev + 1) % utilities.length)}
          />
          <div className="text-center mt-6">
            <a href="/utilities" className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 rounded-full text-primary font-medium hover:bg-primary/20 transition-colors">
              <span>⚡</span>
              <span>View all utilities</span>
              <span>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
