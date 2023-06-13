function formatDayOrMonth(n: number): string {
  return `${n < 10 ? "0" : ""}${n}`;
}

export function getFormatedDate(date: Date): string {
  return (
    date.getFullYear() +
    "/" +
    // getMonth() return month starting from month 0, so it's needed to add 1
    formatDayOrMonth(date.getUTCMonth() + 1) +
    "/" +
    formatDayOrMonth(date.getUTCDate())
  );
}
