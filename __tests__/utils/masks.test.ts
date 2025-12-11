import { formatAmount } from '../../utils/masks';

describe('masks utility', () => {
  describe('formatAmount', () => {
    it('should format a simple number', () => {
      const setAmount = jest.fn();
      const result = formatAmount('1600000', setAmount);

      expect(setAmount).toHaveBeenCalledWith('1600000');
      expect(result).toBe('1600000');
    });

    it('should clean non-numeric characters', () => {
      const setAmount = jest.fn();
      const result = formatAmount('$1.600.000', setAmount);

      expect(setAmount).toHaveBeenCalledWith('1600000');
      expect(result).toBe('1600000');
    });

    it('should handle empty string', () => {
      const setAmount = jest.fn();
      const result = formatAmount('', setAmount);

      expect(setAmount).toHaveBeenCalledWith('');
      expect(result).toBe('');
    });

    it('should handle string with only non-numeric characters', () => {
      const setAmount = jest.fn();
      const result = formatAmount('abc', setAmount);

      expect(setAmount).toHaveBeenCalledWith('');
      expect(result).toBe('');
    });

    it('should handle mixed alphanumeric string', () => {
      const setAmount = jest.fn();
      const result = formatAmount('a1b2c3', setAmount);

      expect(setAmount).toHaveBeenCalledWith('123');
      expect(result).toBe('123');
    });

    it('should handle decimal input by removing dots', () => {
      const setAmount = jest.fn();
      const result = formatAmount('1.500.000', setAmount);

      expect(setAmount).toHaveBeenCalledWith('1500000');
      expect(result).toBe('1500000');
    });

    it('should handle single digit', () => {
      const setAmount = jest.fn();
      const result = formatAmount('5', setAmount);

      expect(setAmount).toHaveBeenCalledWith('5');
      expect(result).toBe('5');
    });

    it('should handle large numbers', () => {
      const setAmount = jest.fn();
      const result = formatAmount('999999999999', setAmount);

      expect(setAmount).toHaveBeenCalledWith('999999999999');
      expect(result).toBe('999999999999');
    });

    it('should handle leading zeros', () => {
      const setAmount = jest.fn();
      const result = formatAmount('00001234', setAmount);

      expect(setAmount).toHaveBeenCalledWith('00001234');
      expect(result).toBe('00001234');
    });

    it('should handle spaces in input', () => {
      const setAmount = jest.fn();
      const result = formatAmount('1 000 000', setAmount);

      expect(setAmount).toHaveBeenCalledWith('1000000');
      expect(result).toBe('1000000');
    });
  });
});
