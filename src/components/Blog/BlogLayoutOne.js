import React from "react";
import Tag from "../Elements/Tag";
import Link from "next/link";
import Image from "next/image";
import { slug } from "github-slugger";

const BlogLayoutOne = ({ blog }) => {
  return (
    <div className="group inline-block overflow-hidden rounded-xl hover-lift shadow-lg hover:shadow-accent/20 transition-all duration-300">
      <div
        className="absolute top-0 left-0 bottom-0 right-0 h-full
            bg-gradient-to-b from-transparent from-20% to-dark/95 rounded-xl z-10
            "
      />
      <Image
        src={blog.image.src}
        placeholder="blur"
        blurDataURL={blog.image.blurDataURL}
        alt={blog.title}
        width={blog.image.width}
        height={blog.image.height}
        className="w-full h-full object-center object-cover rounded-xl group-hover:scale-110 transition-all ease duration-500"
        sizes="(max-width: 1180px) 100vw, 50vw"
      />

      <div className="w-full absolute bottom-0 p-4 xs:p-6 sm:p-10 z-20 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
        <Tag link={`/categories/${slug(blog.tags[0])}`} name={blog.tags[0]}
        className="px-6 text-xs sm:text-sm py-1 sm:py-2 !border !bg-accent/80 backdrop-blur-sm shadow-xl"
        />
        <Link href={blog.url} className="mt-6">
          <h2 className="font-bold capitalize text-sm xs:text-base sm:text-xl md:text-2xl text-light mt-2 sm:mt-4 leading-tight">
            <span
              className="bg-gradient-to-r from-[var(--gradient-1)] to-[var(--gradient-3)] bg-[length:0px_4px] 
                group-hover:bg-[length:100%_4px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 "
            >
              {blog.title}
            </span>
          </h2>
        </Link>
        {blog.summary && (
          <p className="hidden sm:inline-block mt-3 text-sm font-medium text-light/70 line-clamp-2 w-3/4">
            {blog.summary}
          </p>
        )}
      </div>
    </div>
  );
};

export default BlogLayoutOne;
