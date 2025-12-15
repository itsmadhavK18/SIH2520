import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, X, Clock, FileText, User } from 'lucide-react';
import { api, Request } from '@/services/api';
import { toast } from 'sonner';

interface RequestManagementListProps {
    isAdmin?: boolean; // If true, shows approve/reject buttons
    userId?: string; // If provided, shows only this user's requests
}

export const RequestManagementList: React.FC<RequestManagementListProps> = ({ isAdmin, userId }) => {
    const [requests, setRequests] = useState<Request[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchRequests = async () => {
        try {
            setLoading(true);
            let data;
            if (isAdmin) {
                data = await api.getAllRequests();
            } else if (userId) {
                data = await api.getMyRequests(userId);
            }
            setRequests(data || []);
        } catch (error) {
            console.error('Error fetching requests:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, [isAdmin, userId]);

    const handleStatusUpdate = async (id: string, status: 'approved' | 'rejected') => {
        try {
            await api.updateRequestStatus(id, status);
            toast.success(`Request ${status} successfully`);
            fetchRequests(); // Refresh list
        } catch (error) {
            toast.error('Failed to update status');
        }
    };

    if (loading) return <div>Loading requests...</div>;

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    {isAdmin ? 'Pending Approvals & Requests' : 'My Requests'}
                </CardTitle>
            </CardHeader>
            <CardContent>
                {requests.length === 0 ? (
                    <p className="text-muted-foreground text-center py-4">No requests found.</p>
                ) : (
                    <div className="space-y-4">
                        {requests.map((req) => (
                            <div key={req._id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors gap-4">
                                <div className="flex items-start gap-3">
                                    <div className={`p-2 rounded-lg ${req.status === 'approved' ? 'bg-green-100' :
                                        req.status === 'rejected' ? 'bg-red-100' : 'bg-yellow-100'
                                        }`}>
                                        {req.status === 'approved' ? <Check className="text-green-600 w-5 h-5" /> :
                                            req.status === 'rejected' ? <X className="text-red-600 w-5 h-5" /> :
                                                <Clock className="text-yellow-600 w-5 h-5" />}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h4 className="font-medium text-sm">{req.title}</h4>
                                            <Badge
                                                variant={req.status === 'rejected' ? "destructive" : "outline"}
                                                className={`text-[10px] uppercase ${req.status === 'approved' ? "border-green-600 text-green-600 bg-green-50" : ""}`}
                                            >
                                                {req.status}
                                            </Badge>
                                        </div>

                                        <p className="text-sm text-muted-foreground mt-1">{req.description}</p>

                                        {isAdmin && typeof req.createdBy !== 'string' && (
                                            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-2">
                                                <User size={12} /> {req.createdBy?.name} ({req.department}) • {new Date(req.createdAt).toLocaleDateString()}
                                            </p>
                                        )}
                                        {!isAdmin && (
                                            <p className="text-xs text-muted-foreground mt-1">Submitted on {new Date(req.createdAt).toLocaleDateString()}</p>
                                        )}
                                    </div>
                                </div>

                                {isAdmin && req.status === 'pending' && (
                                    <div className="flex items-center gap-2 shrink-0">
                                        <Button size="sm" variant="outline" className="text-green-600 border-green-200 hover:bg-green-50" onClick={() => handleStatusUpdate(req._id, 'approved')}>
                                            <Check size={16} className="mr-1" /> Approve
                                        </Button>
                                        <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50" onClick={() => handleStatusUpdate(req._id, 'rejected')}>
                                            <X size={16} className="mr-1" /> Reject
                                        </Button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
};
