import { Card, CardContent } from "@/components/ui/card";
import { Users, Award, Globe2, Shield } from "lucide-react";

export const WhoWeAre = () => {
  const stats = [
    { icon: <Users size={32} />, value: "2000+", label: "Professionals" },
    { icon: <Globe2 size={32} />, value: "500+", label: "Monitoring Stations" },
    { icon: <Award size={32} />, value: "50+", label: "Years of Excellence" },
    { icon: <Shield size={32} />, value: "100%", label: "Data Security" },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-primary mb-6">Who We Are</h2>
            <div className="space-y-4 text-muted-foreground">
              <p className="text-lg leading-relaxed break-words">
                We are a multidisciplinary public institution focused on modernizing governance and service delivery
                through <span className="text-foreground font-medium">digital platforms</span>,
                <span className="text-foreground font-medium"> data-driven decision making</span>, and
                <span className="text-foreground font-medium"> collaboration</span>.
              </p>
              <p className="leading-relaxed break-words">
                Our teams work across planning, operations, finance, compliance, and citizen engagement to build
                a responsive and accountable organization.
              </p>
              <p className="leading-relaxed break-words">
                We strive to deliver transparent, efficient, and inclusive public services that scale reliably and
                adapt to evolving needs.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="text-primary mb-3 flex justify-center">{stat.icon}</div>
                  <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
