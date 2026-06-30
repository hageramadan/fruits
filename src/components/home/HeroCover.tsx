// components/Hero.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaArrowLeft } from "react-icons/fa";

export function Hero() {
  return (
    <section className="relative min-h-[50vh] sm:min-h-[60vh] md:min-h-[70vh] lg:min-h-[80vh] overflow-hidden container  mt-0 lg:mt-8 rounded-none lg:rounded-3xl">
      {/* الصورة الخلفية */}
      <div className="absolute inset-0 w-full h-full ">
        <Image
          src="/images/hero/slider1.png"
          alt="خلفية الصفحة الرئيسية"
          fill
          className="object-cover"
          priority
          quality={90}
          sizes="100vw"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src =
              "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=600&fit=crop";
          }}
        />
      </div>

      {/* طبقة سوداء شفافة */}
      <div className="absolute inset-0 bg-black/60 z-10 " />

      {/* المحتوى المركزي */}
      <div className="relative z-20 flex items-center w-full h-full min-h-[50vh] sm:min-h-[60vh] md:min-h-[70vh] lg:min-h-[80vh] px-4 sm:px-6">
        <div className="max-w-[90%] sm:max-w-[80%] md:max-w-[70%] lg:max-w-[60%]">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3 md:mb-4 text-white drop-shadow-lg">
            استمتع بأفضل النكهات كل احتياجاتك … في مكان واحد
          </h1>
          <p className="text-white/95 w-full sm:w-[85%] md:w-[80%] text-sm sm:text-base md:text-lg lg:text-xl mb-4 sm:mb-6 md:mb-8 leading-relaxed drop-shadow-md">
            استمتع بأفضل النكهات مع منتجات عضوية 100% ومصدرها مزارع محلية
            طازجة. احصل على خصم 20% على أول طلب لك اليوم.
          </p>
          
          {/* أزرار - هنا يمكنك اختيار إما زر واحد أو زرين */}
          <div className="flex  gap-4">
            {/* الزر الأول - تسوق الآن */}
            <Button
              asChild
              className="text-white text-[14px] sm:text-[16px] font-bold rounded-xl hover:scale-105 transition-transform duration-300"
              style={{
                backgroundColor: "#1A834B",
                width: "150px",
                height: "45px",
              }}
            >
              <Link
                href="/products"
                className="flex items-center justify-center gap-2"
              >
                تسوق الآن
            
              </Link>
            </Button>

            {/* الزر الثاني - اكتشف المزيد (اختياري) */}
            <Button
            
              className="text-white border-0 backdrop-blur-md bg-white/30  text-[14px] sm:text-[16px] font-bold rounded-xl hover:scale-105 transition-transform duration-300"
              style={{
                width: "150px",
                height: "45px",
              }}
            >
              <Link
                href="/about"
                className="flex items-center justify-center gap-2  "
              >
                 المزيد
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}