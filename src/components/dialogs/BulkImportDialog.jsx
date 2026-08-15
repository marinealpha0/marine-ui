import React, { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  UploadCloud,
  Download,
  FileText,
  X,
  CheckCircle,
  AlertCircle
} from "@/assets/icons";
import { downloadSampleFile } from "@/utils/exportUtils";
import { toast } from "sonner";

/**
 * Reusable Bulk Import Dialog component.
 * Supports download of sample files, customized children inputs, drag & drop uploads.
 */
export default function BulkImportDialog({
  open,
  onClose,
  title = "Bulk Import",
  sampleDownloadUrl,
  sampleFilename = "sample-template.xlsx",
  onUpload,
  isSubmitting = false,
  entityName = "records",
  isSubmitDisabled = false,
  children,
}) {
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [importErrors, setImportErrors] = useState([]);
  const fileInputRef = useRef(null);

  const resetState = () => {
    setFile(null);
    setDragActive(false);
    setValidationError("");
    setImportErrors([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleClose = () => {
    if (isSubmitting) return; // Prevent close during upload
    resetState();
    onClose();
  };

  const validateFile = (selectedFile) => {
    if (!selectedFile) return false;
    
    // Check file size (max 10MB)
    const maxSize = 10 * 1024 * 1024;
    if (selectedFile.size > maxSize) {
      setValidationError("File is too large. Maximum size is 10MB.");
      toast.error("File is too large. Maximum size is 10MB.");
      return false;
    }

    // Check file extension
    const extension = selectedFile.name.split(".").pop().toLowerCase();
    if (!["xlsx", "xls", "csv"].includes(extension)) {
      setValidationError("Invalid file type. Only .xlsx, .xls, and .csv files are supported.");
      toast.error("Invalid file type. Only .xlsx, .xls, and .csv are supported.");
      return false;
    }

    setValidationError("");
    return true;
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (validateFile(droppedFile)) {
        setFile(droppedFile);
      }
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (validateFile(selectedFile)) {
        setFile(selectedFile);
      }
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleDownloadSample = async () => {
    if (sampleDownloadUrl) {
      await downloadSampleFile(sampleDownloadUrl, sampleFilename);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || isSubmitting) return;

    try {
      setValidationError("");
      setImportErrors([]);
      await onUpload(file);
      resetState();
    } catch (err) {
      // Catch validation error response payload
      const responseData = err.responseData;
      if (responseData && responseData.data && Array.isArray(responseData.data.errors)) {
        setImportErrors(responseData.data.errors);
      } else if (responseData && Array.isArray(responseData.errors)) {
        setImportErrors(responseData.errors);
      } else {
        setValidationError(err.message || "Failed to import file.");
      }
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-xl w-full p-0 overflow-hidden bg-white border border-slate-100 rounded-2xl shadow-2xl">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-slate-100">
          <DialogTitle className="text-xl font-bold text-slate-800">
            {title}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Step 1: Download Sample File */}
          {sampleDownloadUrl && (
            <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all hover:bg-slate-50">
              <div className="flex gap-3 items-start">
                <div className="p-2.5 rounded-lg bg-primary/10 text-primary shrink-0 mt-0.5">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-800">
                    Step 1: Download Sample Template
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Download and fill the pre-formatted Excel template to ensure import validation.
                  </p>
                </div>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleDownloadSample}
                className="shrink-0 flex items-center gap-2 border-primary/20 hover:border-primary/40 text-primary hover:text-primary hover:bg-primary/5 font-semibold"
              >
                <Download className="w-4 h-4" />
                Download
              </Button>
            </div>
          )}

          {/* Custom children e.g. Course selector */}
          {children && (
            <div className="space-y-2">
              {children}
            </div>
          )}

          {/* Step 2: Dropzone */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-slate-800">
              {sampleDownloadUrl ? "Step 2: Upload Populate Template" : "Upload File"}
            </h4>

            {!file ? (
              <div
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                onClick={triggerFileInput}
                className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all flex flex-col items-center justify-center min-h-[180px] ${
                  dragActive
                    ? "border-primary bg-primary/5 scale-[0.99]"
                    : "border-slate-200 hover:border-primary/50 hover:bg-slate-50/50"
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleFileChange}
                  accept=".xlsx, .xls, .csv"
                  className="hidden"
                />
                
                <div className={`p-4 rounded-full bg-slate-50 text-slate-400 mb-4 transition-all ${dragActive ? 'bg-primary/15 text-primary animate-bounce' : ''}`}>
                  <UploadCloud className="w-8 h-8" />
                </div>

                <p className="text-sm font-semibold text-slate-700">
                  Drag & drop your file here, or{" "}
                  <span className="text-primary hover:underline">browse</span>
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Supports .xlsx, .xls, .csv up to 10MB
                </p>

                {validationError && (
                  <div className="mt-3 flex items-center gap-1.5 text-xs text-red-500 font-medium">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {validationError}
                  </div>
                )}
              </div>
            ) : (
              /* Selected File Preview Card */
              <div className="space-y-4">
                <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-600 shrink-0">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <h5 className="text-sm font-semibold text-slate-800 truncate">
                        {file.name}
                      </h5>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {formatFileSize(file.size)}
                      </p>
                    </div>
                  </div>
                  
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    disabled={isSubmitting}
                    onClick={resetState}
                    className="h-8 w-8 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                {/* Validation Errors Render */}
                {importErrors.length > 0 && (
                  <div className="p-4 rounded-xl border border-red-100 bg-red-50/50 space-y-3 animate-in fade-in slide-in-from-top-1 duration-200">
                    <div className="flex items-center gap-2 text-red-600 font-semibold text-sm">
                      <AlertCircle className="w-4 h-4 shrink-0 animate-pulse" />
                      <span>Import Failed: {importErrors.length} validation errors found</span>
                    </div>
                    <div className="max-h-[180px] overflow-y-auto pr-1 space-y-2 scrollbar-thin scrollbar-thumb-red-200 scrollbar-track-transparent">
                      {importErrors.map((err, idx) => (
                        <div key={idx} className="flex gap-2.5 items-start text-xs text-red-700 bg-white border border-red-100/50 rounded-lg p-3 shadow-sm hover:border-red-200 transition-colors">
                          <span className="font-bold text-red-800 bg-red-100/80 px-2 py-0.5 rounded text-[10px] tracking-wider shrink-0 mt-0.5">
                            ROW {err.row}
                          </span>
                          <span className="leading-relaxed font-semibold">{err.error}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Upload Progress */}
          {isSubmitting && (
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500 font-medium">Importing {entityName}...</span>
                <span className="text-primary font-bold animate-pulse">Processing...</span>
              </div>
              <Progress value={90} className="h-1.5 bg-slate-100 [&>[data-slot=progress-indicator]]:bg-primary" />
            </div>
          )}

          {/* Dialog Actions */}
          <DialogFooter className="pt-4 border-t border-slate-100 gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
              className="border-slate-200 hover:bg-slate-50 hover:text-slate-800 text-slate-700 font-semibold"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!file || isSubmitting || isSubmitDisabled}
              className="bg-primary text-primary-foreground hover:bg-primary-hover font-semibold shrink-0"
            >
              {isSubmitting ? "Importing..." : "Start Import"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
