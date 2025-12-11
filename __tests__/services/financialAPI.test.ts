import axios from 'axios';
import {
  getApplicationsByUser,
  simulateLoan,
  getApplication,
  getApplicationsByBank,
  updateApplication,
} from '../../services/financialAPI';
import { LoanRequestStatus, BankCode } from '../../models/enums/Request';
import { Simulation, UpdateApplicationRequest } from '../../models/creditModels';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('financialAPI service', () => {
  const mockToken = 'test-token-123';
  const mockBankCode = BankCode.DAVI;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getApplicationsByUser', () => {
    it('should fetch applications by user id successfully', async () => {
      const mockApplications = [
        { id: 1, userId: 'user-1', amount: 5000000, status: LoanRequestStatus.PENDING },
        { id: 2, userId: 'user-1', amount: 3000000, status: LoanRequestStatus.APPROVED },
      ];
      mockedAxios.get.mockResolvedValue({ data: mockApplications });

      const result = await getApplicationsByUser('user-1', mockToken);

      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://financial-entity.eci-pigball.online/api/applications/user/user-1',
        { headers: { Authorization: `Bearer ${mockToken}` } }
      );
      expect(result.data).toEqual(mockApplications);
    });

    it('should handle errors', async () => {
      const error = new Error('Fetch failed');
      mockedAxios.get.mockRejectedValue(error);

      await expect(getApplicationsByUser('user-1', mockToken)).rejects.toThrow('Fetch failed');
    });
  });

  describe('simulateLoan', () => {
    it('should simulate loan successfully', async () => {
      const simulation: Simulation = {
        userId: 'user-1',
        amount: 5000000,
        termMonths: 12,
        monthlyIncome: 3000000,
      };
      const mockResponse = {
        recommendation: { bestOption: 'DAVI', reason: 'Best rates' },
        analysis: {},
      };
      mockedAxios.post.mockResolvedValue({ data: mockResponse });

      const result = await simulateLoan(simulation, mockToken);

      expect(mockedAxios.post).toHaveBeenCalledWith(
        'https://financial-entity.eci-pigball.online/api/simulation',
        simulation,
        { headers: { Authorization: `Bearer ${mockToken}` } }
      );
      expect(result.data).toEqual(mockResponse);
    });

    it('should handle simulation errors', async () => {
      const simulation: Simulation = {
        userId: 'user-1',
        amount: 5000000,
        termMonths: 12,
        monthlyIncome: 3000000,
      };
      const error = new Error('Simulation failed');
      mockedAxios.post.mockRejectedValue(error);

      await expect(simulateLoan(simulation, mockToken)).rejects.toThrow('Simulation failed');
    });
  });

  describe('getApplication', () => {
    it('should fetch application by id successfully', async () => {
      const mockApplication = {
        id: 1,
        userId: 'user-1',
        amount: 5000000,
        status: LoanRequestStatus.PENDING,
      };
      mockedAxios.get.mockResolvedValue({ data: mockApplication });

      const result = await getApplication('1', mockBankCode, mockToken);

      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://financial-entity.eci-pigball.online/api/applications/1',
        {
          headers: {
            Authorization: `Bearer ${mockToken}`,
            'X-Bank-Code': mockBankCode,
          },
        }
      );
      expect(result.data).toEqual(mockApplication);
    });

    it('should handle different bank codes', async () => {
      mockedAxios.get.mockResolvedValue({ data: {} });

      await getApplication('1', BankCode.BCO, mockToken);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({
            'X-Bank-Code': 'BCO',
          }),
        })
      );

      await getApplication('1', BankCode.COLT, mockToken);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({
            'X-Bank-Code': 'COLT',
          }),
        })
      );
    });

    it('should handle errors', async () => {
      const error = new Error('Application not found');
      mockedAxios.get.mockRejectedValue(error);

      await expect(getApplication('999', mockBankCode, mockToken)).rejects.toThrow('Application not found');
    });
  });

  describe('getApplicationsByBank', () => {
    it('should fetch applications by bank successfully', async () => {
      const mockApplications = [
        { id: 1, bankCode: 'DAVI', status: LoanRequestStatus.PENDING },
        { id: 2, bankCode: 'DAVI', status: LoanRequestStatus.APPROVED },
      ];
      mockedAxios.get.mockResolvedValue({ data: mockApplications });

      const result = await getApplicationsByBank(mockToken, mockBankCode);

      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://financial-entity.eci-pigball.online/api/applications',
        {
          headers: {
            Authorization: `Bearer ${mockToken}`,
            'X-Bank-Code': mockBankCode,
          },
        }
      );
      expect(result.data).toEqual(mockApplications);
    });

    it('should handle errors', async () => {
      const error = new Error('Fetch failed');
      mockedAxios.get.mockRejectedValue(error);

      await expect(getApplicationsByBank(mockToken, mockBankCode)).rejects.toThrow('Fetch failed');
    });
  });

  describe('updateApplication', () => {
    it('should update application status to approved successfully', async () => {
      const updateRequest: UpdateApplicationRequest = {
        status: LoanRequestStatus.APPROVED,
        notes: 'Application approved',
      };
      const mockResponse = { id: 1, status: LoanRequestStatus.APPROVED };
      mockedAxios.patch.mockResolvedValue({ data: mockResponse });

      const result = await updateApplication(1, mockBankCode, updateRequest, mockToken);

      expect(mockedAxios.patch).toHaveBeenCalledWith(
        'https://financial-entity.eci-pigball.online/api/applications/1/status',
        updateRequest,
        {
          headers: {
            Authorization: `Bearer ${mockToken}`,
            'X-Bank-Code': mockBankCode,
          },
        }
      );
      expect(result.data).toEqual(mockResponse);
    });

    it('should update application status to rejected successfully', async () => {
      const updateRequest: UpdateApplicationRequest = {
        status: LoanRequestStatus.REJECTED,
        rejectionReason: 'Insufficient credit score',
      };
      mockedAxios.patch.mockResolvedValue({ data: { status: LoanRequestStatus.REJECTED } });

      const result = await updateApplication(1, mockBankCode, updateRequest, mockToken);

      expect(result.data.status).toBe(LoanRequestStatus.REJECTED);
    });

    it('should handle update errors', async () => {
      const error = new Error('Update failed');
      mockedAxios.patch.mockRejectedValue(error);

      const updateRequest: UpdateApplicationRequest = {
        status: LoanRequestStatus.APPROVED,
      };

      await expect(updateApplication(1, mockBankCode, updateRequest, mockToken)).rejects.toThrow('Update failed');
    });
  });
});
