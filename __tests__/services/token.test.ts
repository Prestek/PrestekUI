import { createAuthHeaders, createAuthHeadersWithBankCode } from '../../services/token';

describe('token service', () => {
  describe('createAuthHeaders', () => {
    it('should create headers with Bearer token', () => {
      const token = 'test-token-123';
      const result = createAuthHeaders(token);

      expect(result).toEqual({
        headers: {
          Authorization: 'Bearer test-token-123',
        },
      });
    });

    it('should handle empty token', () => {
      const token = '';
      const result = createAuthHeaders(token);

      expect(result).toEqual({
        headers: {
          Authorization: 'Bearer ',
        },
      });
    });

    it('should handle token with special characters', () => {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0';
      const result = createAuthHeaders(token);

      expect(result).toEqual({
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    });
  });

  describe('createAuthHeadersWithBankCode', () => {
    it('should create headers with Bearer token and bank code', () => {
      const token = 'test-token-123';
      const bankCode = 'DAVI';
      const result = createAuthHeadersWithBankCode(token, bankCode);

      expect(result).toEqual({
        headers: {
          Authorization: 'Bearer test-token-123',
          'X-Bank-Code': 'DAVI',
        },
      });
    });

    it('should handle different bank codes', () => {
      const token = 'test-token';
      
      const resultBCO = createAuthHeadersWithBankCode(token, 'BCO');
      expect(resultBCO.headers['X-Bank-Code']).toBe('BCO');

      const resultCOLT = createAuthHeadersWithBankCode(token, 'COLT');
      expect(resultCOLT.headers['X-Bank-Code']).toBe('COLT');
    });

    it('should handle empty values', () => {
      const result = createAuthHeadersWithBankCode('', '');

      expect(result).toEqual({
        headers: {
          Authorization: 'Bearer ',
          'X-Bank-Code': '',
        },
      });
    });
  });
});
