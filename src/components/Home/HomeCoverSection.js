import { sortBlogs } from '@/src/utils'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import Tag from '../Elements/Tag';
import { slug } from 'github-slugger';

const HomeCoverSection = ({blogs}) => {

    const sortedBlogs = sortBlogs(blogs);
    const blog = sortedBlogs[0];

  return (
    <div className='w-full inline-block'>
        <article className='flex flex-col items-start justify-end mx-5 sm:mx-10 relative h-[60vh] sm:h-[85vh]'>
            <div className='absolute top-0 left-0 bottom-0 right-0 h-full
            bg-gradient-to-b from-transparent from-0% to-dark/90 rounded-3xl z-0
            ' />
        <Image src={blog.image.src}
        placeholder='blur'
        blurDataURL={blog.image.blurDataURL}
        alt={blog.title}
        fill
        className='w-full h-full object-center object-cover rounded-3xl -z-10'
        sizes='100vw'
        priority
        />

        <div className='w-full lg:w-3/4 p-6 sm:p-8 md:p-12 lg:p-16 flex flex-col items-start justify-center z-0 text-light animate-slide-up'>
            <div className="animate-float">
                <Tag link={`/categories/${slug(blog.tags[0])}`} name={blog.tags[0]} className="!bg-accent !text-light shadow-lg" />
            </div>
            <Link href={blog.url} className='mt-6 group'>
                <h1 className='font-bold capitalize text-2xl sm:text-3xl md:text-5xl lg:text-6xl'>
                    <span className='bg-gradient-to-r from-[var(--gradient-1)] via-[var(--gradient-2)] to-[var(--gradient-3)] bg-[length:0px_4px] group-hover:bg-[length:100%_4px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500'>
                        {blog.title}
                    </span>
                </h1>
            </Link>
            <p className='hidden sm:inline-block mt-6 md:text-xl lg:text-2xl font-light text-light/80 leading-relaxed'>
                {blog.description}
            </p>
            <Link href={blog.url} className="mt-8 px-8 py-3 bg-white text-dark rounded-full font-bold hover:bg-accent hover:text-white transition-all duration-300 transform hover:scale-105 shadow-xl">
                Read Article
            </Link>
        </div>
    </article>
    </div>
  )
}

export default HomeCoverSection