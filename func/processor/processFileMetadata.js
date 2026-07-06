import { extractImports } from "./extractImports.js";
import { extractExports } from "./extractExports.js";
import { extractFunctions } from "./extractFunctions.js";
import { extractClasses } from "./extractClasses.js";
import { extractHtmlSignals } from "./extractHtmlSignals.js";

export function processFileMetadata(metadata, source) {
  const language = metadata.language || "";

  const imports = extractImports(source, language);
  const exports = extractExports(source, language);
  const functions = extractFunctions(source, language);
  const classes = extractClasses(source, language);

  const htmlSignals =
    language === "HTML" || metadata.extension === ".html"
      ? extractHtmlSignals(source)
      : null;

  return {
    ...metadata,

    imports,
    exports,
    functions,
    classes,

    htmlSignals,

    status: {
      ...metadata.status,
      parsed: true,
      indexed: true,
    },

    processedAt: new Date().toISOString(),
  };
}