import { GetServerSideProps } from "next";
import Head from "next/head";
import api from "../api";
import Movie from "../components/Movie/Movie";
import format from "date-fns/format";
import DataCache from "../util/DataCache";

interface Movie {
  title: string;
  overview: string;
  release_date: string;
  poster_path: string;
  backdrop_path: string;
  genre_ids: Array<object>;
  genres: Array<object>;
  videos: Videos;
  credits: Credits;
  vote_average: number;
}

interface Videos {
  results: Array<Video>;
}

interface Video {
  type: string;
  key: string;
}

interface Credits {
  cast: Array<any>;
}

const transformMovie = (genres: any) => (movie: Movie) => {
  return {
    ...movie,
    shortTitle:
      movie.title.length > 20
        ? movie.title.substring(0, 20) + "..."
        : movie.title,
    releaseDate: format(new Date(movie.release_date), "dd.MM.yyyy"),
    backdropPath: movie.backdrop_path
      ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
      : null,
    posterPath: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
    genres:
      movie.genre_ids
        ?.slice(1, 3)
        .map(
          (genreId) => genres.find((genre: any) => genre.id === genreId)?.name
        ) || movie.genres,
    trailer:
      movie.videos?.results.find((video) => video.type === "Trailer")?.key ||
      "",
    credits: movie.credits
      ? {
          ...movie.credits,
          cast: movie.credits.cast.slice(0, 5),
        }
      : null,
    voteAverage: movie.vote_average,
  };
};

const genresCache = new DataCache(api.genres, false, 60 * 24);
const popularMoviesCache = new DataCache(api.popularMovies, false, 10);
const nowPlayingMoviesCache = new DataCache(api.nowPlayingMovies, false, 10);

export const getServerSideProps: GetServerSideProps = async () => {
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
  const genres = [...movieGenres.genres, tvGenres.genres];

  const popularMovies = popularMoviesResponse.results.map(
    transformMovie(genres)
  );
  const nowPlayingMovies = nowPlayingMoviesResponse.results.map(
    transformMovie(genres)
  );
  return { props: { popularMovies, nowPlayingMovies } };
};

export default function Home({ popularMovies, nowPlayingMovies }) {
  if (!popularMovies && !nowPlayingMovies) return null;

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="px-4 text-lg font-semibold tracking-wider text-orange-500 uppercase sm:px-0">
        Popular Movies
      </h1>
      <div className="flex w-screen p-4 space-x-8 overflow-x-scroll scrolling-touch sm:p-0 sm:overflow-hidden sm:grid sm:gap-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 sm:space-x-0 md:w-full">
        {popularMovies.map((movie) => (
          <Movie key={movie.id} {...movie} />
        ))}
      </div>
      <h1 className="px-4 mt-20 text-lg font-semibold tracking-wider text-orange-500 uppercase sm:px-0">
        Now Playing Movies
      </h1>
      <div className="flex w-screen p-4 space-x-8 overflow-x-scroll scrolling-touch sm:p-0 sm:overflow-hidden sm:grid sm:gap-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 sm:space-x-0 md:w-full">
        {nowPlayingMovies.map((movie) => (
          <Movie key={movie.id} {...movie} />
        ))}
      </div>
    </>
  );
}
