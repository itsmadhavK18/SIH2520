import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

const milestones = [
  { year: 2020, title: "E-Office Rollout", icon: "💼", desc: "Digital file movement and approvals" },
  { year: 2021, title: "Records Digitization", icon: "📚", desc: "Legacy document archives migrated" },
  { year: 2022, title: "Performance Suite Launch", icon: "📊", desc: "KPI dashboards and scoring" },
  { year: 2023, title: "Public Data Portal", icon: "🌐", desc: "Open information access enabled" },
  { year: 2024, title: "AI-Powered Analytics", icon: "🤖", desc: "Predictive insights deployed" },
];

export const MilestonesTimeline = () => {
  return (
    <section className="py-16 bg-primary/5">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-primary">
          Milestones Achieved
        </h2>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-primary/20 -translate-y-1/2 hidden md:block" />
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
            {milestones.map((milestone, index) => (
              <Card 
                key={milestone.year} 
                className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
              >
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">{milestone.icon}</div>
                  <div className="w-12 h-12 mx-auto mb-3 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                    {milestone.year.toString().slice(2)}
                  </div>
                  <h3 className="font-semibold text-sm mb-2 break-words">{milestone.title}</h3>
                  <p className="text-xs text-muted-foreground break-words leading-relaxed">{milestone.desc}</p>
                  <CheckCircle2 className="mx-auto mt-3 text-success" size={20} />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
