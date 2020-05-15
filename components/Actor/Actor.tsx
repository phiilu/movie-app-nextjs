import Link from "next/link";
import { IActor } from "types";

interface Props {
  actor: IActor;
  isLast: boolean;
}

const Actor = ({
  actor: { id, name, profile_path, known_for },
  isLast,
}: Props) => {
  return (
    <div className={`mt-8 space-y-2 ${isLast && "pr-8 md:pr-0"}`}>
      <Link href={`/actor/${id}`}>
        <a>
          <h2
            title={name}
            className="text-xl text-gray-600 truncate hover:text-gray-500"
          >
            {name}
          </h2>
        </a>
      </Link>
      <Link href={`/actor/${id}`}>
        <a className="block w-48 sm:w-auto sm:h-auto">
          <img
            className="object-contain w-full rounded"
            src={profile_path}
            alt={name}
          />
        </a>
      </Link>
      <div
        className="text-sm text-gray-400 truncate"
        style={{ whiteSpace: "inherit" }}
      >
        {known_for.join(",")}
      </div>
    </div>
  );
};

export default Actor;
