import axios from 'axios';
import { createLoan } from '../../services/offerAPI';
import { LoanRequestOffer } from '../../models/creditModels';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('offerAPI service', () => {
  const mockToken = 'test-token-123';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createLoan', () => {
    it('should create loan successfully', async () => {
      const loanRequest: LoanRequestOffer = {
        userId: 'user-1',
        amount: 5000000,
        termMonths: 12,
        monthlyIncome: 3000000,
        selectedEntity: 'DAVI',
      };
      const mockResponse = {
        success: true,
        message: 'Loan created successfully',
        application: {
          id: 1,
          userId: 'user-1',
          amount: 5000000,
          entity: 'DAVI',
          status: 'PENDING',
        },
      };
      mockedAxios.post.mockResolvedValue({ data: mockResponse });

      const result = await createLoan(loanRequest, mockToken);

      expect(mockedAxios.post).toHaveBeenCalledWith(
        'http://52.45.159.103:5678/webhook/create-application',
        loanRequest,
        { headers: { Authorization: `Bearer ${mockToken}` } }
      );
      expect(result.data).toEqual(mockResponse);
    });

    it('should handle different bank entities', async () => {
      const loanRequestDAVI: LoanRequestOffer = {
        userId: 'user-1',
        amount: 5000000,
        termMonths: 12,
        monthlyIncome: 3000000,
        selectedEntity: 'DAVI',
      };
      mockedAxios.post.mockResolvedValue({ data: { success: true } });

      await createLoan(loanRequestDAVI, mockToken);
      expect(mockedAxios.post).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({ selectedEntity: 'DAVI' }),
        expect.any(Object)
      );

      const loanRequestBCO: LoanRequestOffer = {
        userId: 'user-1',
        amount: 3000000,
        termMonths: 24,
        monthlyIncome: 4000000,
        selectedEntity: 'BCO',
      };

      await createLoan(loanRequestBCO, mockToken);
      expect(mockedAxios.post).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({ selectedEntity: 'BCO' }),
        expect.any(Object)
      );
    });

    it('should handle creation errors', async () => {
      const loanRequest: LoanRequestOffer = {
        userId: 'user-1',
        amount: 5000000,
        termMonths: 12,
        monthlyIncome: 3000000,
        selectedEntity: 'DAVI',
      };
      const error = new Error('Loan creation failed');
      mockedAxios.post.mockRejectedValue(error);

      await expect(createLoan(loanRequest, mockToken)).rejects.toThrow('Loan creation failed');
    });

    it('should handle network errors', async () => {
      const loanRequest: LoanRequestOffer = {
        userId: 'user-1',
        amount: 5000000,
        termMonths: 12,
        monthlyIncome: 3000000,
        selectedEntity: 'COLT',
      };
      const error = new Error('Network Error');
      mockedAxios.post.mockRejectedValue(error);

      await expect(createLoan(loanRequest, mockToken)).rejects.toThrow('Network Error');
    });

    it('should send correct data structure', async () => {
      const loanRequest: LoanRequestOffer = {
        userId: 'user-123',
        amount: 10000000,
        termMonths: 36,
        monthlyIncome: 8000000,
        selectedEntity: 'DAVI',
      };
      mockedAxios.post.mockResolvedValue({ data: {} });

      await createLoan(loanRequest, mockToken);

      expect(mockedAxios.post).toHaveBeenCalledWith(
        expect.any(String),
        {
          userId: 'user-123',
          amount: 10000000,
          termMonths: 36,
          monthlyIncome: 8000000,
          selectedEntity: 'DAVI',
        },
        expect.any(Object)
      );
    });
  });
});
