import React from "react";
import Rating from "../Rating/Rating";

// Movie on the homepage
const Movie = ({
  id,
  title,
  shortTitle,
  posterPath,
  releaseDate,
  voteAverage,
}) => {
  return (
    <div className="space-y-2 sm:mt-8 {{#if @last}}pr-8 md:pr-0{{/if}}">
      <a href={`/movie/${id}`}>
        <h2
          title={title}
          className="text-xl text-center text-gray-600 truncate hover:text-gray-500 sm:text-left"
        >
          {shortTitle}
        </h2>
      </a>
      <a href={`/movie/${id}`} className="block w-48 sm:w-auto sm:h-auto">
        <img
          className="object-contain w-full rounded"
          src={posterPath}
          alt={title}
        />
      </a>
      <div
        className="grid items-center h-16"
        style={{ gridTemplateColumns: "1fr 2fr" }}
      >
        {/* {{> rating rating=vote_average}} */}
        <Rating rating={voteAverage} />
        <div>
          <p className="text-lg leading-relaxed text-gray-400 ">
            {releaseDate}
          </p>
          <p className="text-sm text-gray-400">
            {/* {{#each genres}}
                {{ this }}{{#unless @last}},{{/unless}}
                {{/each}} */}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Movie;
