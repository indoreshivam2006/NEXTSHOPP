"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { getProductFilters } from "@/lib/firebase/products"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface FilterOption {
  id: string
  name: string
  value?: string
}

export default function ProductFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // Get initial filters from URL
  const initialCategories = searchParams.get("categories")?.split(",") || []
  const initialBrands = searchParams.get("brands")?.split(",") || []
  const initialColors = searchParams.get("colors")?.split(",") || []
  const initialSizes = searchParams.get("sizes")?.split(",") || []
  const initialPriceMin = Number(searchParams.get("minPrice") || "0")
  const initialPriceMax = Number(searchParams.get("maxPrice") || "100000")
  const initialInStock = searchParams.get("inStock") === "true"

  // Filter state
  const [categories, setCategories] = useState<FilterOption[]>([])
  const [brands, setBrands] = useState<FilterOption[]>([])
  const [colors, setColors] = useState<FilterOption[]>([])
  const [sizes, setSizes] = useState<FilterOption[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([initialPriceMin, initialPriceMax])
  const [maxPrice, setMaxPrice] = useState<number>(100000)
  const [minPrice, setMinPrice] = useState<number>(0)
  const [inStock, setInStock] = useState<boolean>(initialInStock)
  
  // Selected filters
  const [selectedCategories, setSelectedCategories] = useState<string[]>(initialCategories)
  const [selectedBrands, setSelectedBrands] = useState<string[]>(initialBrands)
  const [selectedColors, setSelectedColors] = useState<string[]>(initialColors)
  const [selectedSizes, setSelectedSizes] = useState<string[]>(initialSizes)
  
  // Active filter count for badges
  const [activeFilterCount, setActiveFilterCount] = useState(0)

  // Fetch filter options
  useEffect(() => {
    const loadFilters = async () => {
      try {
        const filters = await getProductFilters()
        setCategories(filters.categories)
        setBrands(filters.brands)
        setColors(filters.colors.map(color => ({ 
          id: color, 
          name: getColorName(color), 
          value: color 
        })))
        setSizes(filters.sizes.map(size => ({ id: size, name: size })))
        setMinPrice(filters.priceRange.min)
        setMaxPrice(filters.priceRange.max)
        
        // Set initial price range based on fetched data
        if (!searchParams.has("minPrice") && !searchParams.has("maxPrice")) {
          setPriceRange([filters.priceRange.min, filters.priceRange.max])
        }
      } catch (error) {
        console.error("Error loading filters:", error)
      }
    }
    
    loadFilters()
  }, [searchParams])
  
  // Update active filter count
  useEffect(() => {
    let count = 0
    if (selectedCategories.length) count++
    if (selectedBrands.length) count++
    if (selectedColors.length) count++
    if (selectedSizes.length) count++
    if (priceRange[0] > minPrice || priceRange[1] < maxPrice) count++
    if (inStock) count++
    
    setActiveFilterCount(count)
  }, [selectedCategories, selectedBrands, selectedColors, selectedSizes, priceRange, inStock, minPrice, maxPrice])

  // Helper to get color names
  const getColorName = (colorHex: string) => {
    const colorMap: Record<string, string> = {
      "#000000": "Black",
      "#FFFFFF": "White",
      "#FF0000": "Red",
      "#0000FF": "Blue",
      "#00FF00": "Green",
      "#0F172A": "Navy",
      "#78350F": "Brown",
      "#6B7280": "Gray",
      "#7C2D12": "Brick",
      "#f9d976": "Gold",
    }
    return colorMap[colorHex] || "Color"
  }

  // Apply filters to URL
  const applyFilters = () => {
    const params = new URLSearchParams()
    
    if (selectedCategories.length) {
      params.set("categories", selectedCategories.join(","))
    }
    
    if (selectedBrands.length) {
      params.set("brands", selectedBrands.join(","))
    }
    
    if (selectedColors.length) {
      params.set("colors", selectedColors.join(","))
    }
    
    if (selectedSizes.length) {
      params.set("sizes", selectedSizes.join(","))
    }
    
    if (priceRange[0] > minPrice) {
      params.set("minPrice", priceRange[0].toString())
    }
    
    if (priceRange[1] < maxPrice) {
      params.set("maxPrice", priceRange[1].toString())
    }
    
    if (inStock) {
      params.set("inStock", "true")
    }
    
    // Preserve sort parameter if it exists
    const sort = searchParams.get("sort")
    if (sort) {
      params.set("sort", sort)
    }
    
    // Navigate to filtered results
    router.push(`/products?${params.toString()}`)
  }
  
  // Clear all filters
  const clearAllFilters = () => {
    setSelectedCategories([])
    setSelectedBrands([])
    setSelectedColors([])
    setSelectedSizes([])
    setPriceRange([minPrice, maxPrice])
    setInStock(false)
    
    // Preserve sort parameter if it exists
    const sort = searchParams.get("sort")
    const params = new URLSearchParams()
    if (sort) {
      params.set("sort", sort)
    }
    
    router.push(`/products${sort ? `?${params.toString()}` : ""}`)
  }

  // Toggle filter selection
  const toggleCategory = (id: string) => {
    setSelectedCategories(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    )
  }
  
  const toggleBrand = (id: string) => {
    setSelectedBrands(prev => 
      prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]
    )
  }
  
  const toggleColor = (id: string) => {
    setSelectedColors(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    )
  }
  
  const toggleSize = (id: string) => {
    setSelectedSizes(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Filters</h3>
        <div className="flex justify-between items-center">
          <Button variant="outline" size="sm" onClick={clearAllFilters}>
            Clear All
          </Button>
          {activeFilterCount > 0 && (
            <Badge variant="secondary">{activeFilterCount} active</Badge>
          )}
        </div>
      </div>

      <Accordion type="multiple" defaultValue={["categories", "price", "brands", "colors", "sizes", "stock"]}>
        <AccordionItem value="categories">
          <AccordionTrigger className="flex justify-between">
            Categories
            {selectedCategories.length > 0 && (
              <Badge variant="outline" className="ml-auto mr-4">{selectedCategories.length}</Badge>
            )}
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`category-${category.id}`}
                    checked={selectedCategories.includes(category.id)}
                    onCheckedChange={() => toggleCategory(category.id)}
                  />
                  <Label htmlFor={`category-${category.id}`} className="text-sm font-normal cursor-pointer">
                    {category.name}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger className="flex justify-between">
            Price Range
            {(priceRange[0] > minPrice || priceRange[1] < maxPrice) && (
              <Badge variant="outline" className="ml-auto mr-4">Active</Badge>
            )}
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-5">
              <div className="pt-5 pb-1">
                <Slider 
                  min={minPrice} 
                  max={maxPrice} 
                  step={Math.max(1, Math.floor((maxPrice - minPrice) / 100))}
                  value={priceRange} 
                  onValueChange={(value) => {
                    setPriceRange(value as [number, number]);
                  }}
                  className="my-5"
                  aria-label="Price Range"
                />
              </div>
              
              <div className="flex items-center gap-3">
                <div className="relative rounded-md shadow-sm flex-1">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-gray-500 sm:text-sm">₹</span>
                  </div>
                  <input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      if (!isNaN(value) && value >= minPrice && value <= priceRange[1]) {
                        setPriceRange([value, priceRange[1]]);
                      }
                    }}
                    className="block w-full rounded-md border py-2 pl-8 pr-3 text-sm focus:ring-1 focus:ring-black focus:outline-none"
                    placeholder="Min"
                    min={minPrice}
                    max={priceRange[1]}
                    aria-label="Minimum price"
                  />
                </div>
                
                <div className="text-gray-500">to</div>
                
                <div className="relative rounded-md shadow-sm flex-1">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-gray-500 sm:text-sm">₹</span>
                  </div>
                  <input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      if (!isNaN(value) && value <= maxPrice && value >= priceRange[0]) {
                        setPriceRange([priceRange[0], value]);
                      }
                    }}
                    className="block w-full rounded-md border py-2 pl-8 pr-3 text-sm focus:ring-1 focus:ring-black focus:outline-none"
                    placeholder="Max"
                    min={priceRange[0]}
                    max={maxPrice}
                    aria-label="Maximum price"
                  />
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-2">
                <button
                  onClick={() => setPriceRange([minPrice, 1000])}
                  className={`px-3 py-1 text-xs border rounded-full hover:bg-gray-100 ${
                    priceRange[0] === minPrice && priceRange[1] === 1000 ? 'bg-gray-100 border-gray-400' : 'border-gray-200'
                  }`}
                >
                  Under ₹1,000
                </button>
                <button
                  onClick={() => setPriceRange([1000, 5000])}
                  className={`px-3 py-1 text-xs border rounded-full hover:bg-gray-100 ${
                    priceRange[0] === 1000 && priceRange[1] === 5000 ? 'bg-gray-100 border-gray-400' : 'border-gray-200'
                  }`}
                >
                  ₹1,000 - ₹5,000
                </button>
                <button
                  onClick={() => setPriceRange([5000, 15000])}
                  className={`px-3 py-1 text-xs border rounded-full hover:bg-gray-100 ${
                    priceRange[0] === 5000 && priceRange[1] === 15000 ? 'bg-gray-100 border-gray-400' : 'border-gray-200'
                  }`}
                >
                  ₹5,000 - ₹15,000
                </button>
                <button
                  onClick={() => setPriceRange([15000, maxPrice])}
                  className={`px-3 py-1 text-xs border rounded-full hover:bg-gray-100 ${
                    priceRange[0] === 15000 && priceRange[1] === maxPrice ? 'bg-gray-100 border-gray-400' : 'border-gray-200'
                  }`}
                >
                  Above ₹15,000
                </button>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="brands">
          <AccordionTrigger className="flex justify-between">
            Brands
            {selectedBrands.length > 0 && (
              <Badge variant="outline" className="ml-auto mr-4">{selectedBrands.length}</Badge>
            )}
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {brands.map((brand) => (
                <div key={brand.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`brand-${brand.id}`}
                    checked={selectedBrands.includes(brand.id)}
                    onCheckedChange={() => toggleBrand(brand.id)}
                  />
                  <Label htmlFor={`brand-${brand.id}`} className="text-sm font-normal cursor-pointer">
                    {brand.name}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="colors">
          <AccordionTrigger className="flex justify-between">
            Colors
            {selectedColors.length > 0 && (
              <Badge variant="outline" className="ml-auto mr-4">{selectedColors.length}</Badge>
            )}
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-4 gap-2">
              {colors.map((color) => (
                <div key={color.id} className="flex flex-col items-center space-y-1">
                  <button
                    className={`w-8 h-8 rounded-full border focus:outline-none ${
                      selectedColors.includes(color.id) 
                        ? 'ring-2 ring-black ring-offset-2' 
                        : 'border-gray-300'
                    }`}
                    style={{ backgroundColor: color.value }}
                    aria-label={`Filter by color: ${color.name}`}
                    onClick={() => toggleColor(color.id)}
                  />
                  <span className="text-xs">{color.name}</span>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {sizes.length > 0 && (
          <AccordionItem value="sizes">
            <AccordionTrigger className="flex justify-between">
              Sizes
              {selectedSizes.length > 0 && (
                <Badge variant="outline" className="ml-auto mr-4">{selectedSizes.length}</Badge>
              )}
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <button
                    key={size.id}
                    className={`px-3 py-1 border rounded-md text-sm ${
                      selectedSizes.includes(size.id)
                        ? 'bg-black text-white border-black'
                        : 'border-gray-300 hover:border-gray-500'
                    }`}
                    onClick={() => toggleSize(size.id)}
                  >
                    {size.name}
                  </button>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        )}
        
        <AccordionItem value="stock">
          <AccordionTrigger>Availability</AccordionTrigger>
          <AccordionContent>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="in-stock" 
                checked={inStock}
                onCheckedChange={(checked) => setInStock(checked as boolean)}
              />
              <Label htmlFor="in-stock" className="text-sm font-normal cursor-pointer">
                In Stock Only
              </Label>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      
      <Separator />
      
      <Button className="w-full" onClick={applyFilters}>
        Apply Filters
      </Button>
    </div>
  )
}
