import imageCompression from "browser-image-compression";

const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const MAX_SIZE_MB = 0.5;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024; // 500KB

/**
 * Checks if the file is an image and compresses it iteratively
 * on the client side if its size exceeds 500KB.
 *
 * @param {File} file - The file to compress.
 * @returns {Promise<File>} The compressed file, or the original file if not an image or already <= 1MB.
 */
export const compressImageIfNeeded = async (file) => {
  if (!file) {
    return file;
  }

  // Check if file is an image and is one of the allowed types
  if (!file.type || !file.type.startsWith("image/")) {
    return file;
  }

  // If the type is image but not in our specifically allowed formats, return original
  if (!ALLOWED_IMAGE_TYPES.includes(file.type.toLowerCase())) {
    return file;
  }

  // Already less than or equal to 1MB
  if (file.size <= MAX_SIZE_BYTES) {
    return file;
  }

  try {
    let quality = 0.9;
    let compressedFile = file;

    // Iterative compression to keep quality as high as possible
    // while ensuring size falls below 1MB.
    while (compressedFile.size > MAX_SIZE_BYTES && quality > 0.1) {
      const options = {
        maxSizeMB: MAX_SIZE_MB,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
        initialQuality: quality,
      };

      const result = await imageCompression(file, options);
      
      // Ensure we retain the original file name and type
      compressedFile = new File([result], file.name, {
        type: file.type,
        lastModified: Date.now(),
      });

      quality -= 0.1;
    }

    console.log(
      `[Image Compression] Original size: ${(file.size / 1024 / 1024).toFixed(2)}MB, ` +
      `Compressed size: ${(compressedFile.size / 1024 / 1024).toFixed(2)}MB, ` +
      `File: ${file.name}`
    );

    return compressedFile;
  } catch (error) {
    console.error("Compression failed for file:", file.name, error);
    return file;
  }
};
