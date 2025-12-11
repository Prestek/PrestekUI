export function formatDate(applicationDate: string | number[]): string {
  return typeof applicationDate === "string"
    ? new Date(applicationDate).toLocaleDateString("es-CO")
    : Array.isArray(applicationDate)
    ? new Date(
        applicationDate[0],
        applicationDate[1] - 1,
        applicationDate[2]
      ).toLocaleDateString("es-CO")
    : String(applicationDate);
}

export function formatDateTime(applicationDate: string | number[]): string {
  return typeof applicationDate === "string"
    ? new Date(applicationDate).toLocaleDateString("es-CO", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : Array.isArray(applicationDate)
    ? new Date(
        applicationDate[0],
        applicationDate[1] - 1,
        applicationDate[2],
        applicationDate[3] || 0,
        applicationDate[4] || 0
      ).toLocaleDateString("es-CO", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : String(applicationDate);
}
