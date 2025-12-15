import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Clock, TrendingUp, Users, DollarSign, FileText, Pickaxe, Calendar } from 'lucide-react';
import { RequestManagementList } from './RequestManagementList';
import { ReportList } from './ReportList';

interface ProjectDetailModalProps {
    project: any; // Using any for flexible mock data
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, open, onOpenChange }) => {
    if (!project) return null;

    // Mock data enhancements if missing
    const duration = project.duration || { total: "18 Months", elapsed: "12 Months", percent: 66 };
    const resources = project.resources || [
        { name: "Heavy Machinery", used: 8, total: 10, unit: "units" },
        { name: "Labor Force", used: 120, total: 150, unit: "workers" },
        { name: "Cement Bags", used: 15000, total: 20000, unit: "bags" }
    ];

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <div className="flex items-center justify-between mr-6">
                        <div>
                            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                                {project.name}
                                <Badge variant={project.status === "on-track" ? "outline" : "destructive"}>
                                    {project.status === "on-track" ? "On Track" : project.status}
                                </Badge>
                            </DialogTitle>
                            <DialogDescription className="mt-1">
                                Project ID: {project.id} • Location: {project.location || "Assam Region"}
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <Tabs defaultValue="overview" className="mt-6">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="resources">
                            Resources & Time
                        </TabsTrigger>
                        <TabsTrigger value="team">Team & Financials</TabsTrigger>
                        <TabsTrigger value="docs">Reports & Requests</TabsTrigger>
                    </TabsList>

                    {/* OVERVIEW TAB */}
                    <TabsContent value="overview" className="space-y-4 mt-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Card>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                                        <Clock className="w-4 h-4" /> Timeline Progress
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{project.progress}%</div>
                                    <Progress value={project.progress} className="mt-2" />
                                    <p className="text-xs text-muted-foreground mt-2">Expected completion by {project.expectedCompletion || "Oct 2026"}</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                                        <TrendingUp className="w-4 h-4" /> Current Phase
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">Construction</div>
                                    <p className="text-xs text-muted-foreground mt-1">Foundational work completed. Embankment reinforcement in progress.</p>
                                </CardContent>
                            </Card>
                        </div>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">Project Description</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    This project aims to strengthen the Brahmaputra river embankment to prevent seasonal flooding in the Upper Assam region.
                                    Scope includes raising the embankment height by 2 meters, reinforcing with geo-textiles, and constructing 3 new sluice gates.
                                </p>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* RESOURCES & TIME TAB */}
                    <TabsContent value="resources" className="space-y-4 mt-4">
                        {/* Duration Section */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-base">
                                    <Calendar className="w-5 h-5" /> Duration Tracker
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-3 gap-4 text-center">
                                    <div className="p-4 bg-muted/50 rounded-lg">
                                        <p className="text-sm text-muted-foreground">Total Duration Need</p>
                                        <p className="text-xl font-bold text-primary">{duration.total}</p>
                                    </div>
                                    <div className="p-4 bg-muted/50 rounded-lg">
                                        <p className="text-sm text-muted-foreground">Time Already Taken</p>
                                        <p className="text-xl font-bold text-blue-600">{duration.elapsed}</p>
                                    </div>
                                    <div className="p-4 bg-muted/50 rounded-lg">
                                        <p className="text-sm text-muted-foreground">Time Remaining</p>
                                        <p className="text-xl font-bold text-green-600 font-mono">
                                            {parseInt(duration.total) - parseInt(duration.elapsed)} Months
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <div className="flex justify-between text-xs mb-1">
                                        <span>Timeline</span>
                                        <span>{duration.percent}% Elapsed</span>
                                    </div>
                                    <Progress value={duration.percent} className="h-2" />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Resources Section */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-base">
                                    <Pickaxe className="w-5 h-5" /> Resource Utilization
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-6">
                                    {resources.map((res: any, idx: number) => (
                                        <div key={idx}>
                                            <div className="flex items-center justify-between mb-1">
                                                <div>
                                                    <p className="font-medium text-sm">{res.name}</p>
                                                    <p className="text-xs text-muted-foreground">{res.used} / {res.total} {res.unit} utilized</p>
                                                </div>
                                                <span className="font-bold text-sm">
                                                    {Math.round((res.used / res.total) * 100)}%
                                                </span>
                                            </div>
                                            <Progress value={(res.used / res.total) * 100} className="h-2" />
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* TEAM & FINANCIALS TAB */}
                    <TabsContent value="team" className="space-y-4 mt-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-base">
                                        <DollarSign className="w-5 h-5" /> Financial Overview
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="mt-2 space-y-4">
                                        <div className="flex justify-between items-center border-b pb-2">
                                            <span className="text-sm text-muted-foreground">Total Budget</span>
                                            <span className="font-bold">₹ 50,00,00,000</span>
                                        </div>
                                        <div className="flex justify-between items-center border-b pb-2">
                                            <span className="text-sm text-muted-foreground">Spent to Date</span>
                                            <span className="font-bold text-blue-600">₹ 32,50,00,000</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-muted-foreground">Remaining</span>
                                            <span className="font-bold text-green-600">₹ 17,50,00,000</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-base">
                                        <Users className="w-5 h-5" /> Key Personnel
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-3">
                                        <li className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs">RK</div>
                                            <div>
                                                <p className="text-sm font-medium">Rajesh Kumar</p>
                                                <p className="text-xs text-muted-foreground">Site Supervisor</p>
                                            </div>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-xs">SP</div>
                                            <div>
                                                <p className="text-sm font-medium">Suresh Patel</p>
                                                <p className="text-xs text-muted-foreground">Civil Engineer</p>
                                            </div>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-700 font-bold text-xs">AS</div>
                                            <div>
                                                <p className="text-sm font-medium">Amit Singh</p>
                                                <p className="text-xs text-muted-foreground">Safety Officer</p>
                                            </div>
                                        </li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* DOCS TAB */}
                    <TabsContent value="docs" className="space-y-4 mt-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-sm flex items-center gap-2">
                                        <FileText className="w-4 h-4" /> Project Reports
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        {project.reports && project.reports.length > 0 ? (
                                            project.reports.map((report: any, idx: number) => (
                                                <div key={idx} className="p-3 border rounded-lg hover:bg-muted/50">
                                                    <p className="font-medium text-sm">{report.title}</p>
                                                    <p className="text-xs text-muted-foreground">{report.date}</p>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-sm text-muted-foreground text-center py-4">No reports for this project yet.</p>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-sm flex items-center gap-2">
                                        <FileText className="w-4 h-4" /> Pending Requests
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        {project.requests && project.requests.length > 0 ? (
                                            project.requests.map((req: any, idx: number) => (
                                                <div key={idx} className="p-3 border rounded-lg hover:bg-muted/50">
                                                    <p className="font-medium text-sm">{req.title}</p>
                                                    <p className="text-xs text-muted-foreground">{req.status}</p>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-sm text-muted-foreground text-center py-4">No pending requests for this project.</p>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                </Tabs>
            </DialogContent>
        </Dialog>
    );
};
