// components/products/ProductCard.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  href: string;
  originalPrice?: number;
  discount?: number;
}

export function ProductCard({ 
  id, 
  name, 
  price, 
  image, 
  href,
  originalPrice, 
  discount 
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Added to cart:", id);
  };

  return (
    <div
      role="article"
      aria-labelledby={`product-name-${id}`}
      className="group relative w-full max-w-full sm:max-w-[200px] md:max-w-[240px] lg:max-w-[280px] xl:max-w-[308px] mx-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <style jsx>{`
        .product-card {
          width: 100%;
          aspect-ratio: 172/240;
          border-radius: 16px;
          border: 1px solid #E4E7E9;
          overflow: hidden;
          background: white;
          position: relative;
          isolation: isolate;
          transition: box-shadow 0.3s ease;
        }
        
        .product-card:hover {
          box-shadow: 0 20px 25px -12px rgba(0, 0, 0, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
        }
        
        .product-image {
          aspect-ratio: 172/155;
          width: 100%;
          border-radius: 16px 16px 0 0;
          position: relative;
          overflow: hidden;
          background: #f3f4f6;
        }
        
        @media (max-width: 480px) {
          .product-card {
            aspect-ratio: 160/220;
            border-radius: 12px;
          }
          .product-image {
            aspect-ratio: 160/140;
          }
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .spinner {
          animation: spin 0.8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
      `}</style>

      <div className="product-card relative">
        {/* Heart Icon */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-1 left-1 sm:top-2 sm:left-2 z-30 rounded-full p-1 sm:p-1.5 hover:bg-red-50 transition-all duration-200 hover:scale-110 bg-white/80 backdrop-blur-sm"
          style={{ color: isFavorite ? '#ef4444' : '#112B40' }}
          aria-label={isFavorite ? "إزالة من المفضلة" : "إضافة إلى المفضلة"}
          aria-pressed={isFavorite}
        >
          <Heart className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5" fill={isFavorite ? '#ef4444' : 'none'} />
        </button>

        <Link href={href} className="h-full flex flex-col" aria-label={`عرض تفاصيل ${name}`}>
          {/* Image Container */}
          <div className="product-image bg-gray-100">
            {/* Loading Spinner */}
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center z-10 bg-gray-100">
                <div className="spinner w-6 h-6 sm:w-8 sm:h-8 border-3 sm:border-4 border-[#1A834B] border-t-transparent rounded-full"></div>
              </div>
            )}
            
            {/* Best Seller Badge */}
            <div className="absolute top-1 right-1 sm:top-2 sm:right-2 z-20">
              <p className="text-[7px] sm:text-[8px] md:text-[10px] font-bold text-white bg-[#2ECC71] px-1 py-0.5 sm:px-1.5 sm:py-0.5 md:px-2 md:py-1 rounded shadow-sm">
                الاكثر طلبا
              </p>
            </div>

            {/* Add to Cart Button - Overlay on Image */}
            <div 
              className="absolute inset-0 z-20 flex items-end pb-2 sm:pb-4 justify-center transition-all duration-300"
              style={{
                background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)',
                opacity: isHovered ? 1 : 0,
                visibility: isHovered ? 'visible' : 'hidden',
              }}
            >
              <Button
                onClick={handleAddToCart}
                className="text-[10px] sm:text-[11px] md:text-[13px] font-semibold rounded-lg bg-[#1A834B] hover:bg-[#1A834B]/90 transition-all duration-300 text-white py-1 px-2.5 sm:py-1.5 sm:px-3 md:py-2 md:px-4 flex items-center justify-center gap-1 sm:gap-1.5 md:gap-2 transform hover:scale-105 active:scale-95 shadow-lg"
                style={{
                  transform: isHovered ? 'scale(1)' : 'scale(0.9)',
                  transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
              >
                <ShoppingCart className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 md:w-4 transition-transform duration-300 group-hover:rotate-12" />
                <span className="text-[9px] sm:text-[10px] md:text-sm whitespace-nowrap">اضف الي السلة</span>
              </Button>
            </div>

            {/* Image */}
            <div className="relative w-full h-full">
              <Image
                src={image}
                alt={name}
                fill
                sizes="(max-width: 480px) 100vw, (max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 280px"
                className="object-cover transition-all duration-700 ease-out"
                style={{
                  transform: isHovered ? 'scale(1.08)' : 'scale(1)',
                }}
                onLoad={() => setImageLoaded(true)}
              />
            </div>
          </div>

          {/* Product Info - مساحة أقل */}
          <div className="px-2 sm:px-2.5 md:px-3 py-1.5 sm:py-2 flex flex-col bg-white flex-1">
            {/* Rating */}
            <div className="flex items-center gap-0.5 sm:gap-1 mb-0.5 flex-wrap">
              <div className="flex gap-0.5">
                <FaStar className="text-[#FFCC00] w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5" />
                <FaStar className="text-[#FFCC00] w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5" />
                <FaStar className="text-[#FFCC00] w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5" />
                <FaStar className="text-[#FFCC00] w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5" />
                <FaRegStar className="text-[#77878F] w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5" />
              </div>
              <p className="text-[#77878F] text-[9px] sm:text-[10px] md:text-xs">
                (994)
              </p>
            </div>
            
            {/* Product Name - سطر واحد فقط */}
            <h3 
              id={`product-name-${id}`}
              className="text-[11px] sm:text-[12px] md:text-[13px] font-medium truncate text-[#112B40]"
            >
              {name}
            </h3>

            {/* Price */}
            <div className="flex items-center gap-1 sm:gap-2 mt-0.5">
              <span className="text-xs sm:text-sm md:text-base font-bold text-[#2ECC71]">
                {price.toLocaleString()} $
              </span>
              {originalPrice && (
                <span className="text-[9px] sm:text-[10px] md:text-xs text-[#77878F] line-through">
                  {originalPrice.toLocaleString()} $
                </span>
              )}
              {discount && (
                <span className="text-[8px] sm:text-[9px] md:text-xs font-bold text-red-500 bg-red-50 px-1 py-0.5 rounded">
                  -{discount}%
                </span>
              )}
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}