import path from "path";
import { promises as fs } from "fs";
import { NextResponse } from "next/server";

export default async function GET() {
  try {
    const jsonDirectory = path.join(process.cwd(), "app/json");

    const [uiTextContents, timeEntriesContents] = await Promise.all([
      fs.readFile(`${jsonDirectory}/ui_text.json`, "utf8"),
      fs.readFile(`${jsonDirectory}/time_entries.json`, "utf8"),
    ]);

    const parsedUiTextContents = JSON.parse(uiTextContents);
    const parsedTimeEntriesContents = JSON.parse(timeEntriesContents);

    return NextResponse.json({
      uiText: parsedUiTextContents,
      timeEntries: parsedTimeEntriesContents,
    });
  } catch (error) {
    return "Internal Server Error";
  }
}
