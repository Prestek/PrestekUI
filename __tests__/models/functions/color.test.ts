import { getColorByStatus, getBackgroundColorByStatus } from '../../../models/functions/color';
import { LoanRequestStatus } from '../../../models/enums/Request';

describe('color functions', () => {
  describe('getColorByStatus', () => {
    it('should return yellow color for PENDING status', () => {
      const result = getColorByStatus(LoanRequestStatus.PENDING);
      expect(result).toBe('rgb(124, 108, 18)');
    });

    it('should return red color for REJECTED status', () => {
      const result = getColorByStatus(LoanRequestStatus.REJECTED);
      expect(result).toBe('rgb(127, 29, 29)');
    });

    it('should return green color for APPROVED status', () => {
      const result = getColorByStatus(LoanRequestStatus.APPROVED);
      expect(result).toBe('rgb(20, 83, 45)');
    });

    it('should return green color for unknown status (default)', () => {
      const result = getColorByStatus('UNKNOWN' as LoanRequestStatus);
      expect(result).toBe('rgb(20, 83, 45)');
    });
  });

  describe('getBackgroundColorByStatus', () => {
    it('should return yellow background for PENDING status', () => {
      const result = getBackgroundColorByStatus(LoanRequestStatus.PENDING);
      expect(result).toBe('rgba(249, 207, 22, 0.18)');
    });

    it('should return red background for REJECTED status', () => {
      const result = getBackgroundColorByStatus(LoanRequestStatus.REJECTED);
      expect(result).toBe('rgba(239, 68, 68, 0.15)');
    });

    it('should return green background for APPROVED status', () => {
      const result = getBackgroundColorByStatus(LoanRequestStatus.APPROVED);
      expect(result).toBe('rgba(28, 196, 90, 0.18)');
    });

    it('should return green background for unknown status (default)', () => {
      const result = getBackgroundColorByStatus('UNKNOWN');
      expect(result).toBe('rgba(28, 196, 90, 0.18)');
    });

    it('should return green background for empty string', () => {
      const result = getBackgroundColorByStatus('');
      expect(result).toBe('rgba(28, 196, 90, 0.18)');
    });
  });

  describe('color consistency', () => {
    it('should have consistent color scheme for each status', () => {
      // PENDING - yellow tones
      const pendingColor = getColorByStatus(LoanRequestStatus.PENDING);
      const pendingBg = getBackgroundColorByStatus(LoanRequestStatus.PENDING);
      expect(pendingColor).toContain('rgb');
      expect(pendingBg).toContain('rgba');

      // REJECTED - red tones
      const rejectedColor = getColorByStatus(LoanRequestStatus.REJECTED);
      const rejectedBg = getBackgroundColorByStatus(LoanRequestStatus.REJECTED);
      expect(rejectedColor).toContain('rgb');
      expect(rejectedBg).toContain('rgba');

      // APPROVED - green tones
      const approvedColor = getColorByStatus(LoanRequestStatus.APPROVED);
      const approvedBg = getBackgroundColorByStatus(LoanRequestStatus.APPROVED);
      expect(approvedColor).toContain('rgb');
      expect(approvedBg).toContain('rgba');
    });
  });
});
