import { NextResponse } from "next/server";
import { writeFile, readFile } from "fs/promises";
import { join } from "path";
import { tmpdir } from "os";
import { randomUUID } from "crypto";

// This function will be used in a Node.js environment
export async function POST(request: Request) {
  try {
    console.log("PDF parsing route called");

    // Check if the request is a multipart form
    if (!request.headers.get("content-type")?.includes("multipart/form-data")) {
      console.error(
        "Invalid content type:",
        request.headers.get("content-type")
      );
      return NextResponse.json(
        { error: "Request must be multipart/form-data" },
        { status: 400 }
      );
    }

    // Parse the form data
    console.log("Parsing form data");
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      console.error("No file provided in form data");
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    console.log(
      "File received:",
      file.name,
      "Size:",
      file.size,
      "Type:",
      file.type
    );

    // Check if it's a PDF
    if (file.type !== "application/pdf") {
      console.error("Invalid file type:", file.type);
      return NextResponse.json(
        { error: "File must be a PDF" },
        { status: 400 }
      );
    }

    // Convert the file to a Buffer
    console.log("Converting file to buffer");
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Simple text extraction approach
    try {
      console.log("Using simple text extraction approach");

      // Create a temporary file path
      const tempFilePath = join(tmpdir(), `${randomUUID()}.pdf`);
      console.log("Temp file path:", tempFilePath);

      // Write the buffer to a temporary file
      await writeFile(tempFilePath, buffer);
      console.log("File written to temp location");

      // Try to extract text using a simple approach
      // This won't work perfectly for all PDFs but should extract some text
      let extractedText = "";

      try {
        // Try to read the file as text
        const rawText = await readFile(tempFilePath, "utf8");
        extractedText = extractReadableText(rawText);
        console.log(
          "Text extracted using simple method, length:",
          extractedText.length
        );
      } catch (readError) {
        console.error("Error reading PDF as text:", readError);
        extractedText = "Failed to extract text from PDF";
      }

      return NextResponse.json({
        text: extractedText,
        warning:
          "Used simple text extraction which may not extract all text correctly",
      });
    } catch (error) {
      console.error("Error in simple text extraction:", error);
      return NextResponse.json(
        {
          error: "Failed to extract text from PDF",
          details: error instanceof Error ? error.message : "Unknown error",
        },
        { status: 500 }
      );
    }
  } catch (error: Error | unknown) {
    console.error("Error in PDF parsing route:", error);
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

/**
 * Extracts readable text from raw PDF content using regex
 */
function extractReadableText(rawContent: string): string {
  // Remove binary content and keep only printable ASCII characters
  const textOnly = rawContent.replace(/[\x00-\x1F\x7F-\xFF]/g, " ");

  // Remove excessive whitespace
  const cleanedText = textOnly.replace(/\s+/g, " ").trim();

  // Extract potential text content using common PDF text markers
  const textMarkers = [
    /\/Text\s*\[(.*?)\]/g,
    /\/Contents\s*\[(.*?)\]/g,
    /\(([A-Za-z0-9\s.,;:'"!?-]+)\)/g,
  ];

  let extractedText = "";

  for (const marker of textMarkers) {
    const matches = rawContent.matchAll(marker);
    for (const match of matches) {
      if (match[1] && match[1].length > 3) {
        // Only consider matches with some content
        extractedText += match[1] + " ";
      }
    }
  }

  // If we extracted some text with markers, use that
  if (extractedText.length > 50) {
    return extractedText.trim();
  }

  // Otherwise return the cleaned text
  return cleanedText || "No readable text could be extracted";
}
