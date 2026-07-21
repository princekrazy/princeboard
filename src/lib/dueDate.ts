export function getDueDateStatus(dueDate?: string | null) {
  if (!dueDate) {
    return null;
  }

  const today = new Date();

  today.setHours(0, 0, 0, 0);

  const date = new Date(dueDate);

  date.setHours(0, 0, 0, 0);

  const difference = Math.ceil(
    (date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
  );

  if (difference < 0) {
    return {
      label: "Overdue",
      type: "overdue",
    };
  }

  if (difference === 0) {
    return {
      label: "Due Today",
      type: "today",
    };
  }

  if (difference <= 3) {
    return {
      label: `Due in ${difference} days`,
      type: "soon",
    };
  }

  return {
    label: date.toLocaleDateString(),

    type: "normal",
  };
}
