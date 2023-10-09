import path from "path";
import { promises as fs } from "fs";

// eslint-disable-next-line import/prefer-default-export
export async function GET() {
  try {
    const jsonDirectory = path.join(process.cwd(), "app/json");

    const [uiTextContents, timeEntriesContents] = await Promise.all([
      fs.readFile(`${jsonDirectory}/ui_text.json`, "utf8"),
      fs.readFile(`${jsonDirectory}/time_entries.json`, "utf8"),
    ]);

    const parsedUiTextContents = JSON.parse(uiTextContents);
    const parsedTimeEntriesContents = JSON.parse(timeEntriesContents);

    const responseBody = JSON.stringify({
      uiText: parsedUiTextContents,
      timeEntries: parsedTimeEntriesContents,
    });

    return new Response(responseBody, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
}
