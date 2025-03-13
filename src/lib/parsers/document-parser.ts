import mammoth from "mammoth";
// Note: You'll need to install pdf-parse with: npm install pdf-parse

/**
 * Extracts text content from various document formats
 */
export async function extractTextFromDocument(file: File): Promise<string> {
  const fileType = file.type;
  const buffer = await file.arrayBuffer();

  console.log(
    `Extracting text from ${file.name}, type: ${fileType}, size: ${file.size} bytes`
  );

  if (fileType === "application/pdf") {
    try {
      console.log("Processing PDF file");
      // For PDF files, we need to use a proper PDF parsing library
      // This requires server-side processing, so we'll send the file to an API route
      const formData = new FormData();
      formData.append("file", file);

      console.log("Sending PDF to server-side parsing endpoint");
      const response = await fetch("/api/parse-pdf", {
        method: "POST",
        body: formData,
      });

      console.log("Server response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("PDF parsing API error:", response.status, errorText);
        throw new Error(
          `PDF parsing failed: ${response.statusText}. Details: ${errorText}`
        );
      }

      const result = await response.json();

      // Check if there's a warning (indicating fallback method was used)
      if (result.warning) {
        console.warn("PDF parsing warning:", result.warning);
      }

      console.log("PDF parsed successfully, text length:", result.text.length);

      // If the text is too short, it might indicate a parsing problem
      if (
        result.text.length < 50 &&
        !result.text.includes("No readable text")
      ) {
        console.warn(
          "Extracted text is suspiciously short, might indicate parsing issues"
        );
      }

      return result.text;
    } catch (error) {
      console.error("Error parsing PDF:", error);

      // Try a client-side fallback for PDF parsing
      try {
        console.log("Attempting client-side fallback for PDF parsing");
        const text = await extractTextFromPDFClientSide(file);
        console.log(
          "Client-side fallback succeeded, text length:",
          text.length
        );
        return text;
      } catch (fallbackError) {
        console.error("Client-side fallback also failed:", fallbackError);
        throw new Error(
          `Failed to parse PDF document: ${
            error instanceof Error ? error.message : "Unknown error"
          }`
        );
      }
    }
  } else if (
    fileType ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    try {
      console.log("Processing DOCX file");
      const result = await mammoth.extractRawText({ arrayBuffer: buffer });
      console.log(
        "DOCX parsed successfully, text length:",
        result.value.length
      );
      return result.value;
    } catch (error) {
      console.error("Error parsing DOCX:", error);
      throw new Error(
        `Failed to parse DOCX document: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  } else if (fileType === "text/plain") {
    try {
      console.log("Processing plain text file");
      const text = new TextDecoder().decode(buffer);
      console.log("Text file parsed successfully, text length:", text.length);
      return text;
    } catch (error) {
      console.error("Error parsing text file:", error);
      throw new Error(
        `Failed to parse text document: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  } else {
    console.error("Unsupported file type:", fileType);
    throw new Error(`Unsupported file type: ${fileType}`);
  }
}

/**
 * Client-side fallback for PDF text extraction
 * This is a very basic approach and won't work well for most PDFs
 */
async function extractTextFromPDFClientSide(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      try {
        const text = reader.result as string;

        // Try to extract readable text
        const textOnly = text.replace(/[\x00-\x1F\x7F-\xFF]/g, " ");
        const cleanedText = textOnly.replace(/\s+/g, " ").trim();

        if (cleanedText.length > 0) {
          resolve(cleanedText);
        } else {
          reject(new Error("No readable text could be extracted client-side"));
        }
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => {
      reject(new Error("FileReader error during client-side PDF parsing"));
    };

    reader.readAsText(file);
  });
}

/**
 * Validates if the file is of an acceptable format
 */
export function isValidFileType(file: File): boolean {
  const validTypes = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "text/plain",
  ];

  const isValid = validTypes.includes(file.type);
  console.log(
    `File type validation for ${file.name}: ${isValid ? "Valid" : "Invalid"} (${
      file.type
    })`
  );
  return isValid;
}

/**
 * Validates file size (max 10MB)
 */
export function isValidFileSize(file: File): boolean {
  const maxSize = 10 * 1024 * 1024; // 10MB
  const isValid = file.size <= maxSize;
  console.log(
    `File size validation for ${file.name}: ${isValid ? "Valid" : "Invalid"} (${
      file.size
    } bytes)`
  );
  return isValid;
}

/**
 * Generates a preview of the document (first 500 characters)
 */
export function generatePreview(text: string): string {
  const maxLength = 500;
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
}
