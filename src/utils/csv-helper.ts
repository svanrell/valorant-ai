import * as fs from "fs";
import * as path from "path";

export function saveToCsv<T>(
  filename: string,
  data: T[],
  headers: string[],
  mapper: (item: T) => (string | number | boolean | null | undefined)[],
) {
  try {
    const dirPath = path.join(process.cwd(), "infoApi");
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    const filePath = path.join(dirPath, filename);

    // Escape helper for CSV values
    const escapeCsv = (val: any) => {
      if (val === null || val === undefined) return "";
      let str = String(val);
      // Replace newlines and carriage returns with spaces
      str = str.replace(/[\r\n]+/g, " ");
      // If the value contains a comma, quote, or newline, escape quotes and wrap in quotes
      if (str.includes(",") || str.includes('"') || str.includes("\n")) {
        str = `"${str.replace(/"/g, '""')}"`;
      }
      return str;
    };

    const headerLine = headers.join(",");
    const rows = data.map((item) => mapper(item).map(escapeCsv).join(","));
    const csvContent = [headerLine, ...rows].join("\n");

    fs.writeFileSync(filePath, csvContent, "utf8");
    console.log(`[CSV] Successfully saved: ${filePath}`);
  } catch (error) {
    console.error(`[CSV] Error saving ${filename}:`, error);
  }
}

export function appendToCsv<T>(
  filename: string,
  data: T[],
  headers: string[],
  mapper: (item: T) => (string | number | boolean | null | undefined)[],
) {
  try {
    const dirPath = path.join(process.cwd(), "infoApi");
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    const filePath = path.join(dirPath, filename);
    const fileExists = fs.existsSync(filePath);

    // Escape helper for CSV values
    const escapeCsv = (val: any) => {
      if (val === null || val === undefined) return "";
      let str = String(val);
      str = str.replace(/[\r\n]+/g, " ");
      if (str.includes(",") || str.includes('"') || str.includes("\n")) {
        str = `"${str.replace(/"/g, '""')}"`;
      }
      return str;
    };

    const rows = data.map((item) => mapper(item).map(escapeCsv).join(","));
    let csvContent = "";

    if (!fileExists) {
      // Write headers + rows
      const headerLine = headers.join(",");
      csvContent = [headerLine, ...rows].join("\n") + "\n";
      fs.writeFileSync(filePath, csvContent, "utf8");
    } else {
      // Append rows only
      csvContent = rows.join("\n") + "\n";
      fs.appendFileSync(filePath, csvContent, "utf8");
    }
    console.log(`[CSV Appended] Saved in: ${filePath}`);
  } catch (error) {
    console.error(`[CSV] Error in appendToCsv ${filename}:`, error);
  }
}
