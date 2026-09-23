// Types partagés, calqués sur les réponses de l'API dummyjson.com

export interface User {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  image: string
  age?: number
  gender?: string
  phone?: string
  birthDate?: string
  address?: {
    address: string
    city: string
    postalCode: string
    country: string
  }
  company?: {
    name: string
    title: string
  }
}

export interface AuthUser extends User {
  accessToken: string
}

export interface Recipe {
  id: number
  name: string
  ingredients: string[]
  instructions: string[]
  prepTimeMinutes: number
  cookTimeMinutes: number
  servings: number
  difficulty: string
  cuisine: string
  image: string
  rating: number
}

export interface Post {
  id: number
  title: string
  body: string
  userId: number
  tags?: string[]
  reactions?: { likes: number; dislikes: number }
}

export interface Comment {
  id: number
  body: string
  postId: number
  user: { id: number; username: string }
}

export interface Quote {
  id: number
  quote: string
  author: string
}
