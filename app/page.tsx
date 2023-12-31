import Footer from "@/components/footer/Footer";
import MainHeader from "@/components/header/MainHeader";
import { Button } from "@/components/ui/button";
import { blogs } from "@/constants/blogData";
import { socialLinks } from "@/constants/socialLinks";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* RIGHT DIV */}
      <div className="w-10 fixed top-52 right-5 space-y-4 z-50">
        {socialLinks.map((social) => (
          <Link
            key={social.id}
            href={social.url}
            target="_blank"
            className="w-full flex justify-center items-center rounded-lg  hover:scale-125 transition-all duration-300"
          >
            <span className="text-2xl">
              <Image
                src={social.image}
                alt={social.alt}
                width={50}
                height={50}
              />
            </span>
          </Link>
        ))}
      </div>
      <MainHeader />
      {/* MAIN CONTENT */}
      <div className="w-full mt-2 px-2 lg:px-36">
        <div className="relative w-full h-80">
          <Image src={"/images/blog/main-image.jpg"} alt="ORIC" fill />
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
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="w-full flex flex-col md:flex-row justify-between gap-4 my-8"
          >
            {/* TEXT */}
            <div className="flex-1">
              <div className="w-full h-full flex flex-col justify-between">
                <h2 className="text-xl font-bold text-secondary">
                  {blog.title}
                </h2>
                <p>
                  {blog.description.length > 400
                    ? blog.description.slice(0, 400) + "..."
                    : blog.description}
                </p>
                <Button className="w-28">Read More</Button>
              </div>
            </div>
            {/* IMAGE */}
            <div className="relative w-96 h-60">
              <Image src={blog.image} alt="Image" fill />
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
}
