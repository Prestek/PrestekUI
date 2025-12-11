/**
 * Crea una máscara dinámica para moneda colombiana
 * Formato: $1.600.000
 */
export const formatAmount = (
  text: string,
  setAmount: (amount: string) => void
) => {
  const cleanText = text.replaceAll(/[^0-9]/g, "");
  if (cleanText) {
    const formatted = new Intl.NumberFormat("es-CO").format(
      Number.parseInt(cleanText)
    );
    setAmount(cleanText);
    console.log(formatted);
    return cleanText;
  }
  setAmount("");
  return "";
};
