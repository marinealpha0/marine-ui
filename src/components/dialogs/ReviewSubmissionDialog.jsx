import React, { useState, useEffect } from "react";
import { formatDisplayDate } from "@/utils/dateUtils";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Tabs from "@/components/ui/Tabs";
const SubmissionComments = () => (
    <div className="p-4 text-center text-gray-500">Submission comments are currently unavailable.</div>
);
import { MessageSquare, FileText } from "@/assets/icons";

export const ReviewSubmissionDialog = ({
    open,
    onClose,
    onSubmit,
    submission,
    isSubmitting,
    isReadOnly
}) => {
    const [status, setStatus] = useState("");
    const [impressive, setImpressive] = useState("");
    const [improvement, setImprovement] = useState("");

    const [activeTab, setActiveTab] = useState("review");

    useEffect(() => {
        if (open) {
            setActiveTab("review"); // Reset to review tab when opening
        }
    }, [open]);

    useEffect(() => {
        if (submission) {
            setStatus(submission.status || "In Review");
            const feedback = submission.feedback || {};
            setImpressive(feedback.impressive || "");
            setImprovement(feedback.improvement || "");
        }
    }, [submission]);

    const handleSaveDraft = () => {
        // "Save Draft": Save feedback without changing status (User sees "In Review").
        onSubmit({
            id: submission.id,
            status: "In Review",
            impressive,
            improvement
        });
    };

    const handlePublish = () => {
        // "Publish Review": Save feedback AND change status to Completed
        onSubmit({
            id: submission.id,
            status: "Completed",
            impressive,
            improvement
        });
    };

    if (!submission) return null;

    const tabs = [
        { label: "Review", value: "review", icon: FileText },
        { label: "Comments", value: "comments", icon: MessageSquare },
    ];

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="w-[95%] sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold">Review Submission: {submission.projectName}</DialogTitle>
                </DialogHeader>

                <Tabs className="mb-0" tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

                <div className="flex flex-col gap-6 pb-4">
                    {activeTab === "review" && (
                        <>
                            {/* Read-Only Section */}
                            <div className="space-y-4 bg-gray-50 p-4 rounded-lg border">
                                <h3 className="font-semibold text-gray-700 uppercase tracking-wide text-sm">Student Submission</h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label className="text-xs text-gray-500">Student Name</Label>
                                        <p className="font-medium">{submission.studentName}</p>
                                    </div>
                                    <div>
                                        <Label className="text-xs text-gray-500">Submitted At</Label>
                                        <p className="font-medium">{formatDisplayDate(submission.submittedAt)}</p>
                                    </div>
                                </div>

                                <div>
                                    <Label className="text-xs text-gray-500">Links</Label>
                                    <div className="flex gap-4 mt-1">
                                        {submission.repositoryLink ? (
                                            <a
                                                href={submission.repositoryLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-primary hover:underline"
                                            >
                                                [GitHub Repository]
                                            </a>
                                        ) : <span className="text-gray-400">No Repo Link</span>}
                                        {submission.liveDemoLink ? (
                                            <a
                                                href={submission.liveDemoLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-primary hover:underline"
                                            >
                                                [Live Demo]
                                            </a>
                                        ) : <span className="text-gray-400">No Live Link</span>}
                                    </div>
                                </div>

                                <div>
                                    <Label className="text-xs text-gray-500">Technologies Used</Label>
                                    <div className="flex flex-wrap gap-2 mt-1">
                                        {submission.technologies && submission.technologies.length > 0 ? (
                                            submission.technologies.map((tech, idx) => (
                                                <span key={idx} className="bg-white border px-2 py-1 rounded text-xs font-medium">
                                                    {tech}
                                                </span>
                                            ))
                                        ) : (
                                            <span className="text-gray-400 italic">None listed</span>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <Label className="text-xs text-gray-500">Blockers / Notes</Label>
                                    <p className="text-sm bg-white p-2 rounded border mt-1 min-h-[60px] whitespace-pre-wrap">
                                        {submission.blockers || "No notes provided."}
                                    </p>
                                </div>
                            </div>

                            {/* Action & Feedback Section */}
                            <div className="space-y-4">
                                <h3 className="font-semibold text-gray-700 uppercase tracking-wide text-sm">Action & Feedback</h3>

                                <div className="grid grid-cols-1 gap-4">
                                    <div>
                                        <Label>Status</Label>
                                        <select
                                            className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                            value={status}
                                            onChange={(e) => setStatus(e.target.value)}
                                            disabled={isReadOnly}
                                        >
                                            <option value="In Review">In Review</option>
                                            <option value="Completed">Completed</option>
                                            <option value="Rejected">Rejected/Retry</option>
                                        </select>
                                        <p className="text-xs text-gray-500 mt-1">
                                            {status === "Completed"
                                                ? "Unlocks certificate/progress for the student."
                                                : "Student can define further actions based on status."}
                                        </p>
                                    </div>

                                    <div>
                                        <Label>Strengths (Impressive)</Label>
                                        <Textarea
                                            placeholder="What did they do well?"
                                            value={impressive}
                                            onChange={(e) => setImpressive(e.target.value)}
                                            rows={3}
                                            disabled={isReadOnly}
                                        />
                                    </div>

                                    <div>
                                        <Label>Improvements</Label>
                                        <Textarea
                                            placeholder="What can be improved?"
                                            value={improvement}
                                            onChange={(e) => setImprovement(e.target.value)}
                                            rows={3}
                                            disabled={isReadOnly}
                                        />
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    <div className={activeTab === "comments" ? "block" : "hidden"}>
                        <SubmissionComments
                            submissionId={submission.id}
                            isReadOnly={false}
                            enabled={activeTab === "comments"}
                        />
                    </div>
                </div>

                {!isReadOnly && (
                    <DialogFooter className="gap-2 sm:gap-0">
                        <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
                            Cancel
                        </Button>
                        <Button
                            onClick={handlePublish}
                            disabled={isSubmitting}
                        >
                            Publish Review
                        </Button>
                    </DialogFooter>
                )}
            </DialogContent>
        </Dialog>
    );
};
