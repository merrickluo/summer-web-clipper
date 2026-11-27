import { readJsonResponse } from "./http";

interface YoutubeTranscript {
  transcript?: Array<{ text?: string }>;
  metadata?: { title?: string };
}

const transcriptUrl = "https://www.youtranscripts.com/api/transcript/";

export const fetchYoutubeTranscript = async (
  url: string,
): Promise<YoutubeTranscript> => {
  const response = await fetch(transcriptUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  });

  return readJsonResponse<YoutubeTranscript>(response, "YouTube transcript");
};
