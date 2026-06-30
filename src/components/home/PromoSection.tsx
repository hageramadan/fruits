// components/PromoSection.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaArrowLeft } from "react-icons/fa";

interface PromoSectionProps {
  title?: string;
  subtitle?: string;
  discount?: string;
  buttonText?: string;
  buttonLink?: string;
  endDate?: Date;
}

export function PromoSection({
  title = "30% كاش باك علي منتجات اللحوم",
  subtitle = "لفترة محدودة… سارع بالاستفادة قبل انتهاء العرض ⏳",
  discount = "30%",
  buttonText = "احصل علي العرض",
  buttonLink = "/offers",
  endDate
}: PromoSectionProps) {
  // حساب تاريخ الانتهاء داخل useState لتجنب استدعاء Date.now() أثناء الرندر
  const [targetDate] = useState(() => {
    if (endDate) return endDate;
    // تاريخ انتهاء بعد 3 أيام من الآن
    const date = new Date();
    date.setDate(date.getDate() + 3);
    date.setHours(23, 59, 59, 0);
    return date;
  });

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate.getTime() - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  // تنسيق الأرقام لإظهار منزلتين
  const formatNumber = (num: number) => {
    return num.toString().padStart(2, '0');
  };

  return (
    <section className="relative w-full overflow-hidden rounded-3xl my-4 lg:my-8">
      {/* الخلفية - gradient بدلاً من الصورة */}
      <div className="relative w-full   bg-[#EAFAF1]">
        
       
      
        
        {/* المحتوى */}
        <div className="flex flex-wrap  justify-around items-center px-4 sm:px-6 h-[230px]  lg:h-[250px]">
        

          {/* نسبة الخصم */}
         <div>
             <div className="mb-2">
           
            <span className="text-[#006D37] text-xl ">
             {discount} كاش باك علي منتجات اللحوم 
            </span>
          </div>

          {/* الوصف */}
          <p className="text-[#191C1F] text-sm sm:text-base md:text-lg mb-4 sm:mb-6 max-w-2xl">
            {subtitle}
          </p>
         </div>

        <div className="flex items-center gap-2 flex-wrap">
             {/* العداد */}
          <div className="flex items-center gap-1 lg:gap-2">
            {/* الأيام */}
            <div className="flex flex-col items-center">
              <div className="bg-[#006D37] rounded-[8px] px-3 py-2 sm:px-4 sm:py-3 min-w-[20px] sm:min-w-[50px] border border-white/10">
                <span className="text-2xl  font-bold text-white ">
                  {formatNumber(timeLeft.days)}
                </span>
              </div>
              {/* <span className="text-white/70 text-[10px] sm:text-xs mt-1">يوم</span> */}
            </div>

            <span className="text-[#006D37] text-2xl  font-bold">:</span>

            {/* الساعات */}
            <div className="flex flex-col items-center">
              <div className="bg-[#006D37] rounded-[8px] px-3 py-2 sm:px-4 sm:py-3 min-w-[20px] sm:min-w-[50px] border border-white/10">
                <span className="text-2xl   font-bold text-white bg-[#006D37]">
                  {formatNumber(timeLeft.hours)}
                </span>
              </div>
              {/* <span className="text-white/70 text-[10px] sm:text-xs mt-1">ساعة</span> */}
            </div>

            <span className="text-[#006D37] text-xl sm:text-2xl font-bold">:</span>

            {/* الدقائق */}
            <div className="flex flex-col items-center">
              <div className="bg-[#006D37] rounded-[8px] px-3 py-2 sm:px-4 sm:py-3 min-w-[20px] sm:min-w-[50px] border border-white/10">
                <span className="text-2xl  font-bold text-white bg-[#006D37]">
                  {formatNumber(timeLeft.minutes)}
                </span>
              </div>
              {/* <span className="text-white/70 text-[10px] sm:text-xs mt-1">دقيقة</span> */}
            </div>

            <span className="text-[#006D37] text-xl sm:text-2xl font-bold">:</span>

            {/* الثواني */}
            <div className="flex flex-col items-center">
              <div className="bg-[#006D37] rounded-[8px] px-3 py-2 sm:px-4 sm:py-3 min-w-[30px] sm:min-w-[50px] border border-white/10">
                <span className="text-2xl font-bold text-white bg-[#006D37]">
                  {formatNumber(timeLeft.seconds)}
                </span>
              </div>
              {/* <span className="text-white/70 text-[10px] sm:text-xs mt-1">ثانية</span> */}
            </div>
          </div>

          {/* زر العرض */}
          <Button
            asChild
            className="text-white text-[14px] sm:text-[16px] font-bold rounded-xl hover:scale-105 transition-transform duration-300"
            style={{
              backgroundColor: "#F79201",
              width: "150px",
              height: "50px",
            }}
          >
            <Link href={buttonLink} className="flex items-center justify-center gap-2">
              {buttonText}
            
            </Link>
          </Button>
        </div>
        </div>
      </div>
    </section>
  );
}