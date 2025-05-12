// Define interfaces for our product data
interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    originalPrice?: number;
    discount?: number;
    images: string[];
    category: string;
    categoryId: string;
    featured: boolean;
    rating: number;
    reviewCount: number;
    sizes: string[];
    colors: string[];
    inStock: boolean;
    features?: string[]; // Array of product features
}

// Mock data for development
const mockProducts: Product[] = [
    {
        id: "1",
        name: "Samsung Galaxy S25",
        description: "5G AI Smartphone (Silver Shadow, 12GB RAM, 256GB Storage), 50MP Camera with Galaxy AI",
        price: 80999,
        images: [
            "/samsung_25.jpg?height=600&width=600",
            "/samsung_25_1.jpg",
            "/samsung_25_2.jpg",
            "/samsung_25_3.jpg",
            "/samsung_25_4.jpg",
            "/samsung_25_5.jpg",
            "/samsung_25_6.jpg",
            "/samsung_25_7.jpg",
            "/samsung_25_8.jpg",
            "/samsung_25_9.jpg",
            "/samsung_25_10.jpg",
            "/samsung_25_11.jpg",
        ],
        category: "Electronics",
        categoryId: "4",
        featured: true,
        rating: 4.8,
        reviewCount: 9058,
        sizes: ["128GB", "256GB", "512GB"],
        colors: [],
        inStock: true,
    },
    // ... (rest of the products remain the same)
];

export async function getProducts(): Promise<Product[]> {
    try {
        // In a real app, you would fetch from Firestore
        // const productsCollection = collection(db, "products");
        // const productsSnapshot = await getDocs(productsCollection);
        // return productsSnapshot.docs.map(doc => ({
        //   id: doc.id,
        //   ...doc.data()
        // }));

        // For development, return mock data
        return mockProducts;
    } catch (error) {
        console.error("Error getting products:", error);
        throw error;
    }
}

export async function getFeaturedProducts(): Promise<Product[]> {
    try {
        // In a real app, you would fetch from Firestore
        // const productsCollection = collection(db, "products");
        // const q = query(productsCollection, where("featured", "==", true), limit(3));
        // const productsSnapshot = await getDocs(q);
        // return productsSnapshot.docs.map(doc => ({
        //   id: doc.id,
        //   ...doc.data()
        // }));

        // For development, return mock data
        return mockProducts.filter((product) => product.featured).slice(0, 3);
    } catch (error) {
        console.error("Error getting featured products:", error);
        throw error;
    }
}

export async function getProductById(id: string): Promise<Product | null> {
    try {
        // In a real app, you would fetch from Firestore
        // const productDoc = doc(db, "products", id);
        // const productSnapshot = await getDoc(productDoc);
        // if (!productSnapshot.exists()) {
        //   return null;
        // }
        // return {
        //   id: productSnapshot.id,
        //   ...productSnapshot.data()
        // };

        // For development, return mock data
        const product = mockProducts.find((product) => product.id === id);
        return product || null;
    } catch (error) {
        console.error("Error getting product:", error);
        throw error;
    }
}

export async function getProductsByCategory(categoryId: string): Promise<Product[]> {
    try {
        // In a real app, you would fetch from Firestore
        // const productsCollection = collection(db, "products");
        // const q = query(productsCollection, where("categoryId", "==", categoryId));
        // const productsSnapshot = await getDocs(q);
        // return productsSnapshot.docs.map(doc => ({
        //   id: doc.id,
        //   ...doc.data()
        // }));

        // For development, filter the mock data
        return mockProducts.filter((product) => product.categoryId === categoryId);
    } catch (error) {
        console.error("Error getting products by category:", error);
        throw error;
    }
}

export async function getRelatedProducts(
    categoryId: string, 
    currentProductId: string
): Promise<Product[]> {
    try {
        // In a real app, you would fetch from Firestore
        // const productsCollection = collection(db, "products");
        // const q = query(
        //   productsCollection,
        //   where("categoryId", "==", categoryId),
        //   where("id", "!=", currentProductId),
        //   limit(4)
        // );
        // const productsSnapshot = await getDocs(q);
        // return productsSnapshot.docs.map(doc => ({
        //   id: doc.id,
        //   ...doc.data()
        // }));

        // For development, return mock data
        return mockProducts
            .filter((product) => 
                product.categoryId === categoryId && product.id !== currentProductId
            )
            .slice(0, 4);
    } catch (error) {
        console.error("Error getting related products:", error);
        throw error;
    }
}

export async function searchProducts(searchTerm: string): Promise<Product[]> {
    try {
        // In a real app, you would use Firestore or a search service like Algolia
        // For development, return mock data with simple filtering
        return mockProducts.filter(
            (product) =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
    } catch (error) {
        console.error("Error searching products:", error);
        throw error;
    }
}

export async function getFilteredProducts(filters: {
    categoryIds?: string[];
    brandIds?: string[];
    colors?: string[];
    priceRange?: [number, number];
    sizes?: string[];
    sortBy?: 'price-asc' | 'price-desc' | 'rating' | 'newest';
    inStock?: boolean;
}): Promise<Product[]> {
    try {
        // Start with all products
        let filteredProducts = [...mockProducts];
        
        // Apply category filter
        if (filters.categoryIds && filters.categoryIds.length > 0) {
            filteredProducts = filteredProducts.filter((product) => 
                filters.categoryIds?.includes(product.categoryId)
            );
        }
        
        // Apply brand filter (using category as proxy for brand in our mock data)
        if (filters.brandIds && filters.brandIds.length > 0) {
            filteredProducts = filteredProducts.filter((product) => {
                // In this example, we're simulating brands based on product names
                const hasBrand = filters.brandIds?.some((brandId) => {
                    if (brandId === "1" && product.name.toLowerCase().includes("nike")) return true;
                    if (brandId === "2" && product.name.toLowerCase().includes("adidas")) return true;
                    if (brandId === "3" && product.name.toLowerCase().includes("apple")) return true;
                    if (brandId === "4" && product.name.toLowerCase().includes("samsung")) return true;
                    if (brandId === "5" && product.name.toLowerCase().includes("sony")) return true;
                    return false;
                });
                return hasBrand;
            });
        }
        
        // Apply color filter
        if (filters.colors && filters.colors.length > 0) {
            filteredProducts = filteredProducts.filter((product) => 
                product.colors.some((color) => filters.colors?.includes(color))
            );
        }
        
        // Apply price range filter
        if (filters.priceRange) {
            const [min, max] = filters.priceRange;
            filteredProducts = filteredProducts.filter((product) => 
                product.price >= min && product.price <= max
            );
        }
        
        // Apply size filter
        if (filters.sizes && filters.sizes.length > 0) {
            filteredProducts = filteredProducts.filter((product) => 
                product.sizes.some((size) => filters.sizes?.includes(size))
            );
        }
        
        // Apply in-stock filter
        if (filters.inStock !== undefined) {
            filteredProducts = filteredProducts.filter((product) => 
                product.inStock === filters.inStock
            );
        }
        
        // Apply sorting
        if (filters.sortBy) {
            switch (filters.sortBy) {
                case 'price-asc':
                    filteredProducts.sort((a, b) => a.price - b.price);
                    break;
                case 'price-desc':
                    filteredProducts.sort((a, b) => b.price - a.price);
                    break;
                case 'rating':
                    filteredProducts.sort((a, b) => b.rating - a.rating);
                    break;
                case 'newest':
                    // In a real app, we'd have a timestamp field to sort by
                    // Here we're just using ID as a stand-in for recency
                    filteredProducts.sort((a, b) => Number(b.id) - Number(a.id));
                    break;
            }
        }
        
        return filteredProducts;
    } catch (error) {
        console.error("Error filtering products:", error);
        throw error;
    }
}

// Function to get all available product filters (for dynamic filter UI)
export async function getProductFilters(): Promise<{
    priceRange: { min: number; max: number };
    categories: { id: string; name: string }[];
    colors: string[];
    sizes: string[];
    brands: { id: string; name: string }[];
}> {
    try {
        // Generate price range (min/max) from products
        const prices = mockProducts.map((product) => product.price);
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);
        
        // Extract all unique categories
        const categories = [...new Set(mockProducts.map((product) => ({
            id: product.categoryId,
            name: product.category
        })))].reduce((unique, item) => {
            const exists = unique.some((i) => i.id === item.id);
            return exists ? unique : [...unique, item];
        }, [] as { id: string; name: string }[]);
        
        // Extract all unique colors
        const colors = [...new Set(mockProducts.flatMap((product) => product.colors))];
        
        // Extract all unique sizes
        const sizes = [...new Set(mockProducts.flatMap((product) => product.sizes))];
        
        // Brands (simulated in our example)
        const brands = [
            { id: "1", name: "Nike" },
            { id: "2", name: "Adidas" },
            { id: "3", name: "Apple" },
            { id: "4", name: "Samsung" },
            { id: "5", name: "Sony" },
        ];
        
        return {
            priceRange: { min: minPrice, max: maxPrice },
            categories,
            colors,
            sizes,
            brands
        };
    } catch (error) {
        console.error("Error getting product filters:", error);
        throw error;
    }
}
