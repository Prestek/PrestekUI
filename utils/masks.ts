/**
 * Crea una máscara dinámica para moneda colombiana
 * Formato: $1.600.000
 */
export const formatAmount = (
  text: string,
  setAmount: (amount: string) => void
) => {
  const cleanText = text.replace(/[^0-9]/g, "");
  if (cleanText) {
    const formatted = new Intl.NumberFormat("es-CO").format(
      parseInt(cleanText)
    );
    setAmount(cleanText);
    return cleanText;
  }
  setAmount("");
  return "";
};
