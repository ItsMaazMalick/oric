import BlogCards from "@/components/blogs/BlogCards";
import Footer from "@/components/footer/Footer";
import MainHeader from "@/components/header/MainHeader";
import SocialCards from "@/components/socialCards/SocialCards";
import Image from "next/image";

export default function Home() {
  return (
    <>
      {/* RIGHT DIV */}
      <div className="w-10 fixed top-52 right-5 space-y-4 z-50">
        <SocialCards />
      </div>
      <MainHeader />
      {/* MAIN CONTENT */}
      <div className="w-full mt-2 px-2 lg:px-36">
        <div className="relative w-full h-80">
          <Image
            src={"/images/blog/main-image.jpg"}
            alt="ORIC"
            fill
            className="object-cover"
          />
          <div className="absolute bottom-1 left-1">
            <p className="text-2xl font-bold text-white p-2 bg-primary rounded-lg">
              Prize distribution ceremony for Entrepreneurial Activities
              (September 13, 2023)
            </p>
          </div>
        </div>
      </div>
      <div className="w-full my-8 lg:px-36 flex justify-center items-center gap-4 text-2xl font-bold text-secondary">
        <span>*</span>
        <span>*</span>
        <span>*</span>
        <span>*</span>
        <span>*</span>
      </div>
      {/* BLOG */}
      <div className="mt-8 w-full px-2 lg:px-36">
        <BlogCards />
      </div>
      <Footer />
    </>
  );
}
