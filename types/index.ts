export interface IMovie {
  id: string;
  title: string;
  short_title: string;
  overview: string;
  release_date: string;
  poster_path: string;
  backdrop_path: string;
  genre_ids: Array<object>;
  genres: Array<object>;
  videos: IVideos;
  credits: ICredits;
  vote_average: number;
}

export interface ITV {
  id: string;
  short_title: string;
  name: string;
  overview: string;
  first_air_date: string;
  poster_path: string;
  backdrop_path: string;
  genre_ids: Array<Number>;
  genres: Array<string>;
  videos: IVideos;
  vote_average: number;
  release_date: string;
}

export interface IVideos {
  results: Array<IVideo>;
}

export interface IVideo {
  type: string;
  key: string;
}

export interface ICredits {
  cast: Array<any>;
}

export interface IActor {
  id: string;
  name: string;
  biography: string;
  profile_path: string;
  known_for: Array<IKnownFor>;
  birthday: string;
  place_of_birth: string;
  combined_credits: ICombinedCredits;
}

export interface IKnownFor {
  name: string;
  title: string;
}

export interface ICombinedCredits {
  cast: Array<ICast>;
}

export interface ICast {
  id: number;
  popularity: number;
  poster_path: string;
  title?: string;
  name?: string;
  release_date: string;
  first_air_date?: string;
  character: string;
  media_type: string;
}
