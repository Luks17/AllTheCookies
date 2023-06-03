
function formatDayOrMonth(n: number): string {
  return `${n < 10 ? '0' : ''}${n}`;
}

export function getFormatedDate(date: Date): string {
  return date.getFullYear() + "/" +
    formatDayOrMonth(date.getMonth()) + "/" +
    formatDayOrMonth(date.getDay());
}

