// Weekdays used by the timetable. Index matches day_of_week (1 = Mon).
export const DAYS = [
  { value: 1, label: "Monday" },
  { value: 2, label: "Tuesday" },
  { value: 3, label: "Wednesday" },
  { value: 4, label: "Thursday" },
  { value: 5, label: "Friday" },
  { value: 6, label: "Saturday" },
] as const;

export function dayLabel(value: number) {
  return DAYS.find((d) => d.value === value)?.label ?? "";
}
