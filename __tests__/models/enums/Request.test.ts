import {
  LoanRequestStatus,
  LoanRequestStatusLabel,
  BankCode,
  BankCodeLabel,
} from '../../../models/enums/Request';

describe('Request enums', () => {
  describe('LoanRequestStatus enum', () => {
    it('should have PENDING status', () => {
      expect(LoanRequestStatus.PENDING).toBe('PENDING');
    });

    it('should have APPROVED status', () => {
      expect(LoanRequestStatus.APPROVED).toBe('APPROVED');
    });

    it('should have REJECTED status', () => {
      expect(LoanRequestStatus.REJECTED).toBe('REJECTED');
    });

    it('should have exactly 3 statuses', () => {
      const statuses = Object.values(LoanRequestStatus);
      expect(statuses).toHaveLength(3);
      expect(statuses).toContain('PENDING');
      expect(statuses).toContain('APPROVED');
      expect(statuses).toContain('REJECTED');
    });
  });

  describe('LoanRequestStatusLabel', () => {
    it('should have label for PENDING', () => {
      expect(LoanRequestStatusLabel.PENDING).toBe('Pendiente');
    });

    it('should have label for APPROVED', () => {
      expect(LoanRequestStatusLabel.APPROVED).toBe('Aprobada');
    });

    it('should have label for REJECTED', () => {
      expect(LoanRequestStatusLabel.REJECTED).toBe('Rechazada');
    });

    it('should map all enum values to labels', () => {
      Object.values(LoanRequestStatus).forEach((status) => {
        expect(LoanRequestStatusLabel[status]).toBeDefined();
        expect(typeof LoanRequestStatusLabel[status]).toBe('string');
      });
    });

    it('should have Spanish labels', () => {
      // All labels should be in Spanish
      expect(LoanRequestStatusLabel.PENDING).toMatch(/^[A-Za-záéíóúñÁÉÍÓÚÑ]+$/);
      expect(LoanRequestStatusLabel.APPROVED).toMatch(/^[A-Za-záéíóúñÁÉÍÓÚÑ]+$/);
      expect(LoanRequestStatusLabel.REJECTED).toMatch(/^[A-Za-záéíóúñÁÉÍÓÚÑ]+$/);
    });
  });

  describe('BankCode enum', () => {
    it('should have DAVI code', () => {
      expect(BankCode.DAVI).toBe('DAVI');
    });

    it('should have BCO code', () => {
      expect(BankCode.BCO).toBe('BCO');
    });

    it('should have COLT code', () => {
      expect(BankCode.COLT).toBe('COLT');
    });

    it('should have exactly 3 bank codes', () => {
      const codes = Object.values(BankCode);
      expect(codes).toHaveLength(3);
      expect(codes).toContain('DAVI');
      expect(codes).toContain('BCO');
      expect(codes).toContain('COLT');
    });
  });

  describe('BankCodeLabel', () => {
    it('should have label for DAVI', () => {
      expect(BankCodeLabel.DAVI).toBe('Davivienda');
    });

    it('should have label for BCO', () => {
      expect(BankCodeLabel.BCO).toBe('Bancolombia');
    });

    it('should have label for COLT', () => {
      expect(BankCodeLabel.COLT).toBe('Coltefinanciera');
    });

    it('should map all enum values to labels', () => {
      Object.values(BankCode).forEach((code) => {
        expect(BankCodeLabel[code]).toBeDefined();
        expect(typeof BankCodeLabel[code]).toBe('string');
      });
    });

    it('should have meaningful bank names', () => {
      // Bank names should have proper length
      expect(BankCodeLabel.DAVI.length).toBeGreaterThan(3);
      expect(BankCodeLabel.BCO.length).toBeGreaterThan(3);
      expect(BankCodeLabel.COLT.length).toBeGreaterThan(3);
    });
  });

  describe('enum usage patterns', () => {
    it('should be usable in switch statements', () => {
      const getStatusMessage = (status: LoanRequestStatus): string => {
        switch (status) {
          case LoanRequestStatus.PENDING:
            return 'En proceso';
          case LoanRequestStatus.APPROVED:
            return 'Aprobado';
          case LoanRequestStatus.REJECTED:
            return 'Rechazado';
          default:
            return 'Desconocido';
        }
      };

      expect(getStatusMessage(LoanRequestStatus.PENDING)).toBe('En proceso');
      expect(getStatusMessage(LoanRequestStatus.APPROVED)).toBe('Aprobado');
      expect(getStatusMessage(LoanRequestStatus.REJECTED)).toBe('Rechazado');
    });

    it('should be usable as object keys', () => {
      const statusColors: Record<LoanRequestStatus, string> = {
        [LoanRequestStatus.PENDING]: 'yellow',
        [LoanRequestStatus.APPROVED]: 'green',
        [LoanRequestStatus.REJECTED]: 'red',
      };

      expect(statusColors[LoanRequestStatus.PENDING]).toBe('yellow');
      expect(statusColors[LoanRequestStatus.APPROVED]).toBe('green');
      expect(statusColors[LoanRequestStatus.REJECTED]).toBe('red');
    });

    it('should be usable for type checking', () => {
      const isValidStatus = (status: string): status is LoanRequestStatus => {
        return Object.values(LoanRequestStatus).includes(status as LoanRequestStatus);
      };

      expect(isValidStatus('PENDING')).toBe(true);
      expect(isValidStatus('APPROVED')).toBe(true);
      expect(isValidStatus('REJECTED')).toBe(true);
      expect(isValidStatus('INVALID')).toBe(false);
    });

    it('should be usable for bank code validation', () => {
      const isValidBankCode = (code: string): code is BankCode => {
        return Object.values(BankCode).includes(code as BankCode);
      };

      expect(isValidBankCode('DAVI')).toBe(true);
      expect(isValidBankCode('BCO')).toBe(true);
      expect(isValidBankCode('COLT')).toBe(true);
      expect(isValidBankCode('INVALID')).toBe(false);
    });
  });
});
