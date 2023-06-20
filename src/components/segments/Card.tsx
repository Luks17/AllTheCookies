import { getFormatedDate } from "@/util/date";
import type { PostFrontmatter } from "@/types/Posts";

interface Props {
  post: PostFrontmatter;
  showCategory?: boolean;
  special?: boolean;
}

function Card({ post, showCategory = true, special = false }: Props) {
  return (
    <div
      className={`p-2 my-5 bg-crust rounded-md max-md:max-w-2xl text-xl mx-auto ${special
          ? "border-x-2 md:border-y-2 md:text-2xl border-secondary bg-mantle"
          : "max-w-md"
        }`}
    >
      {special && (
        <div className="flex justify-center">
          <h4 className="text-skin-accent-secondary font-bold pt-1">
            Mais recente
          </h4>
        </div>
      )}

      {/* thumb */}
      <div className="flex items-center justify-center bg-fg-base m-4">
        <img
          src={post.thumbnail.img.src}
          alt={post.thumbnail.alt}
          width={1280}
          height={720}
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="w-full flex my-1 px-5 text-xs items-center justify-between">
        {/* category */}
        {showCategory && (
          <a
            href="#"
            className="bg-primary font-semibold text-skin-alternate w-fit px-2 py-0.5 uppercase"
          >
            {post.category}
          </a>
        )}

        {/* date */}
        <span className="text-skin-muted">
          <time>{getFormatedDate(post.publishDate)}</time>
        </span>
      </div>

      <div className="px-2 py-1">
        {/* title */}
        <h3 className="text-skin-accent font-bold px-1 pb-2">{post.title}</h3>

        {/* description */}
        <p
          className={`text-skin-subtext text-sm px-1 line-clamp-2 overflow-ellipsis ${special && "md:text-lg"
            }`}
        >
          {post.description}
        </p>
      </div>

      {/* tags */}
      <div className="flex py-2 px-3 gap-1.5">
        {post.tags.map((tag, id) => {
          return (
            <a
              key={id}
              className={`text-skin-muted bg-mantle text-sm px-2 ${special && "md:text-lg bg-primary"
                }`}
            >
              {tag}
            </a>
          );
        })}
      </div>
    </div>
  );
}

export default Card;
