import React from "react";
import Link from "next/link";

import Rating from "@components/Rating/Rating";
import { ITV } from "types";

interface Props {
  tv: ITV;
  isLast: boolean;
}

const Tv = ({
  tv: {
    id,
    name,
    short_title,
    poster_path,
    vote_average,
    release_date,
    genres,
  },
  isLast,
}: Props) => {
  return (
    <div className={`mt-8 space-y-2 ${isLast && "pr-8 md:pr-0"}`}>
      <Link href={`/tv/${id}`}>
        <a>
          <h2
            title={name}
            className="text-xl text-gray-600 truncate hover:text-gray-500"
          >
            {short_title}
          </h2>
        </a>
      </Link>
      <Link href={`/tv/${id}`}>
        <a className="block w-48 sm:w-auto sm:h-auto">
          <img
            className="object-contain w-full rounded"
            src={poster_path}
            alt={name}
          />
        </a>
      </Link>
      <div
        className="grid items-center h-20"
        style={{ gridTemplateColumns: "1fr 2fr" }}
      >
        <Rating rating={vote_average} />
        <div>
          <p className="text-lg leading-relaxed text-gray-400 ">
            {release_date}
          </p>
          <p className="text-sm text-gray-400">{genres.join(", ")}</p>
        </div>
      </div>
    </div>
  );
};

export default Tv;
