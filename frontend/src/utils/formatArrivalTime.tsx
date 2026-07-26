export function formatArrivalTime(
  departure: string,
  durationSeconds: number
) {
  const [hours, minutes] = departure.split(":").map(Number);

  const departureDate = new Date();

  departureDate.setHours(hours);
  departureDate.setMinutes(minutes);
  departureDate.setSeconds(0);

  const arrival = new Date(
    departureDate.getTime() + durationSeconds * 1000
  );

  const dayDifference =
    arrival.getDate() - departureDate.getDate();

  const arrivalTime = arrival.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (dayDifference === 0) return arrivalTime;

  if (dayDifference === 1)
    return `${arrivalTime} (Next Day)`;

  return `${arrivalTime} (+${dayDifference} days)`;
}