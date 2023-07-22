export type User = {
  id: number,
  name: string,
  username: string,
  password: string,
  email: string,
  join_date: Date | string
}

export type Product = {
  name: string,
  description: string,
  price: number,
  stock: number,
  category: string,
  supplier: string
}

export type Category = {
  name: string,
  description: string,
  thumbnail?: string
}

export type Supplier = {
  name: string,
  location: string,
  establishYear: number,
  thumbnail?: string
}