/** The Jalali year in Tehran time, in Persian digits, for example «۱۴۰۵». */
export function jalaliYear(date: Date = new Date()): string {
  return new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    timeZone: "Asia/Tehran",
    year: "numeric",
  })
    .format(date)
    .replace(/[^۰-۹]/g, "");
}
