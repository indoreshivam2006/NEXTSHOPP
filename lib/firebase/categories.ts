// Define category interface for better type checking
export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  description?: string;
  productCount?: number;
  rating?: number;
}

// Mock data for development
const mockCategories: Category[] = [
  {
    id: "1",
    name: "Clothing",
    slug: "clothing",
    image: "/cloth_bg.jpg?height=200&width=200",
  },
  {
    id: "2",
    name: "Footwear",
    slug: "footwear",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "3",
    name: "Accessories",
    slug: "accessories",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "4",
    name: "Electronics",
    slug: "electronics",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "5",
    name: "Home Appliances",
    slug: "home",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "6",
    name: "Beauty",
    slug: "beauty",
    image: "/placeholder.svg?height=200&width=200",
  },
]

export async function getCategories(): Promise<Category[]> {
  try {
    // In a real app, you would fetch from Firestore
    // const categoriesCollection = collection(db, "categories");
    // const categoriesSnapshot = await getDocs(categoriesCollection);
    // return categoriesSnapshot.docs.map(doc => ({
    //   id: doc.id,
    //   ...doc.data()
    // }));

    // For development, return mock data
    return mockCategories
  } catch (error) {
    console.error("Error getting categories:", error)
    throw error
  }
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    // In a real app, you would fetch from Firestore
    // const categoriesCollection = collection(db, "categories");
    // const q = query(categoriesCollection, where("slug", "==", slug));
    // const categoriesSnapshot = await getDocs(q);
    // if (categoriesSnapshot.empty) {
    //   return null;
    // }
    // const doc = categoriesSnapshot.docs[0];
    // return {
    //   id: doc.id,
    //   ...doc.data()
    // };

    // For development, return mock data
    const category = mockCategories.find((category) => category.slug === slug)
    
    // Enhanced mock data with additional properties that might come from Firestore in production
    if (category) {
      return {
        ...category,
        description: `Premium collection of ${category.name.toLowerCase()} for all your needs.`,
        productCount: 135,
        rating: 4.8
      }
    }
    
    return null
  } catch (error) {
    console.error("Error getting category by slug:", error)
    throw error
  }
}
