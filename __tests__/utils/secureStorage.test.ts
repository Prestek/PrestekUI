import * as SecureStore from 'expo-secure-store';
import { saveItem, getItem, deleteItem } from '../../utils/secureStorage';

jest.mock('expo-secure-store');

describe('secureStorage utility', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('saveItem', () => {
    it('should save an item successfully', async () => {
      await saveItem('testKey', 'testValue');

      expect(SecureStore.setItemAsync).toHaveBeenCalledWith('testKey', 'testValue');
      expect(SecureStore.setItemAsync).toHaveBeenCalledTimes(1);
    });

    it('should save token value', async () => {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';
      await saveItem('authToken', token);

      expect(SecureStore.setItemAsync).toHaveBeenCalledWith('authToken', token);
    });

    it('should save empty string', async () => {
      await saveItem('emptyKey', '');

      expect(SecureStore.setItemAsync).toHaveBeenCalledWith('emptyKey', '');
    });

    it('should handle special characters in value', async () => {
      const specialValue = '{"user": "test", "id": 123}';
      await saveItem('jsonKey', specialValue);

      expect(SecureStore.setItemAsync).toHaveBeenCalledWith('jsonKey', specialValue);
    });
  });

  describe('getItem', () => {
    it('should retrieve an item successfully', async () => {
      (SecureStore.getItemAsync as jest.Mock).mockResolvedValue('testValue');

      const result = await getItem('testKey');

      expect(SecureStore.getItemAsync).toHaveBeenCalledWith('testKey');
      expect(result).toBe('testValue');
    });

    it('should return null for non-existent key', async () => {
      (SecureStore.getItemAsync as jest.Mock).mockResolvedValue(null);

      const result = await getItem('nonExistentKey');

      expect(result).toBeNull();
    });

    it('should retrieve complex string value', async () => {
      const complexValue = '{"token": "abc123", "expires": 3600}';
      (SecureStore.getItemAsync as jest.Mock).mockResolvedValue(complexValue);

      const result = await getItem('complexKey');

      expect(result).toBe(complexValue);
    });
  });

  describe('deleteItem', () => {
    it('should delete an item successfully', async () => {
      await deleteItem('testKey');

      expect(SecureStore.deleteItemAsync).toHaveBeenCalledWith('testKey');
      expect(SecureStore.deleteItemAsync).toHaveBeenCalledTimes(1);
    });

    it('should handle deleting non-existent key gracefully', async () => {
      await deleteItem('nonExistentKey');

      expect(SecureStore.deleteItemAsync).toHaveBeenCalledWith('nonExistentKey');
    });

    it('should delete auth token', async () => {
      await deleteItem('authToken');

      expect(SecureStore.deleteItemAsync).toHaveBeenCalledWith('authToken');
    });
  });

  describe('integration scenarios', () => {
    it('should handle save-get-delete workflow', async () => {
      const key = 'workflowKey';
      const value = 'workflowValue';

      // Save
      await saveItem(key, value);
      expect(SecureStore.setItemAsync).toHaveBeenCalledWith(key, value);

      // Get
      (SecureStore.getItemAsync as jest.Mock).mockResolvedValue(value);
      const retrieved = await getItem(key);
      expect(retrieved).toBe(value);

      // Delete
      await deleteItem(key);
      expect(SecureStore.deleteItemAsync).toHaveBeenCalledWith(key);
    });
  });
});
