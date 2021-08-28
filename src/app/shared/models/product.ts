
export interface Product {
  key?: string,
  title?: string,
  price?: number,
  category?: string,
  imageUrl?: string,
  quantity?: number
}

// dont know why i had to make all fields optional... firebase