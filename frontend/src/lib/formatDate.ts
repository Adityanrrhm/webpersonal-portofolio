export function formatDate(dateStr: string): string {
  if (!dateStr) return dateStr;
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    const [y, m, d] = dateStr.split("-");
    return `${d}/${m}/${y.slice(2)}`;
  }
  return dateStr;
}
