// Helper functions for analyze functionality
// These are exported for testing purposes

export function isValidUrl(urlString: string): boolean {
  try {
    const url = new URL(urlString);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export function generateAnalysisId(): string {
  return `analysis_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Additional helper functions that might be useful
export function formatLoadTime(ms: number): string {
  return `${ms}ms`;
}

export function sanitizeUrl(url: string): string {
  try {
    const urlObj = new URL(url);
    return urlObj.toString();
  } catch {
    return url;
  }
}
