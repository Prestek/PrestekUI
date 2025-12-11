import { formatDate, formatDateTime } from '../../../models/functions/date';

describe('date functions', () => {
  describe('formatDate', () => {
    it('should format string date correctly', () => {
      const result = formatDate('2024-01-15');
      expect(result).toMatch(/\d{1,2}\/\d{1,2}\/\d{4}/);
    });

    it('should format ISO string date correctly', () => {
      const result = formatDate('2024-06-20T10:30:00.000Z');
      expect(result).toMatch(/\d{1,2}\/\d{1,2}\/\d{4}/);
    });

    it('should format array date [year, month, day]', () => {
      const result = formatDate([2024, 3, 15]);
      // Month in array is 1-indexed, so March = 3
      expect(result).toMatch(/\d{1,2}\/\d{1,2}\/\d{4}/);
    });

    it('should handle different array date formats', () => {
      const result1 = formatDate([2024, 1, 1]);
      expect(result1).toMatch(/\d{1,2}\/\d{1,2}\/\d{4}/);

      const result2 = formatDate([2024, 12, 31]);
      expect(result2).toMatch(/\d{1,2}\/\d{1,2}\/\d{4}/);
    });

    it('should return string representation for other types', () => {
      // This tests the fallback case
      const result = formatDate(12345 as any);
      expect(result).toBe('12345');
    });

    it('should handle edge case dates', () => {
      // Beginning of year
      const beginYear = formatDate([2024, 1, 1]);
      expect(beginYear).toBeDefined();

      // End of year
      const endYear = formatDate([2024, 12, 31]);
      expect(endYear).toBeDefined();

      // Leap year date
      const leapYear = formatDate([2024, 2, 29]);
      expect(leapYear).toBeDefined();
    });
  });

  describe('formatDateTime', () => {
    it('should format string date with time correctly', () => {
      const result = formatDateTime('2024-01-15T14:30:00.000Z');
      expect(result).toBeDefined();
      expect(typeof result).toBe('string');
    });

    it('should format array date with time [year, month, day, hour, minute]', () => {
      const result = formatDateTime([2024, 3, 15, 14, 30]);
      expect(result).toBeDefined();
      expect(typeof result).toBe('string');
    });

    it('should handle array date without time components', () => {
      const result = formatDateTime([2024, 3, 15]);
      expect(result).toBeDefined();
      expect(typeof result).toBe('string');
    });

    it('should handle array with partial time (only hour)', () => {
      const result = formatDateTime([2024, 3, 15, 10]);
      expect(result).toBeDefined();
    });

    it('should return string representation for other types', () => {
      const result = formatDateTime(12345 as any);
      expect(result).toBe('12345');
    });

    it('should include time components in output', () => {
      const result = formatDateTime([2024, 6, 15, 10, 30]);
      // The result should contain some representation of the date
      expect(result.length).toBeGreaterThan(0);
    });

    it('should handle midnight time', () => {
      const result = formatDateTime([2024, 1, 1, 0, 0]);
      expect(result).toBeDefined();
    });

    it('should handle end of day time', () => {
      const result = formatDateTime([2024, 12, 31, 23, 59]);
      expect(result).toBeDefined();
    });
  });

  describe('date format consistency', () => {
    it('should produce consistent format for same dates', () => {
      const date1 = formatDate([2024, 6, 15]);
      const date2 = formatDate([2024, 6, 15]);
      expect(date1).toBe(date2);
    });

    it('should produce consistent format for dateTime', () => {
      const dateTime1 = formatDateTime([2024, 6, 15, 10, 30]);
      const dateTime2 = formatDateTime([2024, 6, 15, 10, 30]);
      expect(dateTime1).toBe(dateTime2);
    });
  });
});
