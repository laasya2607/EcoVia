export function formatDuration(seconds: number): string {
  const totalMinutes = Math.round(seconds / 60);

  // Less than 1 hour
  if (totalMinutes < 60) {
    return `${totalMinutes} min`;
  }

  const totalHours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  // Less than 24 hours
  if (totalHours < 24) {
    if (minutes === 0) {
      return `${totalHours} hr`;
    }

    return `${totalHours} hr ${minutes} min`;
  }

  const days = Math.floor(totalHours / 24);
  const hours = totalHours % 24;

  if (hours === 0) {
    return `${days} day${days > 1 ? "s" : ""}`;
  }

  return `${days} day${days > 1 ? "s" : ""} ${hours} hr`;
}