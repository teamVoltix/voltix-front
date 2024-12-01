export interface User {
  address: string;
  birth_date: string;
  dni: string;
  email: string;
  fullname: string;
  phone_number: string;
  photo: string;
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
