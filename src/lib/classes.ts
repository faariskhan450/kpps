// The classes offered, shared across signup, attendance, etc.
export const CLASS_OPTIONS = [
  "Playgroup",
  "Nursery",
  "LKG",
  "UKG",
  "Class 1",
  "Class 2",
  "Class 3",
  "Class 4",
  "Class 5",
] as const;

export type ClassName = (typeof CLASS_OPTIONS)[number];
