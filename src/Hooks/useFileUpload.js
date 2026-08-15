import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { uploadFilesInit } from "@/api";
import { compressImageIfNeeded } from "@/utils/imageCompression";


export const useFileUpload = () => {
    const [loading, setLoading] = useState(false);

    // Mutation to initialize upload (get signed URLs)
    const initUploadMutation = useMutation({
        mutationFn: async (data) => {
            const response = await uploadFilesInit(data);
            if (!response.status) {
                throw new Error(response.errorMsg || "Failed to initialize upload");
            }
            return response.data;
        },
    });

    // Helper to upload a single file to a signed URL
    const uploadFileToUrl = async (file, signedUrl) => {
        const uploadRes = await fetch(signedUrl, {
            method: "PUT",
            headers: {
                "Content-Type": file.type,
            },
            body: file,
        });

        if (!uploadRes.ok) {
            throw new Error(`Failed to upload file: ${file.name}`);
        }
        return true;
    };

    /**
     * Uploads one or more files
     * @param {Object} params
     * @param {File|File[]} params.files - Single file or array of files
     * @param {string} params.ownerId - The ID of the owner entity
     * @param {string} params.ownerType - The type of owner (from FileOwnerTypes)
     * @param {Array} params.attachments - Optional list of existing attachment IDs
     */
    const uploadFiles = async ({ files, ownerId, ownerType, attachments = [] }) => {
        const fileList = Array.isArray(files) ? files : [files];

        try {
            setLoading(true);

            // Compress any image files in the list before upload
            const compressedFileList = await Promise.all(
                fileList.map((file) => compressImageIfNeeded(file))
            );

            // 1. Prepare Files Metadata
            const filesMetadata = compressedFileList.map((file) => ({
                fileName: file.name,
                fileType: file.type,
                fileSize: file.size,
            }));

            const payload = {
                ownerId,
                ownerType,
                files: filesMetadata,
                attachments,
            };

            // 2. Get pre-signed URLs from backend
            const initData = await initUploadMutation.mutateAsync(payload);

            // Access the nested signedUrls array
            // Structure: initData.data is an array of objects, first object has signedUrls array
            const signedUrlsList = initData?.data?.[0]?.signedUrls || [];

            if (!signedUrlsList.length && compressedFileList.length > 0) {
                // Check if it might be a different structure or validly empty (if logic allowed)
                // But for files > 0 we expect URLs
                console.error("Unexpected response structure:", initData);
                throw new Error("Failed to retrieve signed URLs from server");
            }

            // 3. Upload each file to its corresponding signed URL
            const uploadPromises = compressedFileList.map((file) => {
                // Find matching signed URL object by fileName
                const fileResponse = signedUrlsList.find(item => item.fileName === file.name);
                const signedUrl = fileResponse?.signedUrl;

                if (!signedUrl) {
                    throw new Error(`Could not find signed URL for file: ${file.name}`);
                }

                return uploadFileToUrl(file, signedUrl);
            });


            await Promise.all(uploadPromises);

            // Return the backend initialization data
            return {
                success: true,
                data: initData
            };

        } catch (err) {
            console.error("Upload failed:", err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        uploadFiles,
        isLoading: loading || initUploadMutation.isPending,
        error: initUploadMutation.error,
        reset: initUploadMutation.reset,
    };
};
