export interface User {
  iprofile_id: number;
  user: string;
  fullname: string;
  dni: string;
  birth_date: string;
  email: string;
  password: string;
  address: string;
  phone_number: string;
}

/* registro */
export interface RegisterUser {
  fullname: string;
  email: string;
  dni: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  access_token: string;
  refresh_token: string;
  user_id: number;
  fullname: string;
}

export interface Credentials {
  dni: string;
  password: string;
}
