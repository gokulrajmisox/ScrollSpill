import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const BlogLayoutThree = ({ blog }) => {
  return (
    <div className="group flex flex-col items-center text-dark dark:text-light hover-lift">
      <Link href={blog.url} className="h-full rounded-2xl overflow-hidden shadow-lg w-full">
        <Image
          src={blog.image.src}
          placeholder="blur"
          blurDataURL={blog.image.blurDataURL}
          alt={blog.title}
          width={blog.image.width}
          height={blog.image.height}
          className=" aspect-[4/3] w-full h-full object-cover object-center group-hover:scale-110 transition-all ease duration-500 "
          sizes="(max-width: 640px) 100vw,(max-width: 1024px) 50vw, 33vw"
        />
      </Link>

      <div className="flex flex-col w-full mt-6">
        <span className="uppercase text-gradient font-bold text-xs sm:text-sm">
          {blog.tags[0]}
        </span>
        <Link href={blog.url} className="inline-block my-2">
          <h2 className="font-bold capitalize text-xl leading-tight">
            <span
              className="bg-gradient-to-r from-[var(--gradient-1)] via-[var(--gradient-2)] to-[var(--gradient-3)]
              bg-[length:0px_4px]
              group-hover:bg-[length:100%_4px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 "
            >
              {blog.title}
            </span>
          </h2>
        </Link>

        {blog.summary && (
          <p className="hidden sm:inline-block mt-2 mb-3 text-sm font-medium text-dark/70 dark:text-light/70">
            {blog.summary}
          </p>
        )}

        <span className="capitalize text-gray dark:text-light/60 font-medium text-sm sm:text-base">
          {format(new Date(blog.publishedAt), "MMMM dd, yyyy")}
        </span>
      </div>
    </div>
  );
};

export default BlogLayoutThree;
