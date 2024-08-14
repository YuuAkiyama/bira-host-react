export function extractFileExtension(name: string, fallback: string) {
  const dotIndex = name.lastIndexOf(".");
  if (dotIndex !== -1 && !name.endsWith(".")) {
    return name.slice(dotIndex);
  }
  return fallback;
}
