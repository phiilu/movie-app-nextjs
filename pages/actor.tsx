import React from "react";
import { GetStaticProps } from "next";

import api from "@api/index";
import Actor from "@components/Actor/Actor";
import DataCache from "@util/DataCache";
import { transformActor } from "@util/transform";
import { IActor } from "types";

const popularActorCache = new DataCache(api.popularActors, false, 10);

export const getStaticProps: GetStaticProps = async () => {
  const popularActorResponse = await popularActorCache.getData();
  const popularActors = popularActorResponse.results.map(transformActor);

  return { props: { popularActors }, revalidate: 3600 };
};

interface Props {
  popularActors: Array<IActor>;
}

const ActorIndex = ({ popularActors }: Props) => {
  if (!popularActors) return null;
  return (
    <>
      <h1 className="px-4 text-lg font-semibold tracking-wider text-orange-500 uppercase sm:px-0">
        Popular Actors
      </h1>
      <div className="flex w-screen p-4 space-x-8 overflow-x-scroll scrolling-touch sm:p-0 sm:overflow-hidden sm:grid sm:gap-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 sm:space-x-0 md:w-full">
        {popularActors.map((actor: IActor, i: number) => (
          <Actor
            key={actor.id}
            actor={actor}
            isLast={i === popularActors.length - 1}
          />
        ))}
      </div>
    </>
  );
};

export default ActorIndex;
