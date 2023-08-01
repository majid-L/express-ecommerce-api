import { Prisma } from '@prisma/client'

// Prisma client query payload
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

export {}

declare global {
  namespace Express {
    export interface Request {
      cartItems: CartItemsPayload,
      customerDetails: Prisma.CustomerGetPayload<{}>,
      productDetails: Prisma.ProductGetPayload<{}>,
      reviewDetails: Prisma.ReviewGetPayload<{}>,
      addresses: AddressPayloadGroup | AddressGroup
    }
  }

  type AddressPayloadGroup = {
    billingAddress: Prisma.AddressGetPayload<{}>,
    shippingAddress: Prisma.AddressGetPayload<{}>
  }

  type StrOrNum = string | number;

  // Global custom types - used to type variables in controllers
  type User = {
    id?: number,
    name: string,
    username: string,
    password: string,
    email: string,
    joinDate?: Date | string
  }

  type Customer = User & {
    phone?: string,
    billingAddressId?: number,
    shippingAddressId?: number,
    avatar?: string
  }

  type Address = {
    addressLine1: string,
    addressLine2?: string,
    city: string,
    county?: string,
    postcode: string
  }

  type AddressGroup = {
    billingAddress: Address
    shippingAddress: Address
  }

  type ProductCount = {
    _count?: {
      products: number
    },
    products?: number
  }

  type ProductExtended = {
    numOfTimesOrdered: number,
    totalUnitsOrdered: number,
    averageRating: string
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

  type Category = ProductCount & {
    name: string,
    description: string,
    thumbnail?: string
  }
  
  type Supplier = ProductCount & {
    name: string,
    location: string,
    establishYear: number,
    thumbnail?: string
  }
  
  type CartItem = {
    customerId: number,
    productId: number,
    quantity: number
  }

  type WishlistItem = {
    customerId: number,
    productId: number
  }
  
  type OrderItem = {
    orderId: number,
    productId: number,
    quantity: number
  }
  
  type Order = {
    customerId: number,
    shippingAddressId: number,
    billingAddressId: number,
    status?: string
  }

  type Review = {
    customerId: number,
    productId: number,
    title: string,
    body: string,
    rating: number,
    recommend?: boolean,
    createdAt?: Date
  }

  type ProductQueryParam = { 
    contains: string, 
    mode: 'insensitive' 
  }

  type ProductsUrlParams = {
    limit: StrOrNum,
    page: StrOrNum,
    minPrice: StrOrNum,
    maxPrice: StrOrNum,
    category: string,
    supplier: string,
    hideOutOfStock: boolean,
    sortBy: string,
    order: string
  }

  type MiddlewareError = Error & {
    code?: string,
    status?: number
  }

  type ModelObject = 
    Prisma.CustomerGetPayload<{}> | 
    Prisma.ProductGetPayload<{}> | 
    Prisma.ReviewGetPayload<{}>;

  // The next two types are used for the query builder payloads in product.controllers.ts
  type NumberOfOrders = {
    include?: {
      _count: {
        select: { orderItems: true }
      }
    }
  }
   
  type ProductWithOrderCount = Prisma.ProductGetPayload<NumberOfOrders> & { 
    numOfTimesOrdered?: number, 
    _count?: { 
      orderItems: number 
    } 
  }

  // The next two types are used for the query builder payloads in categories.controllers.ts
  type QueryOptions = {
    include: {
      _count?: {
        select: { products: true }
      }
    }
  };

  type CategoriesOrSuppliers = {
    categories: Category[]
  } | {
    suppliers: Supplier[]
  };

  // This is used to type the Prisma transaction for the selectProductById function
  type PrismaAggregateTransaction = [
    {
      _avg: {
         rating: number
      },
      _count: {
        rating: number
      }
    },
    {
      _count: {
        orderItems: number
      }
    }
  ]

  // Types for API JSON responses - used to type variables in testing suite
  type Pagination = {
    page: number,
    count: number,
    totalResults: number
  }
  
  type ProductsResponse = { products: Product[] } & Pagination;
  
  type OrdersResponse = {
    id: number,
    name: string,
    username: string,
    orders: {
        id: number,
        customerId: number,
        shippingAddress: string | null,
        status: string,
        created_at: string,
        orderItems: {
            quantity: number,
            product: Product
        }[]
    }[]
  }

  type OrderHistoryResponse = { 
    body: { 
      productId: number, 
      lastOrdered: {
        orderId: number,
        lastOrdered: string
      } | null
    } 
  }

  type NewOrderResponse = {
    id: number,
    customerId: number,
    shippingAddressId: number,
    billingAddressId: number,
    status: string,
    created_at: string,
    billingAddress: { id: number } & Address,
    shippingAddress: { id: number } & Address,
    orderItems: {
        quantity: number,
        product: Product
    }[]
  }

  type CartItemsResponse = {
    cart: {
      id: number,
      name: string,
      username: string,
      cartItems: {
        quantity: number,
        product: Product
      }[]
    }
  }

  type WishlistResponse = {
    wishlist: {
      id: number,
      name: string,
      username: string,
      wishlistItems: {
        product: Product
      }[]
    }
  }

  type BestSellers = { 
    bestSellers: (Product & ProductExtended)[]
  } & Pagination

  type Favorites = {
    favorites: {
      addedAt: string,
      recommend: boolean,
      rating: number,
      product: Product
    }[]
  } & Pagination;

  type ReviewsResponse = {
    reviews: (Review & { id: number, createdAt: string })[]
  } & Pagination;

  type AddressesResponse = {
    newAddress?: { id: number } & Address,
    customer: Customer,
    billingAddress?: Address,
    shippingAddress?: Address
  }

  type ApiErrorResponse = {
    body: {
      error: {
        status: number,
        info: string
      }
    }
  }
}