import React, { useEffect } from "react";
import { GetServerSideProps } from "next";
import { useLayoutState } from "state/LayoutContext";
import DataCache from "@util/DataCache";
import api from "@api/index";
import { transformMovie } from "@util/transform";
import { IMovie, IGenre } from "types";
import Rating from "@components/Rating/Rating";

const genresCache = new DataCache(api.genres, false, 60 * 24);
const movieCache = new DataCache(api.movie);

export const getServerSideProps: GetServerSideProps = async ({
  params: { id },
}) => {
  const [genresResponse, movieResponse] = await Promise.all([
    genresCache.getData(),
    movieCache.getData(id),
  ]);
  const [movieGenres, tvGenres] = genresResponse;
  const genres = [...movieGenres.genres, ...tvGenres.genres];
  const movie = movieResponse ? transformMovie(genres)(movieResponse) : null;

  return { props: { movie } };
};

interface Props {
  movie: IMovie;
}

const MovieDetails = ({ movie }: Props) => {
  const { setLayoutState } = useLayoutState();
  useEffect(() => {
    setLayoutState((prev) => ({ ...prev, site: "show" }));
    return () => setLayoutState((prev) => ({ ...prev, site: "index" }));
  }, []);

  if (!movie) {
    return null;
  }
  const {
    title,
    tagline,
    overview,
    backdrop_path,
    poster_path,
    trailer,
    genres,
    release_date,
    vote_average,
    credits,
    images,
  } = movie;

  return (
    <>
      <div
        id="single"
        className="relative w-full overflow-hidden duration-500 ease-in-out transition-height md:h-screen"
      >
        <div
          className="hidden h-full bg-center bg-no-repeat bg-cover md:block blur-2"
          style={{ backgroundImage: `url('${backdrop_path}')` }}
        ></div>
        <div className="w-full h-full bg-gray-900 md:bg-transparent md:absolute md:top-0 md:bottom-0 md:left-0 md:right-0 md:z-10 bg-overlay">
          <div
            id="single-header"
            className="container grid grid-cols-1 gap-8 px-4 py-16 pt-48 mx-auto md:pt-32 md:grid-cols-2"
          >
            <img
              className="w-64 m-auto md:w-auto"
              loading="lazy"
              src={poster_path}
              alt={title}
            />
            <div>
              <div className="space-y-2">
                <h1 className="text-4xl">{title}</h1>
                <small className="inline-block text-lg tracking-wider text-gray-500">
                  {tagline}
                </small>
                <div
                  className="grid space-x-2 text-gray-400 md:flex"
                  style={{ gridTemplateColumns: "auto 1fr" }}
                >
                  <div className="w-10">
                    <Rating layout="row" rating={vote_average} />
                  </div>
                  <span className="hidden md:block">|</span>
                  <span>{release_date}</span>
                  <span className="hidden md:block">|</span>
                  <span style={{ gridColumn: "1 / -1" }}>
                    {genres.map((g: IGenre) => g.name).join(",")}
                  </span>
                </div>
              </div>
              <p className="mt-8 text-gray-300">{overview}</p>
              <div className="mt-8 space-y-4">
                <h2 className="text-lg font-bold uppercase ">Trailer</h2>
                <div className="youtube">
                  <iframe
                    id="ytplayer"
                    width="640"
                    height="360"
                    src={`https://www.youtube.com/embed/${trailer}?autoplay=0`}
                    frameBorder="0"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container px-4 py-16 mx-auto">
        <h1 className="text-4xl">Cast</h1>
        <div className="grid grid-cols-1 gap-8 mt-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          {credits.cast.map((cast) => {
            return (
              <div key={cast.name} className="mx-auto space-y-4">
                <a href="/actors/{{this.id}}">
                  <img
                    loading="lazy"
                    className="w-64 rounded md:w-full"
                    src={
                      cast.profile_path
                        ? `https://image.tmdb.org/t/p/w500/${cast.profile_path}`
                        : "https://dummyimage.com/500x750/cbd5e0/1a202c.png&text=Profile+Image+Not+Found"
                    }
                    alt={`${cast.name}'s profile image`}
                  />
                </a>
                <h2 className="text-lg">{cast.name}}</h2>
                <small className="text-gray-400 text-md">
                  {cast.character}
                </small>
              </div>
            );
          })}
        </div>
      </div>

      <div className="container px-4 pb-16 mx-auto">
        <h1 className="text-4xl">Images</h1>
        <div className="grid grid-cols-1 gap-8 mt-8 sm:grid-cols-2 md:grid-cols-3">
          {images.backdrops.map((image) => {
            return (
              <div key={image.file_path} className="space-y-4">
                <img
                  loading="lazy"
                  className="transition ease-in-out rounded cursor-pointer hover:opacity-75"
                  src={`https://image.tmdb.org/t/p/w500${image.file_path}`}
                  alt={`${title}'s backdrop image`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default MovieDetails;
