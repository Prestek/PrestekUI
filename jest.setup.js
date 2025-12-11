// Mock expo module first to prevent initialization errors
jest.mock('expo', () => ({}));

// Mock expo-secure-store
jest.mock('expo-secure-store', () => ({
  setItemAsync: jest.fn(),
  getItemAsync: jest.fn(),
  deleteItemAsync: jest.fn(),
}));

// Mock expo-router
jest.mock('expo-router', () => ({
  router: {
    push: jest.fn(),
    replace: jest.fn(),
  },
}));

// Mock global expo import registry
if (typeof global !== 'undefined') {
  global.__ExpoImportMetaRegistry = {};
  global.structuredClone = (val) => JSON.parse(JSON.stringify(val));
}
