import format from "date-fns/format";
import { IMovie, ITV, IActor, ICast } from "types";
import differenceInYears from "date-fns/differenceInYears";

import { uniqBy } from "@util/index";

export const transformMovie = (genres: any) => (movie: IMovie) => {
  return {
    ...movie,
    short_title:
      movie.title.length > 20
        ? movie.title.substring(0, 20) + "..."
        : movie.title,
    release_date: format(new Date(movie.release_date), "dd.MM.yyyy"),
    backdrop_path: movie.backdrop_path
      ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
      : null,
    poster_path: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
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
    vote_average: movie.vote_average,
  };
};

export const transformTv = (genres: any) => (tv: ITV) => {
  return {
    ...tv,
    short_title:
      tv.name.length > 20 ? tv.name.substring(0, 20) + "..." : tv.name,
    release_date: format(new Date(tv.first_air_date), "dd.MM.yyyy"),
    poster_path: `https://image.tmdb.org/t/p/w500${tv.poster_path}`,
    genres:
      tv.genre_ids
        ?.slice(1, 3)
        .map(
          (genreId) => genres.find((genre: any) => genre.id === genreId)?.name
        ) || tv.genres,
  };
};

export const transformSingleTv = (tv: ITV) => {
  return {
    ...tv,
    title: tv.name,
    short_title:
      tv.name.length > 20 ? tv.name.substring(0, 20) + "..." : tv.name,
    release_date: format(new Date(tv.first_air_date), "dd.MM.yyyy"),
    backdrop_path: `https://image.tmdb.org/t/p/original${tv.backdrop_path}`,
    poster_path: `https://image.tmdb.org/t/p/w500${tv.poster_path}`,
    trailer:
      tv.videos?.results.find((video) => video.type === "Trailer")?.key || "",
  };
};

export const transformActor = (actor: IActor) => {
  return {
    ...actor,
    profile_path: actor.profile_path
      ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
      : `https://dummyimage.com/500x750/cbd5e0/1a202c.png&text=Profile+Image+Not+Found`,
    known_for: actor.known_for?.map((kf) => kf.name || kf.title),
  };
};

export const transformSingleActor = (actor: IActor) => {
  return {
    ...actor,
    profile_path: actor.profile_path
      ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
      : `https://dummyimage.com/500x750/cbd5e0/1a202c.png&text=Profile+Image+Not+Found`,
    birthday_line: actor.birthday
      ? `${format(new Date(actor.birthday), "dd.MM.yyyy")} (${differenceInYears(
          new Date(),
          new Date(actor.birthday)
        )} years old) in ${actor.place_of_birth}`
      : "Sorry, we could not get this information 😔",
    known_for_movies: getKnownForMovies(actor.combined_credits.cast),
    credits: getCredits(actor.combined_credits.cast),
  };
};

function getKnownForMovies(cast: Array<ICast>) {
  const copyCast = Array.from(uniqBy(cast, "id"));
  copyCast.sort((c1, c2) => c2.popularity - c1.popularity);
  return copyCast.slice(0, 5).map((c) => ({
    id: c.id,
    title: c.title || c.name,
    poster_path: c.poster_path,
    popularity: c.popularity,
    link: c.media_type === "movie" ? `/movies/${c.id}` : `/tv/${c.id}`,
  }));
}

function getCredits(cast: Array<ICast>) {
  const copyCast = Array.from(uniqBy(cast, "id"))
    .map((c: ICast) => {
      if (c.first_air_date) {
        return {
          ...c,
          release_date: c.first_air_date,
        };
      }
      return c;
    })
    .filter((c: ICast) => {
      return (
        c.release_date !== undefined &&
        c.release_date !== null &&
        c.release_date !== ""
      );
    });

  copyCast.sort(
    (c1, c2) =>
      new Date(c2.release_date).getTime() - new Date(c1.release_date).getTime()
  );

  return copyCast.map((c) => {
    return {
      id: c.id,
      title: c.title || c.name,
      character: c.character ? ` as ${c.character} ` : "",
      releaseYear: c.release_date
        ? new Date(c.release_date).getFullYear()
        : "Unknown",
      link: c.media_type === "movie" ? `/movies/${c.id}` : `/tv/${c.id}`,
    };
  });
}
