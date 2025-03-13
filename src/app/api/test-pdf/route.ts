import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function GET() {
  try {
    console.log("Testing PDF parsing functionality");

    // Try to import pdf-parse
    let pdfParse;
    try {
      pdfParse = (await import("pdf-parse")).default;
      console.log("pdf-parse imported successfully");
    } catch (importError) {
      console.error("Error importing pdf-parse:", importError);
      return NextResponse.json(
        {
          error: `Failed to import pdf-parse: ${
            importError instanceof Error ? importError.message : "Unknown error"
          }`,
        },
        { status: 500 }
      );
    }

    // Return success message
    return NextResponse.json({
      status: "success",
      message: "PDF parsing module imported successfully",
      nodeVersion: process.version,
      platform: process.platform,
      arch: process.arch,
    });
  } catch (error) {
    console.error("Error in test PDF route:", error);
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
