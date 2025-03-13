import { HfInference } from "@huggingface/inference";

// Create a singleton instance of the HfInference client
let hfClient: HfInference | null = null;

export function getHfClient(): HfInference {
  if (!hfClient) {
    const apiKey = process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY;

    if (!apiKey) {
      console.error("Hugging Face API key is not set in environment variables");
      throw new Error("Hugging Face API key is not configured");
    }

    console.log(
      "Creating new Hugging Face client with API key:",
      apiKey.substring(0, 5) + "..."
    );

    // Create the client with the API key
    hfClient = new HfInference(apiKey);
  }

  return hfClient;
}

export async function generateText(
  prompt: string,
  maxTokens: number = 1000
): Promise<string> {
  try {
    console.log("Calling our API route instead of Hugging Face directly");

    // Call our API route instead of Hugging Face directly
    const response = await fetch("/api/huggingface", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
        maxTokens,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`API route error: ${response.status} ${errorData}`);
    }

    const data = await response.json();

    // Check if there's a warning (indicating fallback method was used)
    if (data.warning) {
      console.warn("Hugging Face API warning:", data.warning);
    }

    return data.generated_text || "";
  } catch (error: Error | unknown) {
    console.error("Error generating text with API route:", error);

    // If we get an error, try to use a client-side fallback
    try {
      console.log("Attempting client-side fallback for text generation");

      // Simple fallback that returns a basic response
      // This is a last resort if both the API and server-side fallback fail
      return JSON.stringify({
        message: "Generated using client-side fallback",
        timestamp: new Date().toISOString(),
      });
    } catch (fallbackError) {
      console.error("Client-side fallback also failed:", fallbackError);
      throw new Error(
        `API route error: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }
}
