import { JwtPayload } from 'jsonwebtoken';
import { User } from './user';

export type LoginState = 'idle' | 'logging' | 'logged' | 'error';

export type Payload = JwtPayload & {
  id: string;
};

export type State = {
  loginState: LoginState;
  token: string | null;
  currentPayload: Payload | null;
  currentUser: User | null;
};

export const initialState: State = {
  loginState: 'idle',
  token: null,
  currentPayload: null,
  currentUser: null,
};
export interface UserResponse {
  message: string;
  usuarios: User[]; // 'User' è l'interfaccia che rappresenta i tuoi utenti
}
