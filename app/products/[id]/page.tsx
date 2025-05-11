import { notFound } from "next/navigation"
import AddToCartButton from "@/components/add-to-cart-button"
import ProductGallery from "@/components/product-gallery"
import RelatedProducts from "@/components/related-products"
import { getProductById } from "@/lib/firebase/products"
import { formatRupees } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id)

  if (!product) {
    notFound()
  }
  
  // Transform product images to the expected format for ProductGallery
  const formattedImages = product.images.map((src, index) => ({
    id: index.toString(),
    src,
    alt: `${product.name} image ${index + 1}`
  }));

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <ProductGallery images={formattedImages} productName={product.name} />
        <div className="flex flex-col gap-6">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold">₹{product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <>
                <span className="text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
                <span className="text-green-600 font-medium">{product.discount}%</span>
              </>
            )}
          </div>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                className={`w-5 h-5 ${star <= product.rating ? "text-yellow-400" : "text-gray-300"}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="text-gray-600">({product.reviewCount} reviews)</span>
          </div>
          
          {/* Key Features */}
          <div className="border-t border-b py-4 my-4">
            <h3 className="font-medium mb-2">Key Features</h3>
            <ul className="space-y-2">
              {product.features && product.features.length > 0 ? (
                product.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="bg-gray-200 rounded-full h-1.5 w-1.5"></span>
                    <span>{feature}</span>
                  </li>
                ))
              ) : (
                /* Check if description contains pipe separators (common in specifications) */
                product.description.includes('|') ? (
                  product.description.split('|')
                    .filter(part => part.trim().length > 0)
                    .map((part, index) => {
                      /* Format each specification (Key: Value) */
                      const keyValue = part.trim().split(':');
                      if (keyValue.length >= 2) {
                        const key = keyValue[0].trim();
                        const value = keyValue.slice(1).join(':').trim();
                        return (
                          <li key={index} className="flex items-start gap-2">
                            <span className="bg-gray-200 rounded-full h-1.5 w-1.5 mt-2"></span>
                            <span>
                              <span className="font-medium">{key}: </span>
                              {value}
                            </span>
                          </li>
                        );
                      }
                      /* Fall back for parts without clear key-value format */
                      return (
                        <li key={index} className="flex items-center gap-2">
                          <span className="bg-gray-200 rounded-full h-1.5 w-1.5"></span>
                          <span>{part.trim()}</span>
                        </li>
                      );
                    })
                ) : (
                  /* Check if description contains line breaks */
                  product.description.includes('\n') ? (
                    product.description.split('\n')
                      .filter(line => line.trim().length > 0)
                      .map((line, index) => {
                        /* Check if line contains key-value format (e.g., "Key: Value") */
                        const parts = line.split(':');
                        if (parts.length >= 2) {
                          const key = parts[0].trim();
                          const value = parts.slice(1).join(':').trim();
                          return (
                            <li key={index} className="flex items-start gap-2">
                              <span className="bg-gray-200 rounded-full h-1.5 w-1.5 mt-2"></span>
                              <span>
                                <span className="font-medium">{key}: </span>
                                {value}
                              </span>
                            </li>
                          );
                        }
                        /* Regular line without key-value format */
                        return (
                          <li key={index} className="flex items-center gap-2">
                            <span className="bg-gray-200 rounded-full h-1.5 w-1.5"></span>
                            <span>{line}</span>
                          </li>
                        );
                      })
                  ) : (
                    /* Check if this looks like an ingredient list (cosmetics, food, etc.) */
                    (product.description.includes('Ingredients:') || 
                     (product.description.split(',').length > 10 && 
                      /\b(Dimethicone|Aqua|Sodium|Parfum|Fragrance|Titanium|Glycerin)\b/i.test(product.description))
                    ) ? (
                      <div>
                        {/* If it starts with 'Ingredients:' label, strip it out for better formatting */}
                        {!product.description.startsWith('Ingredients:') && (
                          <li className="flex items-start mb-2">
                            <span className="font-medium">Ingredients: </span>
                          </li>
                        )}
                        
                        {/* Split the ingredient list by commas and display each ingredient */}
                        <div className="pl-4">
                          {/* Handle "May Contain" section differently if present */}
                          {product.description.includes('[+/-') || product.description.includes('May Contain') ? (
                            <>
                              {/* Regular ingredients */}
                              <div className="mb-2">
                                {product.description
                                  .split(/\[.*?\]/)[0] // Get text before the [+/-...] section
                                  .split(',')
                                  .map((ingredient, idx) => {
                                    const trimmed = ingredient.trim().replace(/\.$/, ''); // Remove trailing period
                                    if (!trimmed) return null;
                                    return (
                                      <div key={idx} className="flex items-start gap-2 mb-1">
                                        <span className="bg-gray-200 rounded-full h-1.5 w-1.5 mt-2"></span>
                                        <span>{trimmed}</span>
                                      </div>
                                    );
                                  })}
                              </div>
                              
                              {/* May Contain section */}
                              <div className="mt-2">
                                <div className="font-medium mb-1">May Contain:</div>
                                {product.description
                                  .match(/\[\+\/-(.*?)\]/)?.[1] // Extract content from [+/- ... ] section
                                  .split(',')
                                  .map((ingredient, idx) => {
                                    const trimmed = ingredient
                                      .replace(/May Contain:/i, '')
                                      .trim()
                                      .replace(/\.$/, ''); // Remove trailing period
                                    if (!trimmed) return null;
                                    return (
                                      <div key={idx} className="flex items-start gap-2 mb-1 pl-2">
                                        <span className="bg-gray-200 rounded-full h-1.5 w-1.5 mt-2"></span>
                                        <span>{trimmed}</span>
                                      </div>
                                    );
                                  })}
                              </div>
                            </>
                          ) : (
                            // Simple comma-separated list without May Contain section
                            product.description
                              .split(',')
                              .map((ingredient, idx) => {
                                const trimmed = ingredient.trim().replace(/\.$/, ''); // Remove trailing period
                                if (!trimmed) return null;
                                return (
                                  <div key={idx} className="flex items-start gap-2 mb-1">
                                    <span className="bg-gray-200 rounded-full h-1.5 w-1.5 mt-2"></span>
                                    <span>{trimmed}</span>
                                  </div>
                                );
                              })
                          )}
                        </div>
                      </div>
                    ) : (
                      /* Fall back to period-separated description */
                      product.description.split('. ')
                        .filter(item => item.length > 0)
                        .map((feature, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <span className="bg-gray-200 rounded-full h-1.5 w-1.5"></span>
                            <span>{feature}</span>
                          </li>
                        ))
                    )
                  )
                )
              )}
            </ul>
          </div>
          
          {/* Only show size selection if product has sizes */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Select Size</h3>
              <div className="flex gap-2">
                {product.sizes.map((size) => (
                  <button key={size} className="border border-gray-300 px-4 py-2 rounded hover:border-black">
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Only show color selection if product has colors */}
          {product.colors && product.colors.length > 0 && (
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Select Color</h3>
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    className="w-8 h-8 rounded-full border border-gray-300"
                    style={{ backgroundColor: color }}
                    aria-label={`Select ${color} color`}
                  />
                ))}
              </div>
            </div>
          )}
          
          <div className="mt-6">
            <div className="flex gap-4">
              <Button size="lg" variant="outline">
                Buy Now
              </Button>
              <Button size="lg">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-8">Related Products</h2>
        <RelatedProducts categoryId={product.categoryId} currentProductId={product.id} />
      </div>
    </div>
  )
}
