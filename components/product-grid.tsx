"use client"

// Note: This file uses type assertions (as any) in multiple places to work around
// type checking errors that occur due to inconsistencies between the context types.
// These should be revisited when there's time to properly align all the TypeScript types.

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Heart, Plus, PlusCircle, ListPlus, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getFilteredProducts } from "@/lib/firebase/products"
import { useToast } from "@/components/ui/use-toast"
import { useCart } from "@/context/cart-context"
import { useWishlist } from "@/context/wishlist-context"
import { formatRupees } from "@/lib/utils"
import { useSearchParams, useRouter } from "next/navigation"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useAuth } from "@/context/auth-context"

// Define types for products and component props
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
}

interface ProductGridProps {
  categoryId?: string;
}

export default function ProductGrid({ categoryId }: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()
  const { addToCart } = useCart()
  const { user } = useAuth()
  const { 
    isItemInWishlist, 
    addToWishlist, 
    removeFromWishlist, 
    userLists,
    addToList,
    addList
  } = useWishlist()
  const searchParams = useSearchParams()
  const router = useRouter()
  
  // State for the list dialog
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [newListName, setNewListName] = useState("")
  const [selectedLists, setSelectedLists] = useState<string[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        // Build filters from URL params
        const filters: any = {};
        
        // Add categoryId if provided directly
        if (categoryId) {
          filters.categoryIds = [categoryId];
        } 
        // Otherwise check URL for category filters
        else if (searchParams.has("categories")) {
          filters.categoryIds = searchParams.get("categories")?.split(",");
        }
        
        // Add brand filters
        if (searchParams.has("brands")) {
          filters.brandIds = searchParams.get("brands")?.split(",");
        }
        
        // Add color filters
        if (searchParams.has("colors")) {
          filters.colors = searchParams.get("colors")?.split(",");
        }
        
        // Add size filters
        if (searchParams.has("sizes")) {
          filters.sizes = searchParams.get("sizes")?.split(",");
        }
        
        // Add price range
        const minPrice = searchParams.get("minPrice");
        const maxPrice = searchParams.get("maxPrice");
        if (minPrice || maxPrice) {
          filters.priceRange = [
            minPrice ? Number(minPrice) : 0,
            maxPrice ? Number(maxPrice) : 100000
          ];
        }
        
        // Add in-stock filter
        if (searchParams.has("inStock")) {
          filters.inStock = searchParams.get("inStock") === "true";
        }
        
        // Add sorting
        const sort = searchParams.get("sort");
        if (sort) {
          filters.sortBy = sort;
        }
        
        // Fetch filtered products
        const productsData = await getFilteredProducts(filters);
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error)
        toast({
          title: "Error",
          description: "Failed to load products. Please try again later.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [toast, categoryId, searchParams])

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault()
    e.stopPropagation()

    if (!user) {
      toast({
        title: "Please log in",
        description: "You must be logged in to add items to your cart.",
        variant: "destructive",
      })
      if (typeof window !== "undefined") {
        const returnUrl = encodeURIComponent(window.location.pathname + window.location.search)
        router.push(`/auth/login?redirect=${returnUrl}`)
      }
      return
    }
    
    const item = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: 1,
    }
    
    // Use type assertion to work around TypeScript error
    const cartHandler = addToCart as (item: any) => void;
    cartHandler(item);
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  // Handler for opening the lists dialog
  const handleOpenListDialog = (e: React.MouseEvent<HTMLButtonElement>, product: Product) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (!user) {
      toast({
        title: "Please log in",
        description: "You need to be logged in to save items to your lists.",
        variant: "destructive",
      })
      if (typeof window !== "undefined") {
        const returnUrl = encodeURIComponent(window.location.pathname + window.location.search)
        router.push(`/auth/login?redirect=${returnUrl}`)
      }
      return
    }
    
    setSelectedProduct(product)
    
    // Find which lists already contain this product
    const initialSelectedLists = userLists
      .filter(list => list.items.some(item => item.id === product.id))
      .map(list => list.id)
    
    setSelectedLists(initialSelectedLists)
    setIsDialogOpen(true)
  }
  
  // Handler for closing the dialog
  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setSelectedProduct(null)
    setNewListName("")
    setSelectedLists([])
  }
  
  // Handler for toggling a list selection
  const toggleListSelection = (listId: string) => {
    setSelectedLists(prev => 
      prev.includes(listId)
        ? prev.filter(id => id !== listId)
        : [...prev, listId]
    )
  }
  
  // Handler for creating a new list
  const handleCreateList = () => {
    if (!newListName.trim() || !selectedProduct) return
    
    try {
      // Use type assertion here to work around any TypeScript errors
      const listCreator = addList as (name: string) => any;
      const listAdder = addToList as (listId: string, product: any) => void;
      
      const newList = listCreator(newListName.trim());
      
      listAdder(newList.id, {
        id: selectedProduct.id,
        name: selectedProduct.name,
        price: selectedProduct.price,
        image: selectedProduct.images[0] || "/product-placeholder.png",
        category: selectedProduct.category
      });
      
      // Add the new list to selected lists
      setSelectedLists(prev => [...prev, newList.id]);
      setNewListName("");
    } catch (error) {
      console.error("Error creating list:", error);
    }
  };
  
  // Handler for saving list selections
  const handleSaveListSelections = () => {
    if (!selectedProduct) return;
    
    const productItem = {
      id: selectedProduct.id,
      name: selectedProduct.name,
      price: selectedProduct.price,
      image: selectedProduct.images[0] || "/product-placeholder.png",
      category: selectedProduct.category
    };
    
    // Use type assertions to work around TypeScript errors
    const wishlistAdder = addToWishlist as (item: any) => void;
    const listAdder = addToList as (listId: string, item: any) => void;
    
    // Ensure the item is in the main wishlist
    if (!isItemInWishlist(selectedProduct.id)) {
      wishlistAdder(productItem);
    }
    
    // Add to selected lists
    userLists.forEach(list => {
      const isSelected = selectedLists.includes(list.id);
      const isAlreadyInList = list.items.some(item => item.id === selectedProduct.id);
      
      if (isSelected && !isAlreadyInList) {
        // Add to this list
        listAdder(list.id, productItem);
      }
    });
    
    toast({
      title: "Lists updated",
      description: `${selectedProduct.name} has been saved to your selected lists.`,
    });
    
    handleCloseDialog();
  };

  // Handler for wishlist button
  const handleWishlistToggle = (e: React.MouseEvent<HTMLButtonElement>, product: Product) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (!user) {
      toast({
        title: "Please log in",
        description: "You need to be logged in to like or save items to your wishlist.",
        variant: "destructive",
      })
      if (typeof window !== "undefined") {
        const returnUrl = encodeURIComponent(window.location.pathname + window.location.search)
        router.push(`/auth/login?redirect=${returnUrl}`)
      }
      return
    }

    if (isItemInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0] || "/product-placeholder.png",
        category: product.category
      })
    }
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="rounded-lg overflow-hidden">
            <div className="bg-gray-200 h-64 animate-pulse" />
            <div className="p-4 space-y-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3" />
              <div className="h-6 bg-gray-200 rounded animate-pulse w-1/3 mt-2" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium mb-2">No products found</h3>
        <p className="text-gray-500 mb-6">
          Try adjusting your filters to find what you're looking for.
        </p>
        <Button asChild>
          <Link href="/products">View All Products</Link>
        </Button>
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="group rounded-[20px] overflow-hidden bg-[#e2dacf]/30 hover:bg-[#e2dacf]/60 border border-[#181818]/10 hover:border-[#181818]/30 transition-all duration-400 flex flex-col justify-between"
          >
            <div className="relative h-64 overflow-hidden bg-white/70">
              {product.discount && product.discount > 0 && (
                <div className="absolute top-3 left-3 z-10 bg-[#181818] text-[#f0ebe6] px-3 py-1 text-[10px] font-mono font-bold uppercase rounded-full">
                  {product.discount}% OFF
                </div>
              )}
              <Link href={`/products/${product.id}`} className="block h-full w-full">
                <Image
                  src={product.images[0] || "/product-placeholder.png"}
                  alt={product.name}
                  fill
                  className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                />
              </Link>
              <button
                type="button"
                className={`absolute top-3 right-3 p-2 rounded-full border border-[#181818]/10 backdrop-blur-sm transition-all ${
                  isItemInWishlist(product.id) 
                  ? 'bg-red-50 text-red-500 hover:bg-red-100' 
                  : 'bg-white/80 text-[#181818] hover:bg-white'
                }`}
                onClick={(e) => handleOpenListDialog(e, product)}
                aria-label={`${isItemInWishlist(product.id) ? 'Manage in lists' : 'Add to lists'}`}
              >
                <Heart 
                  className={`h-4 w-4 ${isItemInWishlist(product.id) ? 'fill-red-500' : ''}`} 
                />
              </button>
            </div>

            <div className="p-5 flex flex-col flex-1 justify-between bg-[#f0ebe6]/80">
              <div>
                <div className="flex items-center justify-between text-xs text-[#7c7c7c] mb-1 font-mono uppercase">
                  <span>{product.category}</span>
                  <div className="flex items-center gap-1 text-[#181818]">
                    <span className="text-yellow-500">★</span>
                    <span>{product.rating}</span>
                    <span className="text-gray-400">({product.reviewCount})</span>
                  </div>
                </div>
                <Link href={`/products/${product.id}`}>
                  <h3 className="font-bold text-base text-[#181818] group-hover:opacity-80 transition-opacity line-clamp-1">
                    {product.name}
                  </h3>
                </Link>
              </div>
              
              <div className="flex justify-between items-center mt-4 pt-3 border-t border-[#181818]/10">
                <div className="flex-1 min-w-0">
                  {product.originalPrice && product.originalPrice > product.price ? (
                    <div>
                      <span className="font-bold text-base text-[#181818] block">{formatRupees(product.price)}</span>
                      <span className="text-gray-400 line-through text-xs font-mono">{formatRupees(product.originalPrice)}</span>
                    </div>
                  ) : (
                    <span className="font-bold text-base text-[#181818]">{formatRupees(product.price)}</span>
                  )}
                </div>
                
                <Button
                  size="sm"
                  onClick={(e) => handleAddToCart(e, product)}
                  className="rounded-full bg-[#181818] hover:bg-[#38322c] text-[#f0ebe6] text-xs font-semibold uppercase tracking-wider px-4 py-1.5 transition-all"
                  aria-label={`Add ${product.name} to cart`}
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lists Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Save to List</DialogTitle>
            <DialogDescription>
              Choose the lists you want to save this item to.
            </DialogDescription>
          </DialogHeader>
          
          {selectedProduct && (
            <div className="flex items-center gap-3 mb-4 p-2 border rounded-md">
              <div className="relative w-16 h-16 overflow-hidden rounded-md flex-shrink-0">
                <Image
                  src={selectedProduct.images[0] || "/product-placeholder.png"}
                  alt={selectedProduct.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium truncate">{selectedProduct.name}</h4>
                <p className="text-sm text-gray-500 truncate">{formatRupees(selectedProduct.price)}</p>
              </div>
            </div>
          )}
          
          <div className="space-y-4">
            {/* Create new list input */}
            <div className="flex gap-2">
              <Input
                placeholder="Create new list..."
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
                className="flex-1"
              />
              <Button 
                type="button" 
                size="sm" 
                onClick={handleCreateList}
                disabled={!newListName.trim()}
              >
                <PlusCircle className="h-4 w-4 mr-1" />
                Create
              </Button>
            </div>
            
            {/* List of existing lists */}
            <ScrollArea className="max-h-60 pr-4">
              <div className="space-y-2">
                {userLists.map(list => (
                  <div 
                    key={list.id}
                    className={`flex items-center justify-between p-2 rounded-md cursor-pointer transition-colors ${
                      selectedLists.includes(list.id) 
                        ? 'bg-gray-100' 
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => toggleListSelection(list.id)}
                  >
                    <div className="flex items-center gap-2">
                      <ListPlus className="h-4 w-4 text-gray-500" />
                      <span>{list.name}</span>
                      <span className="text-xs text-gray-500">({list.items.length})</span>
                    </div>
                    {selectedLists.includes(list.id) && (
                      <Check className="h-4 w-4 text-green-500" />
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
          
          <DialogFooter className="sm:justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={handleCloseDialog}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleSaveListSelections}
            >
              Save to lists
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
