"use client"

import React, { useState, useRef, useCallback, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Upload,
  X,
  File,
  ImageIcon,
  FileText,
  Music,
  Video,
  RefreshCw,
  Eye,
} from "@/assets/icons"

import { Label } from "@/components/ui/label"
import ImagePreviewDialog from "@/components/dialogs/ImagePreviewDialog"
import { compressImageIfNeeded } from "@/utils/imageCompression"


export function FileUploader({
  acceptedFormats = ["image/*", "application/pdf", ".doc", ".docx"],
  maxFiles = 10,
  maxSize = 10,
  onUpload,
  initialFiles = [],
  onValueChange,
  helperText,
  label,
  className,
  viewMode = false,
}) {
  const [uploadedFiles, setUploadedFiles] = useState(initialFiles)
  const [isDragging, setIsDragging] = useState(false)
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [previewTitle, setPreviewTitle] = useState("")

  const handleViewImage = (url, title) => {
    setPreviewUrl(url)
    setPreviewTitle(title)
    setPreviewOpen(true)
  }

  const fileInputRef = useRef(null)
  const onValueChangeRef = useRef(onValueChange);
  const isMounted = useRef(false);

  useEffect(() => {
    onValueChangeRef.current = onValueChange;
  }, [onValueChange]);

  useEffect(() => {
    if (!isMounted.current) {
      if (initialFiles.length > 0) {
        // If we have initial files, we might not want to NOTIFY parent since parent gave them.
        // But we set isMounted to true so next changes trigger it.
      }
      isMounted.current = true;
      return;
    }
    // Include files that are uploading OR successfully uploaded (exclude only errored ones)
    const validFiles = uploadedFiles
      .filter(f => f.status === 'success' || f.status === 'uploading')
      .map(f => f.file);
    onValueChangeRef.current?.(validFiles);
  }, [uploadedFiles]);


  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i]
  }

  const getFileIcon = (fileType) => {
    if (fileType.startsWith("image/")) return <ImageIcon className="h-5 w-5" />
    if (fileType.startsWith("video/")) return <Video className="h-5 w-5" />
    if (fileType.startsWith("audio/")) return <Music className="h-5 w-5" />
    if (fileType.includes("pdf") || fileType.includes("document"))
      return <FileText className="h-5 w-5" />
    return <File className="h-5 w-5" />
  }

  const validateFile = (file, currentSuccessCount) => {
    if (currentSuccessCount >= maxFiles) {
      return { valid: false, error: `Maximum file limit of ${maxFiles} reached` }
    }

    const isDuplicate = uploadedFiles.some((f) => f.file.name === file.name)
    if (isDuplicate) {
      return { valid: false, error: `File "${file.name}" already exists` }
    }

    const fileSizeInMB = file.size / (1024 * 1024)
    if (fileSizeInMB > maxSize) {
      return { valid: false, error: `File size exceeds ${maxSize}MB limit` }
    }

    // Validate file type against acceptedFormats
    if (acceptedFormats && acceptedFormats.length > 0) {
      const isTypeAccepted = acceptedFormats.some((format) => {
        const fmt = format.trim()
        if (fmt.endsWith("/*")) {
          // e.g. "image/*" matches "image/jpeg", "image/png", etc.
          return file.type.startsWith(fmt.slice(0, -1))
        }
        if (fmt.startsWith(".")) {
          // e.g. ".pdf" — match by file extension
          return file.name.toLowerCase().endsWith(fmt.toLowerCase())
        }
        // exact MIME match e.g. "application/pdf"
        return file.type === fmt
      })
      if (!isTypeAccepted) {
        const readableFormats = acceptedFormats
          .map((f) => f.replace("application/", "").replace("image/", "").toUpperCase())
          .join(", ")
        return { valid: false, error: `Invalid file type. Accepted: ${readableFormats}` }
      }
    }

    return { valid: true }
  }

  const simulateUpload = async (fileId) => {
    for (let progress = 0; progress <= 100; progress += 10) {
      await new Promise((resolve) => setTimeout(resolve, 100))
      setUploadedFiles((prev) =>
        prev.map((f) => (f.id === fileId ? { ...f, progress } : f)),
      )
    }

    setUploadedFiles((prev) =>
      prev.map((f) =>
        f.id === fileId
          ? { ...f, status: "success", progress: 100, error: undefined }
          : f,
      ),
    )
  }

  const handleFiles = useCallback(
    async (files) => {
      if (!files) return

      const newFiles = []
      let currentSuccessCount = uploadedFiles.filter(
        (f) => f.status === "success",
      ).length

      for (let i = 0; i < files.length; i++) {
        let file = files[i]
        
        // Compress image client-side if it exceeds 1MB
        file = await compressImageIfNeeded(file)

        const validation = validateFile(file, currentSuccessCount)


        const id = `${Date.now()}-${i}`
        let preview

        if (file.type.startsWith("image/")) {
          preview = URL.createObjectURL(file)
        }

        const uploadedFile = {
          id,
          file,
          preview,
          status: validation.valid ? "uploading" : "error",
          progress: 0,
          error: validation.error,
          isValidationError: !validation.valid, // true = type/size rejection, no retry
        }

        newFiles.push(uploadedFile)

        if (validation.valid) {
          currentSuccessCount++
          simulateUpload(id)
        }
      }

      setUploadedFiles((prev) => [...prev, ...newFiles])

      if (onUpload) {
        const validFiles = newFiles
          .filter((f) => f.status !== "error")
          .map((f) => f.file)

        if (validFiles.length > 0) {
          await onUpload(validFiles)
        }
      }
    },
    [uploadedFiles, maxFiles, maxSize, onUpload],
  )

  const handleDragOver = useCallback((e) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault()
      setIsDragging(false)
      handleFiles(e.dataTransfer.files)
    },
    [handleFiles],
  )

  const handleFileInputChange = (e) => {
    handleFiles(e.target.files)
    e.target.value = ""
  }

  const removeFile = (id) => {
    setUploadedFiles((prev) => {
      const file = prev.find((f) => f.id === id)
      if (file?.preview) {
        URL.revokeObjectURL(file.preview)
      }
      return prev.filter((f) => f.id !== id)
    })

    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }



  const retryUpload = async (id) => {
    const fileEntry = uploadedFiles.find((f) => f.id === id);
    if (!fileEntry || fileEntry.isValidationError) return; // never retry validation errors

    // Set status to uploading first to show progress bar
    setUploadedFiles((prev) =>
      prev.map((f) =>
        f.id === id ? { ...f, status: "uploading", progress: 0, error: undefined } : f
      )
    )

    // Short delay to let user see the "uploading" state
    await new Promise(resolve => setTimeout(resolve, 300));

    simulateUpload(id)
  }

  const successCount = uploadedFiles.filter((f) => f.status === "success").length

  const isMaxFilesReached = successCount >= maxFiles

  return (
    <div className={cn("w-full max-w-3xl mx-auto space-y-4", className)}>
      <div className="space-y-2">
        {label && <Label>{label}</Label>}
        {!viewMode && !isMaxFilesReached && (
          <div className="space-y-4">
            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={cn(
                "relative border-2 border-dashed rounded-xl transition-all duration-300 bg-card cursor-pointer",
                isDragging
                  ? "border-primary bg-primary/5 scale-[1.02]"
                  : "border-border hover:border-primary/50 hover:bg-accent/5",
              )}
            >
              <div className="p-4 text-center space-y-4">
                <div className="flex justify-center">
                  <div
                    className={cn(
                      "h-16 w-16 rounded-full flex items-center justify-center",
                      isDragging ? "bg-primary/10" : "bg-muted",
                    )}
                  >
                    <Upload className="h-8 w-8" />
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">
                  Drag and drop your files here, or click to browse
                </p>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept={acceptedFormats.join(",")}
                onChange={handleFileInputChange}
                className="hidden"
              />
            </div>
            <div className="flex justify-between items-center text-xs text-muted-foreground">
              {helperText && (
                <span>{helperText}</span>
              )}
              <span>
                Max {maxFiles} files • Max {maxSize}MB per file
              </span>
            </div>
          </div>
        )}
      </div>

      {viewMode && uploadedFiles.length === 0 && (
        <p className="text-sm text-muted-foreground italic">No image uploaded</p>
      )}

      {uploadedFiles.map((uploadedFile) => (
        <div key={uploadedFile.id} className="border rounded-lg p-2 bg-card hover:bg-accent/5 transition-colors">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "h-10 w-10 flex items-center justify-center shrink-0 overflow-hidden rounded-md border border-border bg-muted",
                uploadedFile.preview && "cursor-pointer hover:opacity-85 transition-opacity"
              )}
              onClick={() => {
                if (uploadedFile.preview) {
                  handleViewImage(uploadedFile.preview, uploadedFile.file.name);
                }
              }}
            >
              {uploadedFile.preview ? (
                <img
                  src={uploadedFile.preview}
                  alt={uploadedFile.file.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                getFileIcon(uploadedFile.file.type)
              )}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate" title={uploadedFile.file.name}>
                {uploadedFile.file.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {
                  !uploadedFile.error && formatFileSize(uploadedFile.file.size)
                }
              </p>

              {uploadedFile.status === "uploading" && (
                <Progress value={uploadedFile.progress} className="mt-1 h-1" />
              )}

              {uploadedFile.status === "error" && (
                <p className="text-xs text-destructive mt-0.5">
                  {uploadedFile.error}
                </p>
              )}
            </div>

            <div className="flex gap-1">
              {uploadedFile.preview && (
                <Button
                  size="icon"
                  variant="ghost"
                  type="button"
                  onClick={() => handleViewImage(uploadedFile.preview, uploadedFile.file.name)}
                  className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-accent rounded-lg"
                  title="View Image"
                >
                  <Eye className="h-4 w-4" />
                </Button>
              )}

              {uploadedFile.status === "error" && !uploadedFile.isValidationError && !viewMode && (
                <Button
                  size="icon"
                  variant="ghost"
                  type="button"
                  onClick={() => retryUpload(uploadedFile.id)}
                  className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-accent rounded-lg"
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              )}

              {!viewMode && (
                <Button
                  size="icon"
                  variant="ghost"
                  type="button"
                  onClick={() => removeFile(uploadedFile.id)}
                  className="h-8 w-8 text-muted-foreground hover:text-rose-500 hover:bg-rose-50 rounded-lg"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      ))}

      <ImagePreviewDialog
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        imageUrl={previewUrl}
        title={previewTitle}
      />
    </div>
  )
}
