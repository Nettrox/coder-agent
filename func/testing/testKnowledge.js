import { buildFileContext } from "../knowledge/buildFileContext.js";

const projectPath = "/Users/irfanaksu/Desktop/deneme";

const context = await buildFileContext(projectPath, ["index.html"]);

console.log(JSON.stringify(context, null, 2));