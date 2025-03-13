import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/client";

export async function GET() {
  try {
    // Test connection to Supabase
    const { data, error } = await supabase
      .from("_test_connection")
      .select("*")
      .limit(1);

    if (error) {
      console.error("Supabase connection error:", error);
      return NextResponse.json(
        {
          success: false,
          message: "Failed to connect to Supabase",
          error: error.message,
          details: {
            url: process.env.NEXT_PUBLIC_SUPABASE_URL,
            // Don't log the full key for security reasons
            keyPreview:
              process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.substring(0, 10) +
              "...",
          },
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Successfully connected to Supabase",
      details: {
        url: process.env.NEXT_PUBLIC_SUPABASE_URL,
        // Don't log the full key for security reasons
        keyPreview:
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.substring(0, 10) + "...",
      },
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Unexpected error occurred",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
