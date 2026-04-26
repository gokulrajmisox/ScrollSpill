import { cx } from "@/src/utils";
import Link from "next/link";
import React from "react";

const Tag = ({ link = "#", name, ...props }) => {
  return (
    <Link
      href={link}
      className={cx(
        "inline-block py-2 sm:py-3 px-6 sm:px-10 bg-gradient-to-r from-[var(--gradient-1)] to-[var(--gradient-2)] text-white rounded-full capitalize font-bold hover:scale-110 transition-all ease duration-300 text-sm sm:text-base shadow-md hover:shadow-lg",
        props.className
      )}
    >
      {name}
    </Link>
  );
};

export default Tag;
