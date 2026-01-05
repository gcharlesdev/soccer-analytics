/**
 * Format a date string to readable format
 */
export function formatMatchDate(utcDate: string): string {
  const date = new Date(utcDate);
  return date.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

/**
 * Format time from UTC date string
 */
export function formatMatchTime(utcDate: string): string {
  const date = new Date(utcDate);
  return date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Format goal difference with + prefix for positive
 */
export function formatGoalDifference(gd: number): string {
  if (gd > 0) return `+${gd}`;
  return String(gd);
}

/**
 * Get CSS class for goal difference color
 */
export function getGoalDifferenceColor(gd: number): string {
  if (gd > 0) return "text-green-400";
  if (gd < 0) return "text-red-400";
  return "text-gray-400";
}
