import { Prisma } from '@prisma/client'

// Prisma client query payloads
type CartItemsPayload = Prisma.CustomerGetPayload<{
  select: {
    id: true,
    name: true, username: true,
    cartItems: {
      select: {
        quantity: true,
        product: {}
      }
    }
  }
}>;

type CustomerPayload = Prisma.CustomerGetPayload<{}>;

export {}

declare global {
  namespace Express {
    export interface Request {
      cartItems: CartItemsPayload,
      customerDetails: CustomerPayload
    }
  }

  // Global custom types
  type User = {
    id?: number,
    name: string,
    username: string,
    password: string,
    email: string,
    join_date?: Date | string
  }
  
  type Product = {
    id?: number,
    name: string,
    description: string,
    price: number,
    stock: number,
    categoryName: string,
    supplierName: string,
    thumbnail?: string
  }
  
  type Category = {
    name: string,
    description: string,
    thumbnail?: string
  }
  
  type Supplier = {
    name: string,
    location: string,
    establishYear: number,
    thumbnail?: string
  }
  
  type Customer = User & {
    billingAddress?: string,
    shippingAddress?: string,
    avatar?: string
  }
  
  type CartItem = {
    customerId: number,
    productId: number,
    quantity: number
  }
  
  type OrderItem = {
    orderId: number,
    productId: number,
    quantity: number
  }
  
  type Order = {
    customerId: number,
    shippingAddress?: string,
    status?: string
  }

  type MiddlewareError = Error & {
    code?: string,
    status?: number
  }
}
