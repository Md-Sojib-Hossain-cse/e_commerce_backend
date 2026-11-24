import multer from "multer";

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB per file
  },
});

// Only text fields, no files
export const uploadTextOnly = () => upload.none();

// Single image
export const uploadSingleImage = (fieldName: string) => {
  return upload.single(fieldName);
};

// Multiple images with the same field name
export const uploadMultipleImages = (fieldName: string, maxCount: number) =>
  upload.array(fieldName, maxCount);

// Multiple images with different field names
export const uploadMultipleFields = (
  fields: { name: string; maxCount: number }[],
) => upload.fields(fields);
