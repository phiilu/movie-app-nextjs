import { GetStaticProps } from "next";

import api from "@api/index";
import Meta from "@components/Meta/Meta";
import Movie from "@components/Movie/Movie";
import DataCache from "@util/DataCache";
import { transformMovie } from "@util/transform";
import { IMovie } from "types";

const genresCache = new DataCache(api.genres, false, 60 * 24);
const popularMoviesCache = new DataCache(api.popularMovies, false, 10);
const nowPlayingMoviesCache = new DataCache(api.nowPlayingMovies, false, 10);

export const getStaticProps: GetStaticProps = async () => {
  const [
    genresResponse,
    popularMoviesResponse,
    nowPlayingMoviesResponse,
  ] = await Promise.all([
    genresCache.getData(),
    popularMoviesCache.getData(),
    nowPlayingMoviesCache.getData(),
  ]);
  const [movieGenres, tvGenres] = genresResponse;
  const genres = [...movieGenres.genres, ...tvGenres.genres];

  const popularMovies = popularMoviesResponse.results.map(
    transformMovie(genres)
  );
  const nowPlayingMovies = nowPlayingMoviesResponse.results.map(
    transformMovie(genres)
  );
  return { props: { popularMovies, nowPlayingMovies }, revalidate: 3600 };
};

export default function Home({ popularMovies, nowPlayingMovies }) {
  if (!popularMovies && !nowPlayingMovies) return null;

  return (
    <>
      <Meta title="Movies" />
      <h1 className="px-4 text-lg font-semibold tracking-wider text-orange-500 uppercase sm:px-0">
        Popular Movies
      </h1>
      <div className="flex w-screen p-4 space-x-8 overflow-x-scroll scrolling-touch sm:p-0 sm:overflow-hidden sm:grid sm:gap-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 sm:space-x-0 md:w-full">
        {popularMovies.map((movie: IMovie, index: number) => (
          <Movie
            key={movie.id}
            movie={movie}
            isLast={index === popularMovies.length - 1}
          />
        ))}
      </div>
      <h1 className="px-4 mt-20 text-lg font-semibold tracking-wider text-orange-500 uppercase sm:px-0">
        Now Playing Movies
      </h1>
      <div className="flex w-screen p-4 space-x-8 overflow-x-scroll scrolling-touch sm:p-0 sm:overflow-hidden sm:grid sm:gap-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 sm:space-x-0 md:w-full">
        {nowPlayingMovies.map((movie: IMovie, index: number) => (
          <Movie
            key={movie.id}
            movie={movie}
            isLast={index === popularMovies.length - 1}
          />
        ))}
      </div>
    </>
  );
}
