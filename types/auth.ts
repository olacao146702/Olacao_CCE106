export type LoginResponse = {
    accessToken: string;
    refreshToken?: string;
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    image?: string;
  };
  
  export type UserProfile = {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender?: string;
    image?: string;
    role?: string;
  };