// import { AdsHome } from "@/components/home/AdsHome";
// import { CategoriesDragDrop } from "@/components/home/CategoriesDragDrop";
import { Hero } from "@/components/home/HeroCover";
import { PromoSection } from "@/components/home/PromoSection";
// import { LatestProducts } from "@/components/home/LatestProducts";
import { Footer } from "@/components/layout/Footer";
import { ProductSection } from "@/components/products/ProductSection";



export default function Home() {
  return (
   <div>
    <Hero />
    <ProductSection title="الاكثر طلبا" />
    <PromoSection/>
    <ProductSection title="أحدث المنتجات" />
    <ProductSection title="الخضروات" />
    {/* <CategoriesDragDrop/> */}
   {/* <LatestProducts /> */}
   {/* <AdsHome/> */}
   {/* <LatestProducts/> */}
   <Footer />
   </div>
  );
}
