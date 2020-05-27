import React, { useEffect, useRef } from "react";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useLayoutState } from "state/LayoutContext";
import DataCache from "@util/DataCache";
import api from "@api/index";
import { transformSingleActor } from "@util/transform";
import { IGenre } from "types";
import Rating from "@components/Rating/Rating";

const actorCache = new DataCache(api.actor, true);

export const getServerSideProps: GetServerSideProps = async ({
  params: { id },
}) => {
  const actorResponse = await actorCache.getData(id);
  const actor = transformSingleActor(actorResponse);

  return { props: { actor } };
};

const ActorDetail = ({ actor }) => {
  if (!actor) return null;

  const {
    name,
    profile_path,
    birthday_line,
    biography,
    known_for_movies,
    credits,
  } = actor;

  return (
    <>
      <div className="container px-4">
        <div className="flex flex-col md:space-x-24 md:flex-row">
          <div className="flex-none">
            <img className="w-64 mx-auto rounded" src={profile_path} alt="" />
          </div>
          <div>
            <h1 className="mt-4 text-4xl font-semibold md:mt-0">{name}</h1>
            <div className="flex flex-wrap items-center text-sm text-gray-400">
              <svg
                className="w-4 text-gray-400 fill-current hover:text-white"
                viewBox="0 0 448 512"
              >
                <path d="M448 384c-28.02 0-31.26-32-74.5-32-43.43 0-46.825 32-74.75 32-27.695 0-31.454-32-74.75-32-42.842 0-47.218 32-74.5 32-28.148 0-31.202-32-74.75-32-43.547 0-46.653 32-74.75 32v-80c0-26.5 21.5-48 48-48h16V112h64v144h64V112h64v144h64V112h64v144h16c26.5 0 48 21.5 48 48v80zm0 128H0v-96c43.356 0 46.767-32 74.75-32 27.951 0 31.253 32 74.75 32 42.843 0 47.217-32 74.5-32 28.148 0 31.201 32 74.75 32 43.357 0 46.767-32 74.75-32 27.488 0 31.252 32 74.5 32v96zM96 96c-17.75 0-32-14.25-32-32 0-31 32-23 32-64 12 0 32 29.5 32 56s-14.25 40-32 40zm128 0c-17.75 0-32-14.25-32-32 0-31 32-23 32-64 12 0 32 29.5 32 56s-14.25 40-32 40zm128 0c-17.75 0-32-14.25-32-32 0-31 32-23 32-64 12 0 32 29.5 32 56s-14.25 40-32 40z"></path>
              </svg>
              <span className="ml-2">{birthday_line}</span>
              <p className="mt-8 text-lg leading-normal text-gray-300">
                {biography}
              </p>

              <div>
                <h2 className="mt-12 mb-2 font-semibold">Known For</h2>
                <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 lg:grid-cols-5">
                  {known_for_movies.map((movie) => (
                    <div key={movie.link}>
                      <Link href={movie.link}>
                        <a>
                          <img
                            src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
                            alt="poster"
                            className="transition duration-150 ease-in-out hover:opacity-75"
                          />
                        </a>
                      </Link>
                      <Link href={movie.link}>
                        <a className="block mt-1 text-sm leading-normal text-gray-400 hover:text-white">
                          {movie.title}
                        </a>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-4xl font-semibold">Credits</h2>

          <ul className="pl-5 mt-8 leading-loose list-disc">
            {credits.map((credit) => (
              <li key={credit.link}>
                {credit.releaseYear} ·{" "}
                <strong>
                  <Link href={credit.link}>
                    <a className="hover:underline">{credit.title}</a>
                  </Link>
                </strong>
                {credit.character}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default ActorDetail;
