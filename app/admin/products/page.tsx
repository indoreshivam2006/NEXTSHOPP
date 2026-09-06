"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { 
  Package, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Check, 
  X, 
  AlertCircle,
  Eye,
  CheckCircle2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { formatRupees } from "@/lib/utils"
import { 
  getAllProductsAdmin, 
  addProduct, 
  updateProduct, 
  deleteProduct, 
  Product 
} from "@/lib/firebase/products"

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  // Modal States
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [deletingProductId, setDeletingProductId] = useState<string | null>(null)

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    category: "Electronics",
    categoryId: "4",
    price: 0,
    originalPrice: 0,
    discount: 0,
    description: "",
    image: "",
    inStock: true,
    sizes: "S, M, L, XL",
    colors: "#000000, #FFFFFF",
  })

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    setLoading(true)
    try {
      const items = await getAllProductsAdmin()
      setProducts(items)
      setFilteredProducts(items)
    } catch {
      toast({
        title: "Error",
        description: "Failed to load products",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  // Filter and search
  useEffect(() => {
    let result = products
    if (categoryFilter !== "all") {
      result = result.filter((p) => p.category === categoryFilter)
    }
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase()
      result = result.filter(
        (p) => p.name.toLowerCase().includes(term) || p.description.toLowerCase().includes(term)
      )
    }
    setFilteredProducts(result)
  }, [searchTerm, categoryFilter, products])

  const handleOpenAdd = () => {
    setFormData({
      name: "",
      category: "Electronics",
      categoryId: "4",
      price: 999,
      originalPrice: 1299,
      discount: 23,
      description: "High performance modern item with premium materials and warranty.",
      image: "/jacket_1.avif",
      inStock: true,
      sizes: "S, M, L, XL",
      colors: "#1E293B, #4F46E5",
    })
    setIsAddOpen(true)
  }

  const handleOpenEdit = (product: Product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      category: product.category,
      categoryId: product.categoryId,
      price: product.price,
      originalPrice: product.originalPrice || product.price,
      discount: product.discount || 0,
      description: product.description,
      image: product.images[0] || "",
      inStock: product.inStock,
      sizes: product.sizes?.join(", ") || "",
      colors: product.colors?.join(", ") || "",
    })
    setIsEditOpen(true)
  }

  const handleSaveAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name.trim()) {
      toast({ title: "Name is required", variant: "destructive" })
      return
    }

    try {
      const newProd = await addProduct({
        name: formData.name,
        category: formData.category,
        categoryId: formData.categoryId,
        price: Number(formData.price),
        originalPrice: Number(formData.originalPrice),
        discount: Number(formData.discount),
        description: formData.description,
        images: [formData.image || "/jacket_1.avif"],
        inStock: formData.inStock,
        sizes: formData.sizes.split(",").map((s) => s.trim()).filter(Boolean),
        colors: formData.colors.split(",").map((c) => c.trim()).filter(Boolean),
        rating: 4.8,
        reviewCount: 1,
        featured: false,
      })

      setProducts((prev) => [newProd, ...prev])
      setIsAddOpen(false)
      toast({
        title: "Product Created",
        description: `${newProd.name} added to catalog and available in store.`,
      })
    } catch {
      toast({
        title: "Error",
        description: "Failed to add product",
        variant: "destructive",
      })
    }
  }

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingProduct) return

    try {
      const updated = await updateProduct(editingProduct.id, {
        name: formData.name,
        category: formData.category,
        categoryId: formData.categoryId,
        price: Number(formData.price),
        originalPrice: Number(formData.originalPrice),
        discount: Number(formData.discount),
        description: formData.description,
        images: [formData.image || editingProduct.images[0] || "/jacket_1.avif"],
        inStock: formData.inStock,
        sizes: formData.sizes.split(",").map((s) => s.trim()).filter(Boolean),
        colors: formData.colors.split(",").map((c) => c.trim()).filter(Boolean),
      })

      setProducts((prev) => prev.map((p) => (p.id === editingProduct.id ? updated : p)))
      setIsEditOpen(false)
      setEditingProduct(null)
      toast({
        title: "Product Updated",
        description: `Changes to ${updated.name} have been saved.`,
      })
    } catch {
      toast({
        title: "Error",
        description: "Failed to update product",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id)
      setProducts((prev) => prev.filter((p) => p.id !== id))
      setDeletingProductId(null)
      toast({
        title: "Product Deleted",
        description: "The item has been removed from the catalog.",
      })
    } catch {
      toast({
        title: "Error",
        description: "Failed to delete product",
        variant: "destructive",
      })
    }
  }

  const uniqueCategories = ["all", ...new Set(products.map((p) => p.category))]

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#181818] tracking-tight">
            Product Management
          </h1>
          <p className="text-sm text-[#7c7c7c]">
            Create, update, and manage your inventory. ({products.length} total products)
          </p>
        </div>
        <Button
          onClick={handleOpenAdd}
          className="bg-[#181818] hover:bg-[#2c2c2c] text-[#f0ebe6] font-semibold flex items-center gap-2 rounded-xl"
        >
          <Plus className="w-4 h-4" />
          Add New Product
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 bg-white/70 backdrop-blur-sm border border-[#181818]/8 p-4 rounded-2xl">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#7c7c7c] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <Input
            placeholder="Search by product name or keywords..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-[#f0ebe6] border-[#181818]/10 text-[#181818] placeholder:text-[#a09890]"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-2 rounded-lg bg-[#f0ebe6] border border-[#181818]/10 text-[#181818] text-sm focus:outline-none focus:ring-1 focus:ring-[#181818]"
        >
          {uniqueCategories.map((c) => (
            <option key={c} value={c} className="capitalize">
              {c === "all" ? "All Categories" : c}
            </option>
          ))}
        </select>
      </div>

      {/* Products Table */}
      <div className="bg-white/70 backdrop-blur-sm border border-[#181818]/8 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[#181818]/8 bg-[#181818]/[0.03] text-[#7c7c7c] text-xs uppercase tracking-wider">
                <th className="py-3.5 px-4 font-semibold">Product</th>
                <th className="py-3.5 px-4 font-semibold">Category</th>
                <th className="py-3.5 px-4 font-semibold">Price</th>
                <th className="py-3.5 px-4 font-semibold">Status</th>
                <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#181818]/5">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-[#7c7c7c]">
                    Loading products catalog...
                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-[#7c7c7c]">
                    No products found matching &quot;{searchTerm}&quot;
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-[#181818]/[0.02] transition-colors">
                    {/* Product Info */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-[#f0ebe6] border border-[#181818]/10 overflow-hidden relative shrink-0 flex items-center justify-center">
                          <img
                            src={product.images[0] || "/thumbnail-placeholder.png"}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <div className="text-[#181818] font-semibold truncate max-w-xs md:max-w-md">
                            {product.name}
                          </div>
                          <div className="text-xs text-[#7c7c7c] truncate max-w-xs">
                            {product.description}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3 px-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-[#f0ebe6] border border-[#181818]/10 text-[#181818]">
                        {product.category}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="py-3 px-4 font-bold text-[#181818] whitespace-nowrap">
                      {formatRupees(product.price)}
                      {product.originalPrice && product.originalPrice > product.price && (
                        <span className="block text-xs text-[#a09890] font-normal line-through">
                          {formatRupees(product.originalPrice)}
                        </span>
                      )}
                    </td>

                    {/* Stock */}
                    <td className="py-3 px-4">
                      {product.inStock ? (
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          In Stock
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                          Out of Stock
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleOpenEdit(product)}
                          className="h-8 w-8 text-[#7c7c7c] hover:text-[#181818] hover:bg-[#181818]/5"
                          title="Edit Product"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setDeletingProductId(product.id)}
                          className="h-8 w-8 text-[#7c7c7c] hover:text-rose-600 hover:bg-rose-50"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Product Modal */}
      <Dialog
        open={isAddOpen || isEditOpen}
        onOpenChange={(open) => {
          if (!open) {
            setIsAddOpen(false)
            setIsEditOpen(false)
            setEditingProduct(null)
          }
        }}
      >
        <DialogContent className="max-w-xl bg-[#f0ebe6] border-[#181818]/15 text-[#181818] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-[#181818]">
              {isAddOpen ? "Add New Product to Store" : `Edit: ${editingProduct?.name}`}
            </DialogTitle>
            <DialogDescription className="text-[#7c7c7c] text-xs">
              Fill in product details. Changes update immediately across the user storefront.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={isAddOpen ? handleSaveAdd : handleSaveEdit} className="space-y-4 pt-2">
            <div>
              <Label className="text-[#181818] text-xs font-semibold">Product Name</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                placeholder="e.g. NextGen Wireless Earbuds Pro"
                className="bg-white border-[#181818]/10 text-[#181818] mt-1"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-[#181818] text-xs font-semibold">Category</Label>
                <Input
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="e.g. Electronics"
                  className="bg-white border-[#181818]/10 text-[#181818] mt-1"
                />
              </div>
              <div>
                <Label className="text-[#181818] text-xs font-semibold">Category ID</Label>
                <Input
                  value={formData.categoryId}
                  onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                  placeholder="e.g. 4"
                  className="bg-white border-[#181818]/10 text-[#181818] mt-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <Label className="text-[#181818] text-xs font-semibold">Price (₹)</Label>
                <Input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                  required
                  className="bg-white border-[#181818]/10 text-[#181818] mt-1"
                />
              </div>
              <div>
                <Label className="text-[#181818] text-xs font-semibold">Original Price (₹)</Label>
                <Input
                  type="number"
                  value={formData.originalPrice}
                  onChange={(e) => setFormData({ ...formData, originalPrice: Number(e.target.value) })}
                  className="bg-white border-[#181818]/10 text-[#181818] mt-1"
                />
              </div>
              <div>
                <Label className="text-[#181818] text-xs font-semibold">Discount %</Label>
                <Input
                  type="number"
                  value={formData.discount}
                  onChange={(e) => setFormData({ ...formData, discount: Number(e.target.value) })}
                  className="bg-white border-[#181818]/10 text-[#181818] mt-1"
                />
              </div>
            </div>

            <div>
              <Label className="text-[#181818] text-xs font-semibold">Image Path / URL</Label>
              <Input
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="e.g. /jacket_1.avif or https://..."
                className="bg-white border-[#181818]/10 text-[#181818] mt-1"
              />
            </div>

            <div>
              <Label className="text-[#181818] text-xs font-semibold">Sizes (comma separated)</Label>
              <Input
                value={formData.sizes}
                onChange={(e) => setFormData({ ...formData, sizes: e.target.value })}
                placeholder="S, M, L, XL or 128GB, 256GB"
                className="bg-white border-[#181818]/10 text-[#181818] mt-1"
              />
            </div>

            <div>
              <Label className="text-[#181818] text-xs font-semibold">Colors (comma separated hex/names)</Label>
              <Input
                value={formData.colors}
                onChange={(e) => setFormData({ ...formData, colors: e.target.value })}
                placeholder="#000000, #FFFFFF, #4F46E5"
                className="bg-white border-[#181818]/10 text-[#181818] mt-1"
              />
            </div>

            <div>
              <Label className="text-[#181818] text-xs font-semibold">Description</Label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full rounded-md bg-white border border-[#181818]/10 text-[#181818] text-sm p-2.5 mt-1 focus:outline-none focus:ring-1 focus:ring-[#181818]"
              />
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="inStockCheck"
                checked={formData.inStock}
                onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                className="rounded border-[#181818]/20 bg-white text-[#181818] focus:ring-[#181818]"
              />
              <Label htmlFor="inStockCheck" className="text-xs text-[#181818] cursor-pointer">
                Product is In Stock & Purchasable
              </Label>
            </div>

            <DialogFooter className="pt-4 border-t border-[#181818]/10">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsAddOpen(false)
                  setIsEditOpen(false)
                }}
                className="border-[#181818]/15 text-[#181818] hover:bg-[#181818]/5 rounded-xl"
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-[#181818] hover:bg-[#2c2c2c] text-[#f0ebe6] font-semibold rounded-xl">
                {isAddOpen ? "Add Product" : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={Boolean(deletingProductId)} onOpenChange={(open) => !open && setDeletingProductId(null)}>
        <DialogContent className="max-w-sm bg-[#f0ebe6] border-[#181818]/15 text-[#181818]">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-[#181818]">Confirm Deletion</DialogTitle>
            <DialogDescription className="text-[#7c7c7c] text-xs">
              Are you sure you want to remove this product? It will no longer appear in the store.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="pt-3">
            <Button
              variant="outline"
              onClick={() => setDeletingProductId(null)}
              className="border-[#181818]/15 text-[#181818] hover:bg-[#181818]/5 rounded-xl"
            >
              Cancel
            </Button>
            <Button
              onClick={() => deletingProductId && handleDelete(deletingProductId)}
              className="bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-xl"
            >
              Delete Product
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
