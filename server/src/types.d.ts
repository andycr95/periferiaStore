
export interface Product {
  id:                   number;
  title:                string;
  description:          string;
  price:                number,
  brand:                string;
  thumbnail:            string;
}


export interface User {
  id:                   number;
  email:                string;
  name:                 string;
  password:             string;
  limit:                number
}