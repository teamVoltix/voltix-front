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
/* 
fullname:string
email:string
password:string 
*/

export interface Login {
  dni: string;
  password: string;
}

/* class Perfil
    profile_id
    user
    password
    fullname
    dni
    birth_date
    address
    phone_number
*/
