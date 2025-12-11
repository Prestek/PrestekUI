import { EmploymentStatusLabel } from '../../models/scannerModels';
import type { EmploymentStatus, ParsedCedula, ScanResult } from '../../models/scannerModels';

describe('scannerModels', () => {
  describe('EmploymentStatusLabel', () => {
    it('should have label for Employed', () => {
      expect(EmploymentStatusLabel['Employed']).toBe('Empleado');
    });

    it('should have label for Unemployed', () => {
      expect(EmploymentStatusLabel['Unemployed']).toBe('Desempleado');
    });

    it('should have label for Self-Employed', () => {
      expect(EmploymentStatusLabel['Self-Employed']).toBe('Independiente');
    });

    it('should have label for Student', () => {
      expect(EmploymentStatusLabel['Student']).toBe('Estudiante');
    });

    it('should have label for Retired', () => {
      expect(EmploymentStatusLabel['Retired']).toBe('Jubilado');
    });

    it('should have exactly 5 employment statuses', () => {
      const statuses = Object.keys(EmploymentStatusLabel);
      expect(statuses).toHaveLength(5);
    });

    it('should have Spanish labels for all statuses', () => {
      Object.values(EmploymentStatusLabel).forEach((label) => {
        expect(typeof label).toBe('string');
        expect(label.length).toBeGreaterThan(0);
      });
    });
  });

  describe('EmploymentStatus type', () => {
    it('should accept valid employment statuses', () => {
      const validStatuses: EmploymentStatus[] = [
        'Employed',
        'Unemployed',
        'Self-Employed',
        'Student',
        'Retired',
      ];

      validStatuses.forEach((status) => {
        expect(EmploymentStatusLabel[status]).toBeDefined();
      });
    });
  });

  describe('ParsedCedula interface', () => {
    it('should allow valid cedula data', () => {
      const cedula: ParsedCedula = {
        document: '123456789',
        name: 'Juan',
        lastName: 'Pérez',
      };

      expect(cedula.document).toBe('123456789');
      expect(cedula.name).toBe('Juan');
      expect(cedula.lastName).toBe('Pérez');
    });

    it('should allow null values', () => {
      const cedula: ParsedCedula = {
        document: null,
        name: null,
        lastName: null,
      };

      expect(cedula.document).toBeNull();
      expect(cedula.name).toBeNull();
      expect(cedula.lastName).toBeNull();
    });

    it('should allow partial data', () => {
      const cedula: ParsedCedula = {
        document: '123456789',
        name: null,
        lastName: 'Pérez',
      };

      expect(cedula.document).toBe('123456789');
      expect(cedula.name).toBeNull();
      expect(cedula.lastName).toBe('Pérez');
    });
  });

  describe('ScanResult interface', () => {
    it('should allow valid scan result with parsed data', () => {
      const result: ScanResult = {
        raw: 'raw-barcode-data',
        parsed: {
          document: '123456789',
          name: 'Juan',
          lastName: 'Pérez',
        },
      };

      expect(result.raw).toBe('raw-barcode-data');
      expect(result.parsed?.document).toBe('123456789');
    });

    it('should allow scan result with null parsed data', () => {
      const result: ScanResult = {
        raw: 'invalid-barcode-data',
        parsed: null,
      };

      expect(result.raw).toBe('invalid-barcode-data');
      expect(result.parsed).toBeNull();
    });
  });

  describe('employment status usage', () => {
    it('should be usable for form validation', () => {
      const isValidEmploymentStatus = (status: string): status is EmploymentStatus => {
        return status in EmploymentStatusLabel;
      };

      expect(isValidEmploymentStatus('Employed')).toBe(true);
      expect(isValidEmploymentStatus('Invalid')).toBe(false);
    });

    it('should be usable for displaying labels', () => {
      const getLabel = (status: EmploymentStatus): string => {
        return EmploymentStatusLabel[status];
      };

      expect(getLabel('Employed')).toBe('Empleado');
      expect(getLabel('Self-Employed')).toBe('Independiente');
    });

    it('should support iteration over all options', () => {
      const options = Object.entries(EmploymentStatusLabel);
      expect(options.length).toBe(5);
      
      options.forEach(([key, value]) => {
        expect(typeof key).toBe('string');
        expect(typeof value).toBe('string');
      });
    });
  });
});
