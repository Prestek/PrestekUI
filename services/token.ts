export const createAuthHeaders = (token: string) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const createAuthHeadersWithBankCode = (
  token: string,
  bankCode: string
) => ({
  headers: {
    Authorization: `Bearer ${token}`,
    "X-Bank-Code": bankCode,
  },
});
