"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { useAuth } from "@/context/auth-context"
import { useToast } from "@/components/ui/use-toast"

// Define types for wishlist item
export type WishlistItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  category?: string;
  addedAt?: number;
}

// Define type for a user's list
export type UserList = {
  id: string;
  name: string;
  items: WishlistItem[];
  createdAt: number;
}

type WishlistContextType = {
  wishlist: WishlistItem[];
  userLists: UserList[];
  isItemInWishlist: (productId: string) => boolean;
  isItemInList: (listId: string, productId: string) => boolean;
  addToWishlist: (product: WishlistItem, skipAddingToDefaultList?: boolean) => void;
  removeFromWishlist: (productId: string) => void;
  clearWishlist: () => void;
  addList: (name: string) => UserList;
  renameList: (listId: string, newName: string) => void;
  deleteList: (listId: string) => void;
  addToList: (listId: string, product: WishlistItem) => void;
  removeFromList: (listId: string, productId: string) => void;
  getItemLists: (productId: string) => UserList[];
}

const WishlistContext = createContext<WishlistContextType | null>(null)

// Local storage keys
const WISHLIST_STORAGE_KEY = "connect_mart_wishlist";
const USER_LISTS_STORAGE_KEY = "connect_mart_user_lists";

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([])
  const [userLists, setUserLists] = useState<UserList[]>([])
  const { user } = useAuth()
  const { toast } = useToast()

  // Load wishlist and user lists from localStorage when component mounts and user changes
  useEffect(() => {
    if (user) {
      // Load main wishlist
      const userWishlistKey = `${WISHLIST_STORAGE_KEY}_${user.uid}`;
      const savedWishlist = localStorage.getItem(userWishlistKey);
      
      if (savedWishlist) {
        try {
          setWishlist(JSON.parse(savedWishlist));
        } catch (error) {
          console.error("Error parsing wishlist from localStorage:", error);
          setWishlist([]);
        }
      } else {
        setWishlist([]);
      }

      // Load user lists
      const userListsKey = `${USER_LISTS_STORAGE_KEY}_${user.uid}`;
      const savedLists = localStorage.getItem(userListsKey);
      
      if (savedLists) {
        try {
          setUserLists(JSON.parse(savedLists));
        } catch (error) {
          console.error("Error parsing user lists from localStorage:", error);
          setUserLists([]);
        }
      } else {
        // Create default "Favorites" list if no lists exist
        const defaultList: UserList = {
          id: generateId(),
          name: "Favorites",
          items: [],
          createdAt: Date.now()
        };
        setUserLists([defaultList]);
      }
    } else {
      // Clear wishlist and lists when user logs out
      setWishlist([]);
      setUserLists([]);
    }
  }, [user]);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      const userWishlistKey = `${WISHLIST_STORAGE_KEY}_${user.uid}`;
      localStorage.setItem(userWishlistKey, JSON.stringify(wishlist));
    }
  }, [wishlist, user]);

  // Save user lists to localStorage whenever they change
  useEffect(() => {
    if (user && userLists.length > 0) {
      const userListsKey = `${USER_LISTS_STORAGE_KEY}_${user.uid}`;
      localStorage.setItem(userListsKey, JSON.stringify(userLists));
    }
  }, [userLists, user]);

  // Helper function to generate a unique ID
  const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  };

  // Check if an item is in the main wishlist
  const isItemInWishlist = (productId: string): boolean => {
    return wishlist.some(item => item.id === productId);
  }

  // Check if an item is in a specific list
  const isItemInList = (listId: string, productId: string): boolean => {
    const list = userLists.find(list => list.id === listId);
    return list ? list.items.some(item => item.id === productId) : false;
  }

  // Add an item to the main wishlist
  const addToWishlist = (product: WishlistItem, skipAddingToDefaultList = false) => {
    if (!user) {
      toast({
        title: "Please log in",
        description: "You need to be logged in to save items to your wishlist.",
        variant: "destructive",
      });
      return;
    }

    const enrichedProduct = {
      ...product,
      addedAt: Date.now()
    };

    if (!isItemInWishlist(product.id)) {
      setWishlist(prev => [...prev, enrichedProduct]);
      
      // Add to default list if it exists and skipAddingToDefaultList is false
      if (!skipAddingToDefaultList) {
        const defaultList = userLists.find(list => list.name === "Favorites");
        if (defaultList) {
          // Update the internal list state directly to avoid the recursive call
          setUserLists(prev => 
            prev.map(list => {
              if (list.id === defaultList.id) {
                // Check if the item is already in the list
                if (list.items.some(item => item.id === product.id)) {
                  return list;
                }
                return {
                  ...list,
                  items: [...list.items, enrichedProduct]
                };
              }
              return list;
            })
          );
        }
      }
      
      toast({
        title: "Added to wishlist",
        description: `${product.name} has been added to your wishlist.`,
      });
    } else {
      toast({
        title: "Already in wishlist",
        description: `${product.name} is already in your wishlist.`,
      });
    }
  }

  // Remove an item from the main wishlist
  const removeFromWishlist = (productId: string) => {
    if (!user) return;

    setWishlist(prev => prev.filter(item => item.id !== productId));
    
    // Also remove it from all lists
    setUserLists(prev => 
      prev.map(list => ({
        ...list,
        items: list.items.filter(item => item.id !== productId)
      }))
    );
    
    toast({
      title: "Removed from wishlist",
      description: "The item has been removed from your wishlist.",
    });
  }

  // Clear the main wishlist
  const clearWishlist = () => {
    if (!user) return;

    setWishlist([]);
    
    if (user) {
      const userWishlistKey = `${WISHLIST_STORAGE_KEY}_${user.uid}`;
      localStorage.removeItem(userWishlistKey);
    }
    
    toast({
      title: "Wishlist cleared",
      description: "All items have been removed from your wishlist.",
    });
  }

  // Create a new list
  const addList = (name: string): UserList => {
    if (!user) {
      toast({
        title: "Please log in",
        description: "You need to be logged in to create lists.",
        variant: "destructive",
      });
      throw new Error("User not logged in");
    }

    const newList: UserList = {
      id: generateId(),
      name,
      items: [],
      createdAt: Date.now()
    };

    setUserLists(prev => [...prev, newList]);
    
    toast({
      title: "List created",
      description: `Your list "${name}" has been created.`,
    });

    return newList;
  }

  // Rename an existing list
  const renameList = (listId: string, newName: string) => {
    if (!user) return;

    setUserLists(prev => 
      prev.map(list => 
        list.id === listId 
          ? { ...list, name: newName } 
          : list
      )
    );
    
    toast({
      title: "List renamed",
      description: `Your list has been renamed to "${newName}".`,
    });
  }

  // Delete a list
  const deleteList = (listId: string) => {
    if (!user) return;

    setUserLists(prev => prev.filter(list => list.id !== listId));
    
    toast({
      title: "List deleted",
      description: "Your list has been deleted.",
    });
  }

  // Add an item to a specific list
  const addToList = (listId: string, product: WishlistItem) => {
    if (!user) {
      toast({
        title: "Please log in",
        description: "You need to be logged in to add items to lists.",
        variant: "destructive",
      });
      return;
    }

    // Make sure the product is in the main wishlist first, but skip adding to default list
    if (!isItemInWishlist(product.id)) {
      addToWishlist(product, true);
    }

    const enrichedProduct = {
      ...product,
      addedAt: product.addedAt || Date.now()
    };

    setUserLists(prev => 
      prev.map(list => {
        if (list.id === listId) {
          // Check if the item is already in the list
          if (list.items.some(item => item.id === product.id)) {
            return list;
          }
          return {
            ...list,
            items: [...list.items, enrichedProduct]
          };
        }
        return list;
      })
    );
    
    toast({
      title: "Added to list",
      description: `${product.name} has been added to your list.`,
    });
  }

  // Remove an item from a specific list
  const removeFromList = (listId: string, productId: string) => {
    if (!user) return;

    setUserLists(prev => 
      prev.map(list => {
        if (list.id === listId) {
          return {
            ...list,
            items: list.items.filter(item => item.id !== productId)
          };
        }
        return list;
      })
    );
    
    toast({
      title: "Removed from list",
      description: "The item has been removed from your list.",
    });
  }

  // Get all lists that contain a specific item
  const getItemLists = (productId: string): UserList[] => {
    return userLists.filter(list => 
      list.items.some(item => item.id === productId)
    );
  }

  const value: WishlistContextType = {
    wishlist,
    userLists,
    isItemInWishlist,
    isItemInList,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    addList,
    renameList,
    deleteList,
    addToList,
    removeFromList,
    getItemLists
  }

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}

export function useWishlist(): WishlistContextType {
  const context = useContext(WishlistContext)
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider")
  }
  return context
} 