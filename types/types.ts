export type User = {
  id?: number,
  name: string,
  username: string,
  password: string,
  email: string,
  join_date?: Date | string
}

export type Product = {
  id?: number,
  name: string,
  description: string,
  price: number,
  stock: number,
  categoryName: string,
  supplierName: string,
  thumbnail?: string
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

export type Customer = User & {
  billingAddress?: string,
  shippingAddress?: string,
  avatar?: string
}

export type CartItem = {
  customerId: number,
  productId: number,
  quantity: number
}