import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const BlogLayoutTwo = ({ blog }) => {
  return (
    <div className="group grid grid-cols-12 gap-4 items-center text-dark dark:text-light p-2 rounded-2xl hover:bg-accent/5 dark:hover:bg-accent/10 transition-colors duration-300">
      <Link
        href={blog.url}
        className=" col-span-12  lg:col-span-4 h-full rounded-xl overflow-hidden shadow-md"
      >
        <Image
          src={blog.image.src}
          placeholder="blur"
          blurDataURL={blog.image.blurDataURL}
          alt={blog.title}
          width={blog.image.width}
          height={blog.image.height}
          className="aspect-square w-full h-full object-cover object-center group-hover:scale-110 transition-all ease duration-500"
          sizes="(max-width: 640px) 100vw,(max-width: 1024px) 50vw, 33vw"
        />
      </Link>

      <div className="col-span-12  lg:col-span-8 w-full">
        <span className="inline-block w-full uppercase text-gradient font-bold text-xs sm:text-sm">
          {blog.tags[0]}
        </span>
        <Link href={blog.url} className="inline-block my-1">
          <h2 className="font-bold capitalize text-lg sm:text-xl leading-snug">
            <span
              className="bg-gradient-to-r from-[var(--gradient-1)] to-[var(--gradient-2)] bg-[length:0px_4px]
                group-hover:bg-[length:100%_4px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 "
            >
              {blog.title}
            </span>
          </h2>
        </Link>

        {blog.summary && (
          <p className="hidden sm:inline-block mt-2 mb-2 text-sm font-medium text-dark/70 dark:text-light/70 line-clamp-2">
            {blog.summary}
          </p>
        )}

        <span className="inline-block w-full capitalize text-gray dark:text-light/60 font-medium text-xs sm:text-base mt-2">
          {format(new Date(blog.publishedAt), "MMMM dd, yyyy")}
        </span>
      </div>
    </div>
  );
};

export default BlogLayoutTwo;
