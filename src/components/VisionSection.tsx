import { Target, Briefcase, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const VisionSection = () => {
  const visionPoints = [
    {
      icon: <Target className="text-primary" size={40} />,
      title: "Operational Excellence",
      desc: "Delivering efficient, transparent, and citizen-centric services at scale",
    },
    {
      icon: <Briefcase className="text-primary" size={40} />,
      title: "Good Governance",
      desc: "Strengthening accountability, compliance, and institutional capacity",
    },
    {
      icon: <TrendingUp className="text-primary" size={40} />,
      title: "Innovation & Technology",
      desc: "Leveraging modern tools for data collection, analysis, and dissemination",
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-primary mb-4">Our Vision</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed break-words">
            To be a premier institution for digital public administration—driving excellence through
            transparency, innovation, and data-driven decision making.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {visionPoints.map((point, index) => (
            <Card key={index} className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 bg-background/80 backdrop-blur">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">{point.icon}</div>
                <h3 className="font-bold text-xl mb-3">{point.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed break-words">{point.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
