function reportRow(name, report) {
  return `| ${name} | ${report.json} | ${report.markdown} |`;
}

export function generateProjectReport(index) {
  const reports = index.reports || {};

  return `# Project Master Index

## Summary

| Field | Value |
|---|---|
| Generated At | ${index.generatedAt} |
| Project Path | ${index.projectPath} |
| Total Files | ${index.summary.totalFiles} |
| Total Folders | ${index.summary.totalFolders} |
| Primary Language | ${index.summary.primaryLanguage} |
| Frameworks | ${index.summary.frameworks.join(", ")} |
| Package Manager | ${index.summary.packageManager} |
| Git Repository | ${index.summary.isGitRepository ? "Yes" : "No"} |

## Entry Points

${
  index.summary.entryPoints.length
    ? index.summary.entryPoints.map((entry) => `- ${entry}`).join("\n")
    : "- None detected"
}

## Reports

| Report | JSON | Markdown |
|---|---|---|
${Object.entries(reports)
  .map(([name, report]) => reportRow(name, report))
  .join("\n")}
`;
}