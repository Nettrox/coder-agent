import { readFile } from "../reader/readFile.js";
import { calculateHash } from "../reader/calculateHash.js";
import { createFileWorkspace } from "../reader/createFileWorkspace.js";
import { shouldReadFile } from "../reader/shouldReadFile.js";
import { generateFileMetadata } from "../reader/generateFileMetadata.js";
import { generateFileMetadataMarkdown } from "../reader/generateFileMetadataMarkdown.js";

console.log("Reader imports OK");

console.log({
  readFile: typeof readFile,
  calculateHash: typeof calculateHash,
  createFileWorkspace: typeof createFileWorkspace,
  shouldReadFile: typeof shouldReadFile,
  generateFileMetadata: typeof generateFileMetadata,
  generateFileMetadataMarkdown: typeof generateFileMetadataMarkdown,
});

console.log("Reader test completed");