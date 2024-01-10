import { blogs } from "@/constants/blogData";
import { Button } from "../ui/button";
import Image from "next/image";

export default function BlogCards() {
  return (
    <>
      {blogs.map((blog) => (
        <div
          key={blog.id}
          className="w-full flex flex-col md:flex-row justify-between gap-4 my-8"
        >
          {/* TEXT */}
          <div className="flex-1">
            <div className="w-full h-full flex flex-col justify-between">
              <h2 className="text-xl font-bold text-secondary">{blog.title}</h2>
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
            <Image src={blog.image} alt="Image" fill objectFit="cover" />
          </div>
        </div>
      ))}
    </>
  );
}
