export type UserRole = 'ADMIN' | 'TECHNICIAN';

export interface User {
  id: string;
  username: string;
  email: string;
  name: string;
  role: UserRole;
}

export interface BffUserDto {
  subject: string;
  username: string;
  roles: string[];
}
