// components/ProductSection.tsx
"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { ProductCard } from "../products/ProductCard";
import { Button } from "../ui/button";

interface ProductCardType {
  id: string;
  name: string;
  price: number;
  image: string;
  href: string;
  originalPrice?: number;
  discount?: number;
}

interface ProductSectionProps {
  title: string;
  viewAllLink?: string;
  viewAllText?: string;
  products?: ProductCardType[];
  columns?: 2 | 3 | 4;
  showLoadMore?: boolean;
  maxProducts?: number;
}

// بيانات ثابتة للمنتجات
const STATIC_PRODUCTS: ProductCardType[] = [
  {
    id: "1",
    name: "منتج 1",
    price: 100,
    image: "/images/products/p1.png",
    href: "/products/1",
    originalPrice: 150,
    discount: 33
  },
  {
    id: "2",
    name: "منتج 2",
    price: 200,
    image: "/images/products/p2.png",
    href: "/products/2",
    originalPrice: 250,
    discount: 20
  },
  {
    id: "3",
    name: "منتج 3",
    price: 150,
    image: "/images/products/p3.png",
    href: "/products/3"
  },
  {
    id: "4",
    name: "منتج 4",
    price: 300,
    image: "/images/products/p4.png",
    href: "/products/4",
    originalPrice: 400,
    discount: 25
  },
  {
    id: "5",
    name: "منتج 5",
    price: 80,
    image: "/images/products/p5.png",
    href: "/products/5"
  },
  {
    id: "6",
    name: "منتج 6",
    price: 120,
    image: "/images/products/p6.png",
    href: "/products/6",
    originalPrice: 160,
    discount: 25
  },
  {
    id: "7",
    name: "منتج 7",
    price: 250,
    image: "/images/products/p7.png",
    href: "/products/7"
  },
  {
    id: "8",
    name: "منتج 8",
    price: 90,
    image: "/images/products/p8.png",
    href: "/products/8",
    originalPrice: 120,
    discount: 25
  }
];

export function ProductSection({
  title,
  viewAllLink = "/products",
  viewAllText = "عرض المزيد",
  products = STATIC_PRODUCTS,
  columns = 4,
  showLoadMore = false,
  maxProducts = 8
}: ProductSectionProps) {
  // عرض عدد محدد من المنتجات
  const visibleProducts = products.slice(0, maxProducts);
  
  // تحديد عدد الأعمدة
  const gridCols = {
    2: "grid-cols-2",
    3: "grid-cols-2 md:grid-cols-3",
    4: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
  };

  // إذا لم توجد منتجات
  if (products.length === 0) {
    return (
      <section className="py-3 md:py-10 bg-white">
        <div className="container-custom">
          <div className="mb-2 md:mb-5 flex justify-between mx-2 md:mx-4">
            <h2 className="text-xl md:text-2xl font-bold mb-3" style={{ color: '#112B40' }}>
              {title}
            </h2>
          </div>
          <div className="flex justify-center items-center min-h-[300px]">
            <div className="text-center">
              <p className="text-gray-500 text-lg">لا توجد منتجات حالياً</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-3 md:py-10 bg-white">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-2 md:mb-5 flex justify-between items-center mx-2 md:mx-4">
          <h2 className="text-xl md:text-2xl font-bold" style={{ color: '#112B40' }}>
            {title}
          </h2>
          {viewAllLink && (
            <Link 
              href={viewAllLink} 
              className="text-[#2ECC71] text-[14px] font-bold hover:underline transition-all"
            >
              {viewAllText}
            </Link>
          )}
        </div>

        {/* Products Grid - إزالة justify-items-center */}
        <div className={`grid ${gridCols[columns]} gap-3 md:gap-6 mb-2 md:mb-5`}>
          {visibleProducts.map((product, index) => (
            <div
              key={product.id}
              className="w-full animate-in fade-in zoom-in duration-500"
              style={{
                animationFillMode: 'both',
                animationDelay: `${index * 100}ms`
              }}
            >
              <ProductCard {...product} />
            </div>
          ))}
        </div>

        {/* Load More Button (اختياري) */}
        {showLoadMore && products.length > maxProducts && (
          <div className="text-center mt-8">
            <Button
              className="group px-8 py-6 text-base font-semibold transition-all duration-300 hover:scale-105"
              style={{
                backgroundColor: 'white',
                color: '#1A834B',
                border: '2px solid #1A834B',
                borderRadius: '12px'
              }}
            >
              عرض المزيد
              <ChevronLeft className="mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </section>
  );
}