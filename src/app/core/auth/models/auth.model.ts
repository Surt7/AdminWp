export type UserRole = 'ADMIN' | 'TECHNICIAN';


export interface User {
  id: string;
username: string;
email: string;
  name:string;
  role: UserRole;
}

export type LoginCredentials= Pick<User, 'username'> & {
  password: string;
};

export interface AuthResponse{
  user: User;
}
