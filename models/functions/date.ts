export function formatDate(applicationDate: string | number[]): string {
  if (typeof applicationDate === "string") {
    return new Date(applicationDate).toLocaleDateString("es-CO");
  }
  
  if (Array.isArray(applicationDate)) {
    return new Date(
      applicationDate[0],
      applicationDate[1] - 1,
      applicationDate[2]
    ).toLocaleDateString("es-CO");
  }
  
  return String(applicationDate);
}

export function formatDateTime(applicationDate: string | number[]): string {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  if (typeof applicationDate === "string") {
    return new Date(applicationDate).toLocaleDateString("es-CO", options);
  }
  
  if (Array.isArray(applicationDate)) {
    return new Date(
      applicationDate[0],
      applicationDate[1] - 1,
      applicationDate[2],
      applicationDate[3] || 0,
      applicationDate[4] || 0
    ).toLocaleDateString("es-CO", options);
  }
  
  return String(applicationDate);
}
