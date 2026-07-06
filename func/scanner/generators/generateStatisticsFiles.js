import fs from "fs/promises";
import path from "path";

function calculateStatistics(files, folders) {
  const totalSize = files.reduce((sum, file) => sum + file.size, 0);

  const byExtension = {};

  for (const file of files) {
    const ext = file.extension || "[no extension]";
    byExtension[ext] = (byExtension[ext] || 0) + 1;
  }

  const largestFiles = [...files]
    .sort((a, b) => b.size - a.size)
    .slice(0, 20);

  return {
    totalFiles: files.length,
    totalFolders: folders.length,
    totalSizeBytes: totalSize,
    averageFileSizeBytes: files.length ? Math.round(totalSize / files.length) : 0,
    byExtension,
    largestFiles,
  };
}

function generateStatisticsMarkdown(statistics) {
  const extensionRows = Object.entries(statistics.byExtension)
    .sort((a, b) => b[1] - a[1])
    .map(([extension, count]) => `| ${extension} | ${count} |`)
    .join("\n");

  const largestRows = statistics.largestFiles
    .map((file) => `| ${file.path} | ${file.size} bytes |`)
    .join("\n");

  return `# Project Statistics

## Summary

| Metric | Value |
|---|---:|
| Total Files | ${statistics.totalFiles} |
| Total Folders | ${statistics.totalFolders} |
| Total Size | ${statistics.totalSizeBytes} bytes |
| Average File Size | ${statistics.averageFileSizeBytes} bytes |

## Files By Extension

| Extension | Count |
|---|---:|
${extensionRows || "| - | - |"}

## Largest Files

| File | Size |
|---|---:|
${largestRows || "| - | - |"}
`;
}

export async function generateStatisticsFiles(projectPath, projectDir, files, folders) {
  const statistics = calculateStatistics(files, folders);

  await fs.writeFile(
    path.join(projectDir, "statistics.json"),
    JSON.stringify(statistics, null, 2),
    "utf8"
  );

  await fs.writeFile(
    path.join(projectDir, "statistics.md"),
    generateStatisticsMarkdown(statistics),
    "utf8"
  );

  return statistics;
}