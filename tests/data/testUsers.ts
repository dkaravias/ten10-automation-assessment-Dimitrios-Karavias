export interface TestUser {
  email: string;
  password: string;
  role?: string;
}

export const TEST_USERS = {
  standardUser: {
    // These details would not be stored in the codebase. In a real-world scenario we'd extract them to a .env file.
    email: 'karavias.d@gmail.com',
    password: 'qxc7qgn8HBG6gjk.mya'
  },
  // Add more test users as needed. 
} as const;

export type TestUserType = keyof typeof TEST_USERS;
