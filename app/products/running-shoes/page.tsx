import ProductCard from "@/components/product-card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nike Mercurial Vapor 16 Elite By You",
  description: "Lightweight running shoes with responsive cushioning",
};

export default function RunningShoeProductPage() {
  const product = {
    id: "running-shoes-1",
    name: "Nike Mercurial Vapor 16 Elite By You",
    description: "Lightweight running shoes with responsive cushioning.",
    price: 24500.00,
    originalPrice: 24895.00,
    discount: 15,
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Running Shoes</h1>
      
      <div className="max-w-md mx-auto">
        <ProductCard 
          id={product.id}
          name={product.name}
          description={product.description}
          price={product.price}
          originalPrice={product.originalPrice}
          discount={product.discount}
        />
      </div>
      
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Product Details</h2>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <p className="mb-4">
            Experience superior comfort and performance with our lightweight running shoes. 
            These shoes feature responsive cushioning technology that adapts to your stride, 
            providing excellent energy return with every step.
          </p>
          
          <h3 className="font-bold text-lg mt-6 mb-2">Features:</h3>
          <ul className="list-disc ml-6 space-y-2">
            <li>Breathable mesh upper for enhanced airflow</li>
            <li>Responsive cushioning for energy return</li>
            <li>Durable rubber outsole for traction on various surfaces</li>
            <li>Supportive midfoot design reduces fatigue during long runs</li>
            <li>Available in multiple sizes and colors</li>
          </ul>
          
          <h3 className="font-bold text-lg mt-6 mb-2">Specifications:</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-medium">Weight:</p>
              <p className="text-gray-600">250g (Men's size 9)</p>
            </div>
            <div>
              <p className="font-medium">Material:</p>
              <p className="text-gray-600">Synthetic mesh, rubber</p>
            </div>
            <div>
              <p className="font-medium">Closure:</p>
              <p className="text-gray-600">Lace-up</p>
            </div>
            <div>
              <p className="font-medium">Warranty:</p>
              <p className="text-gray-600">1 year</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 