import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, AlignLeft, Flag } from 'lucide-react';

interface Task {
    id: number;
    title: string;
    status: string;
    priority: string;
    description: string;
    dueDate: string;
    assignee: string;
    project: string;
}

interface TaskDetailModalProps {
    task: Task | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const TaskDetailModal: React.FC<TaskDetailModalProps> = ({ task, open, onOpenChange }) => {
    if (!task) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className="text-xl pr-8">{task.title}</DialogTitle>
                    <DialogDescription>
                        {task.project}
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    <div className="flex items-center justify-between">
                        <Badge
                            variant="outline"
                            className={`px-3 py-1 uppercase text-xs ${task.status === "completed" ? "bg-green-100 text-green-700 border-green-200" : task.status === "in-progress" ? "bg-yellow-100 text-yellow-700 border-yellow-200" : "bg-gray-100 text-gray-700 border-gray-200"}`}
                        >
                            {task.status}
                        </Badge>
                        <Badge
                            variant={task.priority === "high" ? "destructive" : task.priority === "medium" ? "secondary" : "outline"}
                            className="px-3 py-1 uppercase text-xs"
                        >
                            <Flag size={12} className="mr-1 inline" /> {task.priority} Priority
                        </Badge>
                    </div>

                    <div className="space-y-2">
                        <h4 className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
                            <AlignLeft size={16} /> Description
                        </h4>
                        <div className="p-3 bg-muted/40 rounded-lg text-sm leading-relaxed">
                            {task.description}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <h4 className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
                                <Calendar size={16} /> Due Date
                            </h4>
                            <p className="text-sm font-medium pl-6">{task.dueDate}</p>
                        </div>

                        <div className="space-y-1">
                            <h4 className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
                                <User size={16} /> Assigned By
                            </h4>
                            <p className="text-sm font-medium pl-6">{task.assignee}</p>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
