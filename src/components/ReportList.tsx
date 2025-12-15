import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download, User } from 'lucide-react';
import { api, Report } from '@/services/api';

interface ReportListProps {
    isAdmin?: boolean;
    userId?: string;
}

export const ReportList: React.FC<ReportListProps> = ({ isAdmin, userId }) => {
    const [reports, setReports] = useState<Report[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                setLoading(true);
                let data;
                if (isAdmin) {
                    data = await api.getAllReports();
                } else if (userId) {
                    data = await api.getMyReports(userId);
                }
                setReports(data || []);
            } catch (error) {
                console.error('Error fetching reports:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchReports();
    }, [isAdmin, userId]);

    const handleDownload = (filePath: string) => {
        // filePath comes as 'uploads\\filename' or 'uploads/filename' from server
        // We need to construct absolute URL to server. Assuming server runs on 5001.
        const filename = filePath.split(/[/\\]/).pop();
        const url = `http://localhost:5001/uploads/${filename}`;
        window.open(url, '_blank');
    };

    if (loading) return <div>Loading reports...</div>;

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    {isAdmin ? 'All Submitted Reports' : 'My Reports'}
                </CardTitle>
            </CardHeader>
            <CardContent>
                {reports.length === 0 ? (
                    <p className="text-muted-foreground text-center py-4">No reports found.</p>
                ) : (
                    <div className="space-y-4">
                        {reports.map((report) => (
                            <div key={report._id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-primary/10 rounded-lg">
                                        <FileText className="text-primary w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-sm">{report.title}</h4>
                                        <p className="text-xs text-muted-foreground line-clamp-1">{report.description}</p>
                                        {isAdmin && typeof report.uploadedBy !== 'string' && (
                                            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                                                <User size={10} /> {report.uploadedBy.name} ({report.department})
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="text-right mr-2 hidden sm:block">
                                        <span className="text-xs text-muted-foreground block">
                                            {new Date(report.createdAt).toLocaleDateString()}
                                        </span>
                                        <span className="text-[10px] text-muted-foreground uppercase bg-secondary px-1 rounded">
                                            {report.fileType.split('/')[1] || 'FILE'}
                                        </span>
                                    </div>
                                    <Button variant="ghost" size="sm" onClick={() => handleDownload(report.filePath)}>
                                        <Download size={16} />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
};
