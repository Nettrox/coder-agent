export function extractHtmlSignals(content) {
  const titleMatch = content.match(/<title>(.*?)<\/title>/is);

  const ids = [...content.matchAll(/\sid=["']([^"']+)["']/g)].map(
    (match) => match[1]
  );

  const classes = [...content.matchAll(/\sclass=["']([^"']+)["']/g)]
    .flatMap((match) => match[1].split(/\s+/))
    .filter(Boolean);

  const scripts = [...content.matchAll(/<script\b[^>]*>/gi)].length;
  const styles = [...content.matchAll(/<style\b[^>]*>/gi)].length;

  const buttons = [...content.matchAll(/<button\b[^>]*>(.*?)<\/button>/gis)].map(
    (match) => match[1].replace(/<[^>]+>/g, "").trim()
  );

  return {
    title: titleMatch ? titleMatch[1].trim() : "",
    ids: [...new Set(ids)],
    classes: [...new Set(classes)],
    scripts,
    styles,
    buttons,
  };
}