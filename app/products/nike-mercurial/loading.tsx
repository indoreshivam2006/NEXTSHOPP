import { Skeleton } from "@/components/ui/skeleton";

export default function ProductLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Product image skeleton */}
        <Skeleton className="aspect-square rounded-lg" />

        {/* Product details skeleton */}
        <div className="space-y-6">
          <Skeleton className="h-9 w-3/4" />
          <Skeleton className="h-8 w-1/2" />
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-5 w-5 rounded-full" />
            ))}
            <Skeleton className="h-5 w-24 ml-2" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-7 w-36" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-3/4" />
          </div>
          <div className="space-y-3">
            <Skeleton className="h-7 w-36" />
            <div className="flex flex-wrap gap-2">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-10 w-16 rounded-md" />
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <Skeleton className="h-7 w-36" />
            <div className="flex gap-3">
              <Skeleton className="h-12 w-12 rounded-full" />
              <Skeleton className="h-12 w-12 rounded-full" />
            </div>
          </div>
          <Skeleton className="h-12 w-full rounded-md" />
        </div>
      </div>

      {/* Product description skeleton */}
      <div className="max-w-3xl mx-auto py-12">
        <Skeleton className="h-8 w-64 mb-6" />
        <Skeleton className="h-20 w-full mb-4" />
        <Skeleton className="h-20 w-full mb-4" />
        <Skeleton className="h-20 w-full" />
      </div>
    </div>
  );
} 