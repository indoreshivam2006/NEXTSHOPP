"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { useWishlist, UserList } from "@/context/wishlist-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { formatRupees } from "@/lib/utils"
import { 
  PlusCircle, 
  Trash2, 
  Pencil, 
  Heart, 
  Check, 
  X,
  ListPlus
} from "lucide-react"
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export default function ListsPage() {
  const { user } = useAuth()
  const router = useRouter()
  const { 
    userLists, 
    addList, 
    renameList, 
    deleteList, 
    removeFromList,
    clearWishlist
  } = useWishlist()
  
  const [loading, setLoading] = useState(true)
  const [newListName, setNewListName] = useState("")
  const [editingListId, setEditingListId] = useState<string | null>(null)
  const [editListName, setEditListName] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [deletingListId, setDeletingListId] = useState<string | null>(null)
  
  // Check if user is logged in
  useEffect(() => {
    if (!user) {
      router.push("/auth/login?redirect=/lists")
      return
    }
    
    // Set loading to false after a short delay
    const timer = setTimeout(() => {
      setLoading(false)
    }, 500)
    
    return () => clearTimeout(timer)
  }, [user, router])
  
  // Handle creating a new list
  const handleCreateList = () => {
    if (!newListName.trim()) return
    
    addList(newListName.trim())
    setNewListName("")
  }
  
  // Handle starting to edit a list name
  const handleStartEditing = (list: UserList) => {
    setEditingListId(list.id)
    setEditListName(list.name)
  }
  
  // Handle saving a list name edit
  const handleSaveEdit = () => {
    if (editingListId && editListName.trim()) {
      renameList(editingListId, editListName.trim())
      setEditingListId(null)
      setEditListName("")
    }
  }
  
  // Handle canceling a list name edit
  const handleCancelEdit = () => {
    setEditingListId(null)
    setEditListName("")
  }
  
  // Handle starting to delete a list
  const handleStartDeleting = (listId: string) => {
    setDeletingListId(listId)
  }
  
  // Handle confirming list deletion
  const handleConfirmDelete = () => {
    if (deletingListId) {
      deleteList(deletingListId)
      setDeletingListId(null)
      
      // If the deleted list was the active tab, switch to "all"
      if (activeTab === deletingListId) {
        setActiveTab("all")
      }
    }
  }
  
  // Handle removing an item from a list
  const handleRemoveItem = (listId: string, productId: string) => {
    removeFromList(listId, productId)
  }
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">My Lists</h1>
        <div className="grid gap-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="border rounded-lg overflow-hidden animate-pulse">
              <div className="p-4">
                <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[...Array(3)].map((_, idx) => (
                    <div key={idx} className="h-24 bg-gray-200 rounded"></div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
  
  if (userLists.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <ListPlus className="h-16 w-16 mx-auto text-gray-400 mb-6" />
          <h1 className="text-3xl font-bold mb-4">You Don't Have Any Lists Yet</h1>
          <p className="text-gray-600 mb-8">
            Create lists to organize products you like. You can create multiple lists for different categories or occasions.
          </p>
          
          <div className="flex gap-2 max-w-sm mx-auto mb-8">
            <Input
              placeholder="Enter list name..."
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              className="flex-1"
            />
            <Button 
              onClick={handleCreateList} 
              disabled={!newListName.trim()}
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Create List
            </Button>
          </div>
          
          <Button asChild variant="outline">
            <Link href="/products">Explore Products</Link>
          </Button>
        </div>
      </div>
    )
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Lists</h1>
        
        <div className="flex gap-2">
          <Input
            placeholder="New list name..."
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
            className="w-52"
          />
          <Button 
            onClick={handleCreateList} 
            disabled={!newListName.trim()}
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Create
          </Button>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full max-w-screen-lg mb-6 overflow-x-auto flex-wrap">
          <TabsTrigger value="all" className="flex-shrink-0">
            All Items
          </TabsTrigger>
          {userLists.map(list => (
            <TabsTrigger key={list.id} value={list.id} className="flex-shrink-0">
              {list.name} ({list.items.length})
            </TabsTrigger>
          ))}
        </TabsList>
        
        <TabsContent value="all" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">All Saved Items</h2>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={clearWishlist}
              className="text-red-500 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Clear All
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {userLists.flatMap(list => list.items)
              // Remove duplicates by product ID
              .filter((item, index, self) => 
                index === self.findIndex(t => t.id === item.id)
              )
              .sort((a, b) => (b.addedAt || 0) - (a.addedAt || 0))
              .map(item => (
                <Link
                  href={`/products/${item.id}`}
                  key={item.id}
                  className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="relative h-40">
                    <Image
                      src={item.image || "/product-placeholder.png"}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium text-sm truncate">{item.name}</h3>
                    <div className="flex justify-between items-center mt-1">
                      <span className="font-bold text-sm">{formatRupees(item.price)}</span>
                      <Heart className="h-4 w-4 text-red-500 fill-red-500" />
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </TabsContent>
        
        {userLists.map(list => (
          <TabsContent key={list.id} value={list.id} className="space-y-6">
            <div className="flex justify-between items-center">
              {editingListId === list.id ? (
                <div className="flex items-center gap-2">
                  <Input
                    value={editListName}
                    onChange={(e) => setEditListName(e.target.value)}
                    className="w-60"
                    autoFocus
                  />
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleSaveEdit}
                    disabled={!editListName.trim()}
                  >
                    <Check className="h-4 w-4 text-green-600" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={handleCancelEdit}
                  >
                    <X className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              ) : (
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  {list.name}
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleStartEditing(list)}
                    className="ml-1"
                  >
                    <Pencil className="h-3.5 w-3.5 text-gray-500" />
                  </Button>
                </h2>
              )}
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleStartDeleting(list.id)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete List
                </Button>
              </div>
            </div>
            
            {list.items.length === 0 ? (
              <div className="text-center py-12 border rounded-lg">
                <Heart className="h-8 w-8 mx-auto text-gray-300 mb-3" />
                <p className="text-gray-500">This list is empty</p>
                <Button asChild variant="link" className="mt-2">
                  <Link href="/products">Add some products</Link>
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {list.items
                  .sort((a, b) => (b.addedAt || 0) - (a.addedAt || 0))
                  .map(item => (
                    <div
                      key={item.id}
                      className="border rounded-lg overflow-hidden group relative"
                    >
                      <Link href={`/products/${item.id}`}>
                        <div className="relative h-40">
                          <Image
                            src={item.image || "/product-placeholder.png"}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="p-3">
                          <h3 className="font-medium text-sm truncate">{item.name}</h3>
                          <div className="flex justify-between items-center mt-1">
                            <span className="font-bold text-sm">{formatRupees(item.price)}</span>
                          </div>
                        </div>
                      </Link>
                      <button
                        onClick={() => handleRemoveItem(list.id, item.id)}
                        className="absolute top-2 right-2 p-1.5 bg-white rounded-full text-gray-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label="Remove from list"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
      
      {/* Confirmation Dialog for List Deletion */}
      <AlertDialog open={!!deletingListId} onOpenChange={(open) => !open && setDeletingListId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will delete the list and remove it from your account. The items will remain in your other lists if they were saved there.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleConfirmDelete}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete List
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
} 