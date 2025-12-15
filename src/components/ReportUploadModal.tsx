import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Upload, File } from 'lucide-react';
import { api } from '@/services/api';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

interface ReportUploadModalProps {
    children?: React.ReactNode;
    onSuccess?: () => void;
}

export const ReportUploadModal: React.FC<ReportUploadModalProps> = ({ children, onSuccess }) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file || !user) return;

        try {
            setLoading(true);
            const formData = new FormData();
            formData.append('file', file);
            formData.append('title', title);
            formData.append('description', description);
            formData.append('uploadedBy', user.id);
            formData.append('department', user.department);

            await api.uploadReport(formData);

            toast.success('Report uploaded successfully');
            setOpen(false);
            // Reset form
            setTitle('');
            setDescription('');
            setFile(null);

            if (onSuccess) onSuccess();
        } catch (error) {
            console.error(error);
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            toast.error(`Failed to upload report: ${errorMessage}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children || (
                    <Button variant="outline">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Report
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Upload Report</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">Report Title</Label>
                        <Input
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g., Monthly Progress Report"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Brief description of the report contents"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="file">File (PDF, Images, Excel)</Label>
                        <div className="flex items-center gap-2">
                            <Input
                                id="file"
                                type="file"
                                accept=".pdf,.jpg,.jpeg,.png,.xlsx,.xls"
                                onChange={handleFileChange}
                                required
                                className="cursor-pointer"
                            />
                        </div>
                    </div>

                    <Button type="submit" className="w-full" disabled={loading || !file}>
                        {loading ? 'Uploading...' : 'Submit Report'}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};
