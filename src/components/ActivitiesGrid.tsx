import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const activities = [
  {
    id: 1,
    title: "Project Planning",
    hindiTitle: "परियोजना योजना",
    description: "Scope definition, timelines, and deliverable mapping",
    image: "📅",
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200"
  },
  {
    id: 2,
    title: "Process Optimization",
    hindiTitle: "प्रक्रिया अनुकूलन",
    description: "Lean workflows and efficiency improvements",
    image: "⚙️",
    color: "from-cyan-500 to-cyan-600",
    bgColor: "bg-cyan-50",
    borderColor: "border-cyan-200"
  },
  {
    id: 3,
    title: "Compliance & Audits",
    hindiTitle: "अनुपालन और ऑडिट",
    description: "Standards adherence and internal reviews",
    image: "📋",
    color: "from-orange-500 to-orange-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200"
  },
  {
    id: 4,
    title: "Data & Analytics",
    hindiTitle: "डेटा और विश्लेषण",
    description: "Dashboards, KPI insights, and reporting",
    image: "📊",
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200"
  },
  {
    id: 5,
    title: "Quality Assurance",
    hindiTitle: "गुणवत्ता आश्वासन",
    description: "Testing, validation, and continuous improvement",
    image: "🧪",
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200"
  },
  {
    id: 6,
    title: "Budget & Finance",
    hindiTitle: "बजट और वित्त",
    description: "Budgeting, expense tracking, and approvals",
    image: "💰",
    color: "from-indigo-500 to-indigo-600",
    bgColor: "bg-indigo-50",
    borderColor: "border-indigo-200"
  },
  {
    id: 7,
    title: "E-Office & File Flow",
    hindiTitle: "ई-ऑफिस और फाइल प्रवाह",
    description: "Digital movement, query management, and disposal",
    image: "🗂️",
    color: "from-yellow-500 to-yellow-600",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200"
  },
  {
    id: 8,
    title: "Policy & Governance",
    hindiTitle: "नीति और सुशासन",
    description: "Guidelines, circulars, and institutional reforms",
    image: "⚖️",
    color: "from-red-500 to-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200"
  }
];

export const ActivitiesGrid = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <span className="text-2xl">🏗️</span>
            </div>
            <h2 className="text-4xl font-bold text-primary">Activities</h2>
          </div>
          <div className="w-24 h-1 bg-accent mx-auto rounded-full"></div>
          <p className="text-lg text-muted-foreground mt-6 max-w-2xl mx-auto leading-relaxed">
            Core governance and productivity activities across planning, operations, and services
          </p>
        </div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {activities.map((activity, index) => (
            <Card 
              key={activity.id} 
              className={`${activity.bgColor} ${activity.borderColor} hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group cursor-pointer border-2 min-h-[220px]`}
            >
              <CardContent className="p-8 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-20 h-20 opacity-10">
                  <div className={`w-full h-full bg-gradient-to-br ${activity.color} rounded-full blur-xl`}></div>
                </div>
                
                {/* Number Badge */}
                <div className="absolute top-4 left-4">
                  <Badge 
                    variant="secondary" 
                    className={`bg-white/80 text-primary font-bold text-sm px-2 py-1 shadow-sm`}
                  >
                    {activity.id}
                  </Badge>
                </div>

                {/* Content */}
                <div className="relative z-10 pt-10">
                  {/* Icon */}
                  <div className="text-center mb-8">
                    <div className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br ${activity.color} flex items-center justify-center text-white text-4xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {activity.image}
                    </div>
                  </div>

                  {/* Titles */}
                  <div className="text-center space-y-2">
                    <h3 className="font-bold text-xl text-foreground leading-tight break-words">
                      {activity.title}
                    </h3>
                    <h4 className="font-semibold text-base text-primary leading-tight break-words">
                      {activity.hindiTitle}
                    </h4>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground mt-5 leading-relaxed break-words text-center">
                    {activity.description}
                  </p>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <a href="/utilities" className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 rounded-full text-primary font-medium hover:bg-primary/20 transition-colors">
            <span>🌟</span>
            <span>Explore more activities and utilities</span>
            <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
};
