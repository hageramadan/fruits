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
  const [targetDate] = useState(() => {
    if (endDate) return endDate;
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

  const formatNumber = (num: number) => {
    return num.toString().padStart(2, '0');
  };

  return (
    <section className="relative w-full overflow-hidden rounded-3xl my-2 lg:my-8 px-2">
      {/* الخلفية */}
      <div className="relative w-full bg-[#EAFAF1] rounded-3xl">
        {/* المحتوى */}
        <div className="flex flex-col sm:flex-row flex-wrap justify-center sm:justify-around items-center px-3 sm:px-6 py-4 sm:py-6 min-h-[200px] sm:h-[230px] lg:h-[250px] gap-3 sm:gap-0">
          
          {/* النص والعنوان */}
          <div className="text-center sm:text-right w-full sm:w-auto">
            <div className="mb-1 sm:mb-2">
              <span className="text-[#006D37] text-base sm:text-xl font-bold">
                {discount} كاش باك علي منتجات اللحوم
              </span>
            </div>
            <p className="text-[#191C1F] text-xs sm:text-sm md:text-base mb-2 sm:mb-4 max-w-2xl">
              {subtitle}
            </p>
          </div>

          {/* العداد والزر */}
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 w-full sm:w-auto">
            {/* العداد */}
            <div className="flex items-center gap-1">
              {/* الأيام */}
              <div className="flex flex-col items-center">
                <div className="bg-[#006D37] rounded-[6px] sm:rounded-[8px] px-2 sm:px-4 py-1.5 sm:py-3 min-w-[28px] sm:min-w-[50px]">
                  <span className="text-lg sm:text-2xl font-bold text-white">
                    {formatNumber(timeLeft.days)}
                  </span>
                </div>
              </div>

              <span className="text-[#006D37] text-lg sm:text-2xl font-bold">:</span>

              {/* الساعات */}
              <div className="flex flex-col items-center">
                <div className="bg-[#006D37] rounded-[6px] sm:rounded-[8px] px-2 sm:px-4 py-1.5 sm:py-3 min-w-[28px] sm:min-w-[50px]">
                  <span className="text-lg sm:text-2xl font-bold text-white">
                    {formatNumber(timeLeft.hours)}
                  </span>
                </div>
              </div>

              <span className="text-[#006D37] text-lg sm:text-2xl font-bold">:</span>

              {/* الدقائق */}
              <div className="flex flex-col items-center">
                <div className="bg-[#006D37] rounded-[6px] sm:rounded-[8px] px-2 sm:px-4 py-1.5 sm:py-3 min-w-[28px] sm:min-w-[50px]">
                  <span className="text-lg sm:text-2xl font-bold text-white">
                    {formatNumber(timeLeft.minutes)}
                  </span>
                </div>
              </div>

              <span className="text-[#006D37] text-lg sm:text-2xl font-bold">:</span>

              {/* الثواني */}
              <div className="flex flex-col items-center">
                <div className="bg-[#006D37] rounded-[6px] sm:rounded-[8px] px-2 sm:px-4 py-1.5 sm:py-3 min-w-[28px] sm:min-w-[50px]">
                  <span className="text-lg sm:text-2xl font-bold text-white">
                    {formatNumber(timeLeft.seconds)}
                  </span>
                </div>
              </div>
            </div>

            {/* زر العرض - تم تعديله باستخدام className فقط */}
            <Button
              asChild
              className="text-white text-[12px] sm:text-[16px] font-bold rounded-xl hover:scale-105 transition-transform duration-300 w-full sm:w-[150px] h-10 sm:h-[50px]"
              style={{
                backgroundColor: "#F79201",
              }}
            >
              <Link href={buttonLink} className="flex items-center justify-center gap-2 px-4">
                {buttonText}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}