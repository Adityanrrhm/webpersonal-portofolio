export function formatDate(dateStr: string): string {
  if (!dateStr) return dateStr;
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    const [y, m, d] = dateStr.split("-");
    return `${d}/${m}/${y.slice(2)}`;
  }
  return dateStr;
}

const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

export function formatPeriod(period: string | null): string {
  if (!period) return "";
  const match = period.match(/^(\d{4})-(\d{2})$/);
  if (match) {
    const m = parseInt(match[2]) - 1;
    return `${MONTHS[m]} ${match[1]}`;
  }
  return period;
}
