export function generateFileMetadataMarkdown(metadata) {
  return `# File Metadata

## General

| Field | Value |
|---|---|
| Relative Path | ${metadata.relativePath} |
| File Name | ${metadata.fileName} |
| Extension | ${metadata.extension || "-"} |
| Language | ${metadata.language} |
| Size | ${metadata.size} bytes |
| Encoding | ${metadata.encoding} |
| Hash | ${metadata.hash} |
| Modified At | ${metadata.modifiedAt} |
| Last Scan | ${metadata.lastScan} |

## Status

| Field | Value |
|---|---|
| Parsed | ${metadata.status.parsed} |
| Summarized | ${metadata.status.summarized} |
| Chunked | ${metadata.status.chunked} |
| Embedded | ${metadata.status.embedded} |
| Indexed | ${metadata.status.indexed} |

## Summary

${metadata.summary || "_No summary generated yet._"}

## Imports

\`\`\`json
${JSON.stringify(metadata.imports, null, 2)}
\`\`\`

## Exports

\`\`\`json
${JSON.stringify(metadata.exports, null, 2)}
\`\`\`

## Classes

\`\`\`json
${JSON.stringify(metadata.classes, null, 2)}
\`\`\`

## Functions

\`\`\`json
${JSON.stringify(metadata.functions, null, 2)}
\`\`\`

## Routes

\`\`\`json
${JSON.stringify(metadata.routes, null, 2)}
\`\`\`

## TODOs

\`\`\`json
${JSON.stringify(metadata.todos, null, 2)}
\`\`\`

## Warnings

\`\`\`json
${JSON.stringify(metadata.warnings, null, 2)}
\`\`\`
`;
}