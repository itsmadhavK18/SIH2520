import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Briefcase, MessageSquare, ThumbsUp, AlertCircle, Award, TrendingUp } from 'lucide-react';

interface TeamMemberDetailModalProps {
    member: any;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const TeamMemberDetailModal: React.FC<TeamMemberDetailModalProps> = ({ member, open, onOpenChange }) => {
    if (!member) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-2xl">
                            {member.name?.split(' ').map((n: string) => n[0]).join('').toUpperCase()}
                        </div>
                        <div>
                            <DialogTitle className="text-2xl font-bold">{member.name}</DialogTitle>
                            <DialogDescription className="text-base mt-1">
                                {member.role} • {member.department || 'Engineering Department'}
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <div className="space-y-6 mt-6">
                    {/* Performance Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium flex items-center gap-2">
                                    <Briefcase className="w-4 h-4" /> Total Projects
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-blue-600">{member.totalProjects || 0}</div>
                                <p className="text-xs text-muted-foreground mt-1">
                                    {member.activeProjects || 0} active, {member.completedProjects || 0} completed
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium flex items-center gap-2">
                                    <ThumbsUp className="w-4 h-4" /> Positive Reviews
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-green-600">{member.positiveReviews || 0}</div>
                                <p className="text-xs text-muted-foreground mt-1">
                                    From colleagues and clients
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium flex items-center gap-2">
                                    <AlertCircle className="w-4 h-4" /> Complaints
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-red-600">{member.complaints || 0}</div>
                                <p className="text-xs text-muted-foreground mt-1">
                                    {member.resolvedComplaints || 0} resolved
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Task Performance */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base flex items-center gap-2">
                                <TrendingUp className="w-5 h-5" /> Task Performance
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span>Tasks Completed</span>
                                        <span className="font-medium">{member.tasksCompleted}/{member.tasksTotal}</span>
                                    </div>
                                    <Progress value={(member.tasksCompleted / member.tasksTotal) * 100} className="h-2" />
                                </div>
                                <div className="grid grid-cols-2 gap-4 pt-2">
                                    <div className="p-3 bg-muted/50 rounded-lg">
                                        <p className="text-xs text-muted-foreground">On-time Delivery</p>
                                        <p className="text-xl font-bold text-green-600">{member.onTimeDelivery || '92'}%</p>
                                    </div>
                                    <div className="p-3 bg-muted/50 rounded-lg">
                                        <p className="text-xs text-muted-foreground">Quality Score</p>
                                        <p className="text-xl font-bold text-blue-600">{member.qualityScore || '88'}%</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Recent Feedback */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base flex items-center gap-2">
                                <MessageSquare className="w-5 h-5" /> Recent Feedback
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {member.feedback && member.feedback.length > 0 ? (
                                    member.feedback.map((fb: any, idx: number) => (
                                        <div key={idx} className="p-3 border rounded-lg">
                                            <div className="flex items-start justify-between mb-2">
                                                <div className="flex items-center gap-2">
                                                    <Badge variant={fb.type === 'positive' ? 'outline' : 'destructive'} className={fb.type === 'positive' ? 'bg-green-50 text-green-700 border-green-200' : ''}>
                                                        {fb.type === 'positive' ? 'Positive' : 'Complaint'}
                                                    </Badge>
                                                    <span className="text-xs text-muted-foreground">{fb.date}</span>
                                                </div>
                                            </div>
                                            <p className="text-sm">{fb.comment}</p>
                                            <p className="text-xs text-muted-foreground mt-1">— {fb.from}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-sm text-muted-foreground text-center py-4">No recent feedback available.</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Achievements */}
                    {member.achievements && member.achievements.length > 0 && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base flex items-center gap-2">
                                    <Award className="w-5 h-5" /> Achievements
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2">
                                    {member.achievements.map((achievement: string, idx: number) => (
                                        <Badge key={idx} variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                                            {achievement}
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};
