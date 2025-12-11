import axios from 'axios';
import {
  getAllUsers,
  getUserByEmail,
  createUserProfile,
  getUserById,
  updateUserProfile,
} from '../../services/userAPI';
import { User } from '../../models/userModels';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('userAPI service', () => {
  const mockToken = 'test-token-123';
  const mockUser: User = {
    id: 1,
    email: 'test@example.com',
    firstName: 'John',
    lastName: 'Doe',
    documentNumber: '123456789',
    phone: '3001234567',
    monthlyIncome: 5000000,
    monthlyExpenses: 2000000,
    employmentStatus: 'Employed',
    creditScore: 750,
    createdAt: [2024, 1, 15],
    updatedAt: [2024, 1, 15],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllUsers', () => {
    it('should fetch all users successfully', async () => {
      const mockResponse = { data: [mockUser], status: 200 };
      mockedAxios.get.mockResolvedValue(mockResponse);

      const result = await getAllUsers(mockToken);

      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://people.eci-pigball.online/api/users',
        { headers: { Authorization: `Bearer ${mockToken}` } }
      );
      expect(result).toEqual(mockResponse);
    });

    it('should handle errors', async () => {
      const error = new Error('Network error');
      mockedAxios.get.mockRejectedValue(error);

      await expect(getAllUsers(mockToken)).rejects.toThrow('Network error');
    });
  });

  describe('getUserByEmail', () => {
    it('should fetch user by email successfully', async () => {
      mockedAxios.get.mockResolvedValue({ data: mockUser });

      const result = await getUserByEmail('test@example.com', mockToken);

      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://people.eci-pigball.online/api/users/email/test@example.com',
        { headers: { Authorization: `Bearer ${mockToken}` } }
      );
      expect(result).toEqual(mockUser);
    });

    it('should return null when user not found (404)', async () => {
      const error = {
        isAxiosError: true,
        response: { status: 404 },
      };
      mockedAxios.get.mockRejectedValue(error);
      mockedAxios.isAxiosError.mockReturnValue(true);

      const result = await getUserByEmail('notfound@example.com', mockToken);

      expect(result).toBeNull();
    });

    it('should throw error for non-404 errors', async () => {
      const error = {
        isAxiosError: true,
        response: { status: 500 },
      };
      mockedAxios.get.mockRejectedValue(error);
      mockedAxios.isAxiosError.mockReturnValue(true);

      await expect(getUserByEmail('test@example.com', mockToken)).rejects.toEqual(error);
    });

    it('should throw error for non-axios errors', async () => {
      const error = new Error('Unknown error');
      mockedAxios.get.mockRejectedValue(error);
      mockedAxios.isAxiosError.mockReturnValue(false);

      await expect(getUserByEmail('test@example.com', mockToken)).rejects.toThrow('Unknown error');
    });
  });

  describe('createUserProfile', () => {
    it('should create user profile successfully', async () => {
      const userData = {
        id: 1,
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        documentNumber: '123456789',
        phone: '3001234567',
        monthlyIncome: 5000000,
        monthlyExpenses: 2000000,
        employmentStatus: 'Employed' as const,
        creditScore: 750,
      };
      mockedAxios.post.mockResolvedValue({ data: mockUser });

      const result = await createUserProfile(userData, mockToken);

      expect(mockedAxios.post).toHaveBeenCalledWith(
        'https://people.eci-pigball.online/api/users',
        userData,
        { headers: { Authorization: `Bearer ${mockToken}` } }
      );
      expect(result).toEqual(mockUser);
    });

    it('should handle creation errors', async () => {
      const error = new Error('Creation failed');
      mockedAxios.post.mockRejectedValue(error);

      const userData = {
        id: 1,
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        documentNumber: '123456789',
        phone: '3001234567',
        monthlyIncome: 5000000,
        monthlyExpenses: 2000000,
        employmentStatus: 'Employed' as const,
        creditScore: 750,
      };

      await expect(createUserProfile(userData, mockToken)).rejects.toThrow('Creation failed');
    });
  });

  describe('getUserById', () => {
    it('should fetch user by id successfully', async () => {
      mockedAxios.get.mockResolvedValue({ data: mockUser });

      const result = await getUserById('1', mockToken);

      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://people.eci-pigball.online/api/users/1',
        { headers: { Authorization: `Bearer ${mockToken}` } }
      );
      expect(result).toEqual(mockUser);
    });

    it('should handle errors', async () => {
      const error = new Error('User not found');
      mockedAxios.get.mockRejectedValue(error);

      await expect(getUserById('999', mockToken)).rejects.toThrow('User not found');
    });
  });

  describe('updateUserProfile', () => {
    it('should update user profile successfully', async () => {
      const updatedUser = { ...mockUser, firstName: 'Jane' };
      mockedAxios.put.mockResolvedValue({ data: updatedUser });

      const result = await updateUserProfile(1, updatedUser, mockToken);

      expect(mockedAxios.put).toHaveBeenCalledWith(
        'https://people.eci-pigball.online/api/users/1',
        updatedUser,
        { headers: { Authorization: `Bearer ${mockToken}` } }
      );
      expect(result).toEqual(updatedUser);
    });

    it('should handle update errors', async () => {
      const error = new Error('Update failed');
      mockedAxios.put.mockRejectedValue(error);

      await expect(updateUserProfile(1, mockUser, mockToken)).rejects.toThrow('Update failed');
    });
  });
});
